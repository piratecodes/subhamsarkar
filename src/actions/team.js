"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUser, verifySession, validatePassword } from "./auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { destroyCloudinaryImage } from "@/lib/cloudinary";

// Utility to enforce Super Admin privileges
async function enforceSuperAdmin() {
  const user = await getAuthUser();
  if (!user || user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized. Super Admin access required.");
  }
  return user;
}

// Utility to enforce Manager or Super Admin privileges
async function enforceManagerOrSuperAdmin() {
  const user = await getAuthUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "MANAGER")) {
    throw new Error("Unauthorized. Manager or Super Admin access required.");
  }
  return user;
}

export async function getAllTeamMembers() {
  try {
    const user = await getAuthUser();
    if (!user) throw new Error("Unauthorized");

    const team = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        alternateEmail: true,
        designation: true,
        role: true,
        isActive: true,
        profileImage: true,
      },
      orderBy: {
        role: 'asc' // SUPER_ADMIN first
      }
    });

    return { success: true, team };
  } catch (error) {
    return { success: false, error: error.message || "Failed to fetch team members." };
  }
}

export async function createTeamMember(formData) {
  try {
    const currentUser = await enforceManagerOrSuperAdmin();

    const role = formData.get("role") || "STAFF";

    // RBAC: Managers cannot create Super Admins
    if (currentUser.role === "MANAGER" && role === "SUPER_ADMIN") {
      return { success: false, error: "Managers cannot create Super Admin accounts." };
    }

    const email = formData.get("email");
    const username = formData.get("username");
    
    // Check if exists
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existing) {
      return { success: false, error: "A user with that email or username already exists." };
    }

    const password = formData.get("password");
    const passError = await validatePassword(password);
    if (passError) {
      return { success: false, error: passError };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        username: username,
        email: email,
        alternateEmail: formData.get("alternateEmail") || null,
        designation: formData.get("designation") || null,
        role: role,
        isActive: formData.get("isActive") === "true",
        passwordHash
      }
    });

    revalidatePath("/sudo/teams");
    return { success: true, message: "Team member created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message || "Failed to create team member." };
  }
}

export async function updateTeamMember(userId, formData) {
  try {
    const currentUser = await getAuthUser();
    if (!currentUser) throw new Error("Unauthorized");

    const isTargetingSelf = currentUser.id === userId;
    const isSuperAdmin = currentUser.role === "SUPER_ADMIN";
    const isManager = currentUser.role === "MANAGER";

    if (!isTargetingSelf && !isSuperAdmin && !isManager) {
      return { success: false, error: "You do not have permission to edit this user." };
    }

    // Fetch target user to check their current role
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!targetUser) {
      return { success: false, error: "User not found." };
    }

    // RBAC: Managers cannot edit Super Admins (unless editing themselves, which shouldn't happen)
    if (isManager && !isTargetingSelf && targetUser.role === "SUPER_ADMIN") {
      return { success: false, error: "Managers cannot edit Super Admin accounts." };
    }

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      designation: formData.get("designation") || null,
      alternateEmail: formData.get("alternateEmail") || null,
    };

    // Only super admin or manager can change roles and active status
    if (isSuperAdmin || isManager) {
      const newRole = formData.get("role");
      if (newRole) {
        // RBAC: Managers cannot promote someone to Super Admin
        if (isManager && newRole === "SUPER_ADMIN") {
          return { success: false, error: "Managers cannot assign the Super Admin role." };
        }
        data.role = newRole;
      }

      const isActiveStr = formData.get("isActive");
      if (isActiveStr !== null) {
        // Prevent users from deactivating themselves
        if (isTargetingSelf && isActiveStr === "false") {
          return { success: false, error: "Action denied. You cannot deactivate your own account!" };
        }
        data.isActive = isActiveStr === "true";
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data
    });

    revalidatePath("/sudo/teams");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message || "Failed to update team member." };
  }
}

export async function deleteTeamMember(userId) {
  try {
    const currentUser = await enforceManagerOrSuperAdmin();

    if (userId === currentUser.id) {
      return { success: false, error: "Action denied. You cannot delete your own account!" };
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, profileImage: true }
    });

    if (!targetUser) return { success: false, error: "User not found" };

    // RBAC: Managers cannot delete Super Admins
    if (currentUser.role === "MANAGER" && targetUser.role === "SUPER_ADMIN") {
      return { success: false, error: "Managers cannot delete Super Admin accounts." };
    }

    if (targetUser.profileImage) {
      await destroyCloudinaryImage(targetUser.profileImage);
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    revalidatePath("/sudo/teams");
    return { success: true, message: "User has been permanently deleted." };
  } catch (error) {
    return { success: false, error: error.message || "Failed to delete user." };
  }
}

import { cookies } from "next/headers";

export async function getTeamMemberSessions(userId) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("opt_refresh")?.value;
    let currentSessionId = null;
    
    if (refreshToken) {
      const currentSession = await prisma.session.findFirst({
        where: { token: refreshToken },
        select: { id: true }
      });
      if (currentSession) currentSessionId = currentSession.id;
    }

    const currentUser = await getAuthUser();
    // RBAC: ONLY SUPER_ADMIN CAN VIEW SESSIONS
    if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
      throw new Error("Unauthorized. Only Super Admins can view sessions.");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true, username: true }
    });

    if (!targetUser) throw new Error("User not found");

    const sessions = await prisma.session.findMany({
      where: { userId: userId, isRevoked: false },
      orderBy: { lastActive: 'desc' }
    });

    return { success: true, sessions, currentSessionId };
  } catch (error) {
    return { success: false, error: error.message || "Failed to load sessions." };
  }
}

export async function revokeTeamMemberSession(sessionId, targetUserId) {
  try {
    // RBAC: ONLY SUPER_ADMIN CAN REVOKE SESSIONS
    const currentUser = await enforceSuperAdmin();

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, role: true }
    });

    if (!targetUser) return { success: false, error: "User not found" };

    await prisma.session.update({
      where: { id: sessionId, userId: targetUserId },
      data: { isRevoked: true }
    });

    return { success: true, message: "Device session revoked successfully." };
  } catch (error) {
    return { success: false, error: error.message || "Failed to revoke session." };
  }
}

export async function revokeAllTeamMemberSessions(targetUserId) {
  try {
    // RBAC: ONLY SUPER_ADMIN CAN REVOKE SESSIONS
    const currentUser = await enforceSuperAdmin();

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, role: true }
    });

    if (!targetUser) return { success: false, error: "User not found" };

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("opt_refresh")?.value;
    
    // Revoke all sessions for targetUser, EXCEPT the one matching refreshToken
    const updateQuery = {
      where: { 
        userId: targetUserId,
        isRevoked: false
      },
      data: { isRevoked: true }
    };

    if (refreshToken) {
      updateQuery.where.token = { not: refreshToken };
    }

    await prisma.session.updateMany(updateQuery);

    return { success: true, message: "All other sessions revoked successfully." };
  } catch (error) {
    return { success: false, error: error.message || "Failed to revoke sessions." };
  }
}
