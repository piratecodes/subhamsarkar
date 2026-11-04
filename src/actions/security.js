"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, getAuthUser } from "./auth";
import { unbanIp, blockIp, purgeOldSecurityData } from "@/lib/security";
import { revalidatePath } from "next/cache";

// Security Gatekeeper: Ensure user has administrative privileges
async function enforceAdminPrivileges() {
  const user = await getAuthUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "MANAGER")) {
    throw new Error("Unauthorized. Security access restricted to Manager and Super Admin.");
  }
  return user;
}

/**
 * Fetches high-level security telemetry KPIs
 */
export async function getSecurityOverview() {
  try {
    await enforceAdminPrivileges();

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [activeBansCount, recentFailuresCount, totalBansAllTime] = await Promise.all([
      prisma.blockedIp ? prisma.blockedIp.count({ where: { blockedUntil: { gt: now } } }) : 0,
      prisma.loginAttempt ? prisma.loginAttempt.count({ where: { success: false, createdAt: { gte: twentyFourHoursAgo } } }) : 0,
      prisma.blockedIp ? prisma.blockedIp.count() : 0
    ]);

    return {
      success: true,
      stats: {
        activeBans: activeBansCount,
        recentFailures: recentFailuresCount,
        totalBansAllTime,
        status: activeBansCount > 0 ? "Threat Contained" : "Nominal"
      }
    };
  } catch (error) {
    return { success: false, error: error.message || "Failed to fetch security telemetry." };
  }
}

/**
 * Fetches all currently active banned IPs
 */
export async function getActiveBans() {
  try {
    await enforceAdminPrivileges();

    if (!prisma.blockedIp) return { success: true, bans: [] };

    const now = new Date();
    const activeBans = await prisma.blockedIp.findMany({
      where: { blockedUntil: { gt: now } },
      orderBy: { createdAt: "desc" }
    });

    return {
      success: true,
      bans: activeBans.map((ban) => ({
        id: ban.id,
        ipAddress: ban.ipAddress,
        reason: ban.reason,
        country: ban.country,
        attemptCount: ban.attemptCount,
        blockedUntil: ban.blockedUntil,
        createdAt: ban.createdAt
      }))
    };
  } catch (error) {
    return { success: false, error: error.message || "Failed to fetch active bans." };
  }
}

/**
 * Fetches recent login and access attempts for audit logging
 */
export async function getRecentSecurityLogs(limit = 35) {
  try {
    await enforceAdminPrivileges();

    if (!prisma.loginAttempt) return { success: true, logs: [] };

    const logs = await prisma.loginAttempt.findMany({
      take: limit,
      orderBy: { createdAt: "desc" }
    });

    return {
      success: true,
      logs: logs.map((log) => ({
        id: log.id,
        ipAddress: log.ipAddress,
        identifier: log.identifier,
        userAgent: log.userAgent,
        country: log.country,
        success: log.success,
        reason: log.reason,
        type: log.type,
        createdAt: log.createdAt
      }))
    };
  } catch (error) {
    return { success: false, error: error.message || "Failed to fetch security logs." };
  }
}

/**
 * Prunes expired IP bans and audit logs older than the retention threshold
 */
export async function purgeSecurityLogsAction(daysToKeep = 30) {
  try {
    await enforceAdminPrivileges();

    const result = await purgeOldSecurityData(daysToKeep);
    if (!result.success) {
      return { success: false, error: result.error };
    }

    revalidatePath("/sudo/security");
    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, error: error.message || "Failed to purge security logs." };
  }
}

/**
 * Server action to unban an IP
 */
export async function unbanIpAction(ipAddress) {
  try {
    await enforceAdminPrivileges();

    if (!ipAddress) {
      return { success: false, error: "Invalid IP address." };
    }

    const unbanned = await unbanIp(ipAddress);
    if (!unbanned) {
      return { success: false, error: "Failed to remove ban record." };
    }

    revalidatePath("/sudo/security");
    return { success: true, message: `IP ${ipAddress} unbanned successfully.` };
  } catch (error) {
    return { success: false, error: error.message || "Failed to unban IP." };
  }
}

/**
 * Server action to manually ban an IP address
 */
export async function manualBanIpAction(formData) {
  try {
    await enforceAdminPrivileges();

    const ipAddress = formData.get("ipAddress")?.toString().trim();
    const reason = formData.get("reason")?.toString().trim() || "Manual Administrator Ban";
    const durationHours = parseInt(formData.get("durationHours")?.toString() || "24", 10);

    if (!ipAddress) {
      return { success: false, error: "Please provide a valid IP address." };
    }

    await blockIp(ipAddress, reason, durationHours);

    revalidatePath("/sudo/security");
    return { success: true, message: `IP ${ipAddress} banned for ${durationHours} hour(s).` };
  } catch (error) {
    return { success: false, error: error.message || "Failed to block IP." };
  }
}

/**
 * Emergency: Flushes all active IP bans from cache and database
 */
export async function flushAllBansAction() {
  try {
    await enforceAdminPrivileges();

    let count = 0;
    if (prisma.blockedIp) {
      const res = await prisma.blockedIp.deleteMany({});
      count = res.count;
    }

    if (globalThis.__ipBanCache) {
      globalThis.__ipBanCache.clear();
    }

    revalidatePath("/sudo/security");
    return { success: true, count, message: `Successfully flushed all ${count} active IP ban(s).` };
  } catch (error) {
    return { success: false, error: error.message || "Failed to flush bans." };
  }
}

/**
 * 1-Click Quick Ban directly from the audit feed
 */
export async function quickBanIpAction(ipAddress, reason = "Manual 1-Click Audit Quarantine", durationHours = 24) {
  try {
    await enforceAdminPrivileges();

    if (!ipAddress) {
      return { success: false, error: "Invalid IP address." };
    }

    await blockIp(ipAddress, reason, durationHours);

    revalidatePath("/sudo/security");
    return { success: true, message: `IP ${ipAddress} quarantined for ${durationHours} hours.` };
  } catch (error) {
    return { success: false, error: error.message || "Failed to quick-ban IP." };
  }
}

/**
 * Live polling / refresh action for telemetry without full browser reload
 */
export async function refreshSecurityDataAction() {
  try {
    await enforceAdminPrivileges();

    const [overviewRes, bansRes, logsRes] = await Promise.all([
      getSecurityOverview(),
      getActiveBans(),
      getRecentSecurityLogs(40),
    ]);

    return {
      success: true,
      stats: overviewRes.success ? overviewRes.stats : null,
      bans: bansRes.success ? bansRes.bans : [],
      logs: logsRes.success ? logsRes.logs : [],
    };
  } catch (error) {
    return { success: false, error: error.message || "Failed to refresh telemetry." };
  }
}

