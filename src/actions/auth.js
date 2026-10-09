"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { deleteMediaFiles } from "@/actions/media";
import { sendPasswordResetEmail } from "@/lib/mail";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super_secret_key_change_me_in_production");

export async function login(formData) {
  try {
    const identifier = formData.get("identifier"); // email or username
    const password = formData.get("password");

    if (!identifier || !password) {
      return { success: false, error: "Please enter your credentials." };
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

    if (!user) {
      return { success: false, error: "Invalid login credentials." };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid login credentials." };
    }

    // Create short-lived access token (15 mins)
    const token = await new SignJWT({ userId: user.id, role: user.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(JWT_SECRET);

    // Create long-lived refresh token (7 days)
    const refreshToken = await new SignJWT({ userId: user.id, type: "refresh" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(JWT_SECRET);

    // Save session in DB using refreshToken as the anchor
    await prisma.session.create({
      data: {
        userId: user.id,
        token: refreshToken, // Store refresh token to allow revoking devices
        device: "Web Browser", // In real app, parse user-agent
      }
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Set HTTP-only cookies
    const cookieStore = await cookies();
    cookieStore.set("opt_access", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15 // 15 minutes
    });

    cookieStore.set("opt_refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "An error occurred during authentication." };
  }
}

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("opt_access")?.value;
  const refreshToken = cookieStore.get("opt_refresh")?.value;

  // If no tokens exist, user is definitely logged out
  if (!token && !refreshToken) return null;

  try {
    // 1. Try to verify the access token
    if (token) {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload;
    }
  } catch (error) {
    // Token expired or invalid, fall through to refresh logic
  }

  // 2. If access token is missing or expired, but we have a refresh token
  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, JWT_SECRET);

      // Check if session is revoked in DB
      const dbSession = await prisma.session.findUnique({ where: { token: refreshToken } });
      if (!dbSession || dbSession.isRevoked) {
        return null;
      }

      // Fetch actual role
      const dbUser = await prisma.user.findUnique({ where: { id: payload.userId } });
      const actualRole = dbUser ? dbUser.role : "MEMBER";

      // Generate a NEW access token
      const newAccessToken = await new SignJWT({ userId: payload.userId, role: actualRole })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("15m")
        .sign(JWT_SECRET);

      try {
        cookieStore.set("opt_access", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 15 // 15 minutes
        });
      } catch (e) {
        // Ignored when called from Server Components
      }

      // Update last active
      await prisma.session.update({
        where: { id: dbSession.id },
        data: { lastActive: new Date() }
      });

      return { userId: payload.userId, role: actualRole };
    } catch (err) {
      // Refresh token is invalid/expired
      return null;
    }
  }

  return null;
}

export async function getAuthUser() {
  const session = await verifySession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      profileImage: true,
      designation: true,
      bio: true,
    }
  });

  return user;
}

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("opt_refresh")?.value;

  if (refreshToken) {
    await prisma.session.updateMany({
      where: { token: refreshToken },
      data: { isRevoked: true }
    });
  }

  cookieStore.delete("opt_access");
  cookieStore.delete("opt_refresh");
}

export async function resetPasswordRequest(identifier) {
  try {
    const user = await prisma.user.findFirst({ 
      where: { 
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      } 
    });

    if (!user) {
      // Return success anyway to prevent enumeration
      return { success: true, message: "If this account exists, a reset link has been dispatched." };
    }

    // Generate secure token
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry }
    });

    const hostUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const resetUrl = `${hostUrl}/sudo/reset-password/${resetToken}`;
    console.log(`[SECURE_LOG] Reset URL for ${user.email}: ${resetUrl}`);

    // Dispatch beautiful HTML email asynchronously to primary email
    sendPasswordResetEmail(user.email, resetToken, hostUrl).catch(console.error);

    // If an alternate email exists, send it there too!
    if (user.alternateEmail) {
      console.log(`[SECURE_LOG] Also dispatching to alternate email: ${user.alternateEmail}`);
      sendPasswordResetEmail(user.alternateEmail, resetToken, hostUrl).catch(console.error);
    }

    return {
      success: true,
      message: "If this account exists, a reset link has been dispatched to your primary and alternative email addresses.",
      _devUrl: resetUrl // Expose this purely for testing/demo per user request
    };
  } catch (error) {
    console.error("Reset Password Error:", error);
    return { success: false, error: "An error occurred during the password reset request." };
  }
}

export async function resetPasswordWithToken(token, newPassword) {
  try {
    const user = await prisma.user.findUnique({ where: { resetToken: token } });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return { success: false, error: "This password reset link is invalid or has expired." };
    }

    const passError = await validatePassword(newPassword);
    if (passError) {
      return { success: false, error: passError };
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    // SECURITY: Automatically revoke all active sessions when the password is changed
    await prisma.session.updateMany({
      where: { userId: user.id, isRevoked: false },
      data: { isRevoked: true }
    });

    return { success: true, message: "Password has been reset successfully. You have been logged out of all devices." };
  } catch (error) {
    console.error("Token Reset Error:", error);
    return { success: false, error: "An error occurred while resetting the password." };
  }
}

export async function updateProfile(formData) {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const data = {};
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const alternateEmail = formData.get("alternateEmail");
    const designation = formData.get("designation");
    const bio = formData.get("bio");
    const profileImage = formData.get("profileImage");

    const oldUser = await prisma.user.findUnique({ where: { id: session.userId } });

    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (email) data.email = email;
    if (alternateEmail !== null) data.alternateEmail = alternateEmail;
    if (designation !== null) data.designation = designation;
    if (bio !== null) data.bio = bio;
    if (profileImage !== null) {
      data.profileImage = profileImage;
      if (oldUser.profileImage && oldUser.profileImage !== profileImage) {
        // Run without awaiting so it doesn't block
        deleteMediaFiles([oldUser.profileImage]).catch(console.error);
      }
    }

    await prisma.user.update({
      where: { id: session.userId },
      data
    });

    revalidatePath('/', 'layout');

    return { success: true };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { success: false, error: "Failed to update profile." };
  }
}

export async function getActiveSessions() {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const sessions = await prisma.session.findMany({
      where: { userId: session.userId, isRevoked: false },
      orderBy: { lastActive: "desc" }
    });

    const cookieStore = await cookies();
    const currentRefreshToken = cookieStore.get("opt_refresh")?.value;

    return {
      success: true,
      sessions: sessions.map(s => ({
        id: s.id,
        device: s.device,
        ipAddress: s.ipAddress,
        lastActive: s.lastActive,
        isCurrent: s.token === currentRefreshToken
      }))
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch sessions." };
  }
}

export async function revokeAllSessions() {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const cookieStore = await cookies();
    const currentRefreshToken = cookieStore.get("opt_refresh")?.value;

    const updateQuery = {
      where: { userId: session.userId, isRevoked: false },
      data: { isRevoked: true }
    };

    if (currentRefreshToken) {
      updateQuery.where.token = { not: currentRefreshToken };
    }

    await prisma.session.updateMany(updateQuery);

    return { success: true, message: "All other sessions revoked successfully." };
  } catch (error) {
    console.error("Revoke All Error:", error);
    return { success: false, error: "Failed to revoke sessions." };
  }
}

export async function revokeSession(sessionId) {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.session.update({
      where: { id: sessionId, userId: session.userId },
      data: { isRevoked: true }
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to revoke session." };
  }
}

export async function changePassword(formData) {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return { success: false, error: "User not found." };

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) return { success: false, error: "Incorrect current password." };

    const passError = await validatePassword(newPassword);
    if (passError) {
      return { success: false, error: passError };
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: session.userId },
      data: { passwordHash }
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to change password." };
  }
}


export async function verifyAdminSession() {
  const session = await verifySession();
  if (!session) return null;
  if (session.role === 'MEMBER') return null;
  return session;
}

export async function validatePassword(password) {
  if (!password || password.length < 8 || password.length > 32) {
    return "Password must be between 8 and 32 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null;
}
