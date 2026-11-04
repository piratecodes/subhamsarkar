import { prisma } from "@/lib/prisma";
import { sendSecurityAlertEmail } from "@/lib/mail";

// Global in-memory cache for fast, non-blocking perimeter checks
const globalSecurity = globalThis;
if (!globalSecurity.__ipBanCache) {
  globalSecurity.__ipBanCache = new Map();
}
const ipBanCache = globalSecurity.__ipBanCache;

// Sliding window cache for tracking honeypot probe strikes (IP -> Array of timestamps)
if (!globalSecurity.__honeypotStrikeCache) {
  globalSecurity.__honeypotStrikeCache = new Map();
}
const honeypotStrikeCache = globalSecurity.__honeypotStrikeCache;

// Security configuration thresholds
export const SECURITY_CONFIG = {
  SOFT_LIMIT_ATTEMPTS: 5,            // 5 failed attempts
  SOFT_BLOCK_MINUTES: 15,            // 15-minute temporary cooldown
  HARD_LIMIT_ATTEMPTS: 10,           // 10 failed attempts
  HARD_BLOCK_HOURS: 24,              // 24-hour hard ban
  ATTEMPT_WINDOW_MINUTES: 15,        // Count attempts in a 15-minute sliding window
  PASSWORD_RESET_MAX_HOURLY: 3,      // Max 3 password reset requests per hour
  DUMMY_BCRYPT_HASH: "$2a$12$e8uqf91E6qH8zV4R3K0HKeOqf2H1c5K7U4l0V9Z1m8B2b7X9p0Y0G" // Constant-time salt
};

// Known vulnerability scanner & bot exploit paths
export const HONEYPOT_PATHS = [
  "/wp-login.php",
  "/wp-admin",
  "/wp-content",
  "/wp-includes",
  "/xmlrpc.php",
  "/.env",
  "/phpmyadmin",
  "/.git",
  "/.aws",
  "/admin.php",
  "/cgi-bin",
  "/shell.php",
  "/config.json",
  "/telescope"
];

/**
 * Detects verified search engine and social preview crawlers
 * to ensure SEO indexing and preview generation are 100% exempt from quarantine.
 */
export function isSearchEngineBot(headersOrRequest) {
  let userAgent = "";
  if (headersOrRequest?.headers) {
    const headers = headersOrRequest.headers;
    userAgent = typeof headers.get === "function" ? headers.get("user-agent") : headers["user-agent"];
  } else if (typeof headersOrRequest?.get === "function") {
    userAgent = headersOrRequest.get("user-agent");
  }

  if (!userAgent || typeof userAgent !== "string") return false;
  const ua = userAgent.toLowerCase();

  const KNOWN_SEO_BOTS = [
    "googlebot",
    "bingbot",
    "applebot",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "slurp",
    "facebot",
    "facebookexternalhit",
    "twitterbot",
    "linkedinbot",
    "pinterestbot",
    "slackbot",
    "telegrambot",
    "whatsapp",
    "gptbot",
    "claude-web",
    "perplexitybot",
    "adsbot-google",
    "mediapartners-google"
  ];

  return KNOWN_SEO_BOTS.some((bot) => ua.includes(bot));
}

/**
 * Safely extracts and normalizes the client's real IP address
 */
export function getClientIp(headersOrRequest) {
  let ip = null;

  if (headersOrRequest?.headers) {
    const headers = headersOrRequest.headers;
    const cfIp = typeof headers.get === "function" ? headers.get("cf-connecting-ip") : headers["cf-connecting-ip"];
    const realIp = typeof headers.get === "function" ? headers.get("x-real-ip") : headers["x-real-ip"];
    const forwarded = typeof headers.get === "function" ? headers.get("x-forwarded-for") : headers["x-forwarded-for"];
    
    ip = cfIp || realIp || (forwarded ? forwarded.split(",")[0].trim() : null) || headersOrRequest.ip;
  } else if (typeof headersOrRequest?.get === "function") {
    const cfIp = headersOrRequest.get("cf-connecting-ip");
    const realIp = headersOrRequest.get("x-real-ip");
    const forwarded = headersOrRequest.get("x-forwarded-for");
    
    ip = cfIp || realIp || (forwarded ? forwarded.split(",")[0].trim() : null);
  }

  if (!ip || ip === "::1" || ip === "0.0.0.0") {
    ip = "127.0.0.1";
  }

  // Normalize IPv4-mapped IPv6
  if (ip.startsWith("::ffff:")) {
    ip = ip.substring(7);
  }

  return ip.trim().toLowerCase();
}

/**
 * Extracts country code from CDN/Proxy headers (e.g. Cloudflare cf-ipcountry)
 */
export function getClientCountry(headersOrRequest) {
  let country = null;

  if (headersOrRequest?.headers) {
    const headers = headersOrRequest.headers;
    country = typeof headers.get === "function" ? headers.get("cf-ipcountry") : headers["cf-ipcountry"];
  } else if (typeof headersOrRequest?.get === "function") {
    country = headersOrRequest.get("cf-ipcountry");
  }

  return country && country.length === 2 ? country.toUpperCase() : null;
}

/**
 * Checks if an IP is whitelisted
 */
export function isIpWhitelisted(ip) {
  const whitelistEnv = process.env.ADMIN_WHITELIST_IPS || "";
  const whitelistedIps = whitelistEnv
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (process.env.NODE_ENV !== "production") {
    if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
      return true;
    }
  }

  return whitelistedIps.includes(ip);
}

/**
 * Detects known malicious exploit payloads (SQLi, XSS, Path Traversal)
 */
export function detectMaliciousPayload(input) {
  if (!input || typeof input !== "string") return { isMalicious: false };

  const trimmed = input.trim();

  const sqliPatterns = [
    /('|"|;|--|\/\*|\*\/)/i,
    /\b(or|and)\b\s+['"\d\w]+\s*=\s*['"\d\w]+/i,
    /\bunion\b\s+\bselect\b/i,
    /\bselect\b.+\bfrom\b/i,
    /\bdrop\b\s+\btable\b/i,
    /\binsert\b\s+\binto\b/i,
    /\b(exec|execute)\s*\(|\bxp_cmdshell\b/i
  ];

  for (const pattern of sqliPatterns) {
    if (pattern.test(trimmed)) {
      return {
        isMalicious: true,
        reason: "SQL Injection probe detected in credentials"
      };
    }
  }

  if (/<script|javascript:|data:text\/html|\.\.\/|\.\.\\/i.test(trimmed)) {
    return {
      isMalicious: true,
      reason: "XSS / Path traversal payload detected in credentials"
    };
  }

  return { isMalicious: false };
}

/**
 * Checks whether an IP is currently blocked (in-memory cache first, then MySQL)
 */
export async function isIpBlocked(ip) {
  if (!ip || isIpWhitelisted(ip)) {
    return { isBlocked: false };
  }

  const now = Date.now();

  // 1. In-memory cache check
  if (ipBanCache.has(ip)) {
    const cached = ipBanCache.get(ip);
    if (new Date(cached.blockedUntil).getTime() > now) {
      return {
        isBlocked: true,
        reason: cached.reason,
        blockedUntil: cached.blockedUntil,
        country: cached.country
      };
    } else {
      ipBanCache.delete(ip);
    }
  }

  // 2. MySQL fallback query
  try {
    if (prisma.blockedIp) {
      const blockRecord = await prisma.blockedIp.findUnique({
        where: { ipAddress: ip }
      });

      if (blockRecord) {
        if (new Date(blockRecord.blockedUntil).getTime() > now) {
          ipBanCache.set(ip, {
            reason: blockRecord.reason,
            blockedUntil: blockRecord.blockedUntil,
            country: blockRecord.country
          });

          return {
            isBlocked: true,
            reason: blockRecord.reason,
            blockedUntil: blockRecord.blockedUntil,
            country: blockRecord.country
          };
        } else {
          await prisma.blockedIp.delete({
            where: { ipAddress: ip }
          }).catch(() => {});
        }
      }
    }
  } catch (error) {
    console.error("[Security] Error checking blocked IP status:", error);
  }

  return { isBlocked: false };
}

/**
 * Programmatically block an IP address and dispatch security alerts
 */
export async function blockIp(ip, reason, durationHours = 24, country = null, metadata = {}) {
  if (!ip || isIpWhitelisted(ip)) return;

  const blockedUntil = new Date(Date.now() + durationHours * 60 * 60 * 1000);

  ipBanCache.set(ip, { reason, blockedUntil, country });

  try {
    if (prisma.blockedIp) {
      await prisma.blockedIp.upsert({
        where: { ipAddress: ip },
        update: {
          reason,
          blockedUntil,
          country: country || undefined,
          attemptCount: { increment: 1 }
        },
        create: {
          ipAddress: ip,
          reason,
          country,
          blockedUntil,
          attemptCount: 1
        }
      });
    }

    console.warn(`[Security Alert] IP ${ip} blocked until ${blockedUntil.toISOString()}. Reason: ${reason}`);

    // Dispatch real-time security alert email asynchronously (for Tier-2 or exploit bans)
    if (durationHours >= 24) {
      sendSecurityAlertEmail({
        ip,
        reason,
        country,
        identifier: metadata.identifier || null,
        userAgent: metadata.userAgent || null,
        duration: `${durationHours} Hours`
      }).catch(console.error);
    }
  } catch (error) {
    console.error("[Security] Failed to persist IP block in database:", error);
  }
}

/**
 * Evaluates honeypot probe frequency for an IP using a 2-strike sliding window.
 * - Strike 1: Records strike within a 5-minute sliding window and returns { shouldBan: false, strikes: 1 } (shows 404)
 * - Strike 2 (or more): Triggers a 24-hour quarantine and returns { shouldBan: true, strikes: 2 } (shows 403)
 */
export async function recordHoneypotProbe(ip, path, country = null, metadata = {}) {
  if (!ip || isIpWhitelisted(ip)) {
    return { shouldBan: false, strikes: 0 };
  }

  const now = Date.now();
  const STRIKE_WINDOW_MS = 5 * 60 * 1000; // 5-minute sliding window
  const STRIKE_THRESHOLD = 2; // Ban on 2nd probe within 5 minutes

  const existing = honeypotStrikeCache.get(ip) || [];
  // Prune expired strikes older than 5 minutes
  const recentStrikes = existing.filter((ts) => (now - ts) < STRIKE_WINDOW_MS);
  recentStrikes.push(now);
  honeypotStrikeCache.set(ip, recentStrikes);

  const strikeCount = recentStrikes.length;
  const isThresholdMet = strikeCount >= STRIKE_THRESHOLD;

  // Record audit log entry in LoginAttempt
  try {
    if (prisma.loginAttempt) {
      await prisma.loginAttempt.create({
        data: {
          ipAddress: ip,
          identifier: path,
          userAgent: metadata.userAgent || null,
          country,
          type: isThresholdMet ? "HONEYPOT_TRAP" : "HONEYPOT_WARNING",
          reason: isThresholdMet
            ? `Automated Scanner Repeated Probing: ${path} (Strike ${strikeCount}/${STRIKE_THRESHOLD})`
            : `Suspicious Probe Warning: ${path} (Strike 1/${STRIKE_THRESHOLD} - 404 Served)`,
          success: false
        }
      });
    }
  } catch (err) {
    console.error("[Security] Failed to log honeypot probe:", err);
  }

  if (isThresholdMet) {
    await blockIp(
      ip, 
      `Automated Scanner Trap Triggered: ${path} (${strikeCount} strikes in 5m)`, 
      24, 
      country, 
      { identifier: path, userAgent: metadata.userAgent }
    );
    honeypotStrikeCache.delete(ip);
    return { shouldBan: true, strikes: strikeCount };
  }

  return { shouldBan: false, strikes: strikeCount };
}

/**
 * Unbans an IP address from both cache and database
 */
export async function unbanIp(ip) {
  if (!ip) return false;

  ipBanCache.delete(ip);

  try {
    if (prisma.blockedIp) {
      await prisma.blockedIp.deleteMany({
        where: { ipAddress: ip }
      });
    }
    return true;
  } catch (error) {
    console.error("[Security] Failed to unban IP in database:", error);
    return false;
  }
}

/**
 * Records a login attempt and checks rate-limiting thresholds
 */
export async function handleFailedLoginAttempt(ip, identifier, userAgent, reason = "INVALID_CREDENTIALS", country = null) {
  if (!ip) return { isBlocked: false };

  const now = new Date();
  const windowStart = new Date(now.getTime() - SECURITY_CONFIG.ATTEMPT_WINDOW_MINUTES * 60 * 1000);

  try {
    if (prisma.loginAttempt) {
      await prisma.loginAttempt.create({
        data: {
          ipAddress: ip,
          identifier: identifier || "unknown",
          userAgent: userAgent || null,
          country,
          success: false,
          reason,
          type: "LOGIN"
        }
      });
    }

    if (isIpWhitelisted(ip)) {
      return { isBlocked: false };
    }

    const recentFailures = prisma.loginAttempt 
      ? await prisma.loginAttempt.count({
          where: {
            ipAddress: ip,
            type: "LOGIN",
            success: false,
            createdAt: { gte: windowStart }
          }
        })
      : 1;

    if (recentFailures >= SECURITY_CONFIG.HARD_LIMIT_ATTEMPTS) {
      const banReason = `Exceeded ${SECURITY_CONFIG.HARD_LIMIT_ATTEMPTS} failed attempts within ${SECURITY_CONFIG.ATTEMPT_WINDOW_MINUTES} minutes`;
      await blockIp(ip, banReason, SECURITY_CONFIG.HARD_BLOCK_HOURS, country, { identifier, userAgent });
      return {
        isBlocked: true,
        tier: "HARD",
        duration: "24 hours",
        reason: banReason
      };
    } else if (recentFailures >= SECURITY_CONFIG.SOFT_LIMIT_ATTEMPTS) {
      const cooldownReason = `Exceeded ${SECURITY_CONFIG.SOFT_LIMIT_ATTEMPTS} failed attempts. Cooldown activated.`;
      await blockIp(ip, cooldownReason, SECURITY_CONFIG.SOFT_BLOCK_MINUTES / 60, country, { identifier, userAgent });
      return {
        isBlocked: true,
        tier: "SOFT",
        duration: "15 minutes",
        reason: cooldownReason
      };
    }

    return {
      isBlocked: false,
      attemptsRemaining: Math.max(0, SECURITY_CONFIG.SOFT_LIMIT_ATTEMPTS - recentFailures)
    };
  } catch (error) {
    console.error("[Security] Error evaluating login attempt:", error);
    return { isBlocked: false };
  }
}

/**
 * Records a successful login and clears soft failures
 */
export async function recordSuccessfulLogin(ip, identifier, userAgent, country = null) {
  try {
    if (prisma.loginAttempt) {
      await prisma.loginAttempt.create({
        data: {
          ipAddress: ip,
          identifier,
          userAgent: userAgent || null,
          country,
          success: true,
          reason: "AUTHENTICATED",
          type: "LOGIN"
        }
      });
    }

    ipBanCache.delete(ip);
    if (prisma.blockedIp) {
      await prisma.blockedIp.deleteMany({
        where: { ipAddress: ip }
      }).catch(() => {});
    }
  } catch (error) {
    console.error("[Security] Error recording successful login:", error);
  }
}

/**
 * Checks rate limits for password reset requests
 */
export async function checkPasswordResetRateLimit(ip, identifier, country = null) {
  if (isIpWhitelisted(ip)) return { allowed: true };

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    if (prisma.loginAttempt) {
      const ipAttempts = await prisma.loginAttempt.count({
        where: {
          ipAddress: ip,
          type: "PASSWORD_RESET",
          createdAt: { gte: oneHourAgo }
        }
      });

      if (ipAttempts >= SECURITY_CONFIG.PASSWORD_RESET_MAX_HOURLY) {
        return {
          allowed: false,
          error: "Too many password reset requests from this IP. Please wait 1 hour before trying again."
        };
      }

      if (identifier) {
        const identifierAttempts = await prisma.loginAttempt.count({
          where: {
            identifier,
            type: "PASSWORD_RESET",
            createdAt: { gte: oneHourAgo }
          }
        });

        if (identifierAttempts >= SECURITY_CONFIG.PASSWORD_RESET_MAX_HOURLY) {
          return {
            allowed: false,
            error: "Too many password reset requests for this account. Please wait 1 hour before trying again."
          };
        }
      }

      await prisma.loginAttempt.create({
        data: {
          ipAddress: ip,
          identifier: identifier || "unknown",
          country,
          success: true,
          reason: "RESET_REQUESTED",
          type: "PASSWORD_RESET"
        }
      });
    }

    return { allowed: true };
  } catch (error) {
    console.error("[Security] Error checking password reset rate limit:", error);
    return { allowed: true };
  }
}

/**
 * Account-level lockout check
 */
export async function checkAccountLockout(identifier) {
  if (!identifier) return { isUnderAttack: false };

  const windowStart = new Date(Date.now() - SECURITY_CONFIG.ATTEMPT_WINDOW_MINUTES * 60 * 1000);

  try {
    if (prisma.loginAttempt) {
      const failures = await prisma.loginAttempt.count({
        where: {
          identifier,
          type: "LOGIN",
          success: false,
          createdAt: { gte: windowStart }
        }
      });

      if (failures >= 10) {
        return {
          isUnderAttack: true,
          message: "Account security lock: Multiple unauthorized attempts detected. Progressive delay active."
        };
      }
    }
  } catch (error) {
    console.error("[Security] Error checking account lockout:", error);
  }

  return { isUnderAttack: false };
}

/**
 * Maintenance: Purges expired IP bans and old login attempts (> daysToKeep)
 */
export async function purgeOldSecurityData(daysToKeep = 30) {
  const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);
  const now = new Date();

  try {
    let deletedAttempts = 0;
    let deletedBans = 0;

    if (prisma.loginAttempt) {
      const attemptsResult = await prisma.loginAttempt.deleteMany({
        where: { createdAt: { lt: cutoffDate } }
      });
      deletedAttempts = attemptsResult.count;
    }

    if (prisma.blockedIp) {
      const bansResult = await prisma.blockedIp.deleteMany({
        where: { blockedUntil: { lt: now } }
      });
      deletedBans = bansResult.count;
    }

    return {
      success: true,
      deletedAttempts,
      deletedBans,
      message: `Cleaned up ${deletedAttempts} old audit log(s) and ${deletedBans} expired ban record(s).`
    };
  } catch (error) {
    console.error("[Security] Failed to purge old security data:", error);
    return { success: false, error: "Failed to purge security logs." };
  }
}
