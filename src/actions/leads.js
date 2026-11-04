"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, verifyAdminSession } from "./auth";
import { revalidatePath } from "next/cache";
import { sendClientConfirmationEmail } from "@/lib/mail";
import { headers } from "next/headers";
import { getClientIp, detectMaliciousPayload, isIpBlocked } from "@/lib/security";

export async function getLeads() {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, leads };
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

export async function createLead(formData) {
  try {
    const headerList = await headers();
    const ip = getClientIp(headerList);

    // 1. Perimeter check: Blocked IP check
    const blockStatus = await isIpBlocked(ip);
    if (blockStatus.isBlocked) {
      return { success: false, error: "Access denied. Network restrictions in place." };
    }

    // 2. Honeypot Trap: Silent bot deflection
    const honeypot = formData.get("company_fax")?.toString();
    if (honeypot && honeypot.trim() !== "") {
      console.warn(`[Security Alert] Spambot deflected via honeypot from IP: ${ip}`);
      return { success: true, lead: { id: "bot-deflected" } };
    }

    // 3. Anti-Spam Rate Limiter: Max 5 lead submissions per IP per 15 minutes
    const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
    const recentSubmissions = await prisma.lead.count({
      where: {
        createdAt: { gte: fifteenMinsAgo }
      }
    });

    if (recentSubmissions >= 5) {
      return { success: false, error: "Too many inquiries submitted from this network. Please wait 15 minutes." };
    }

    const firstName = formData.get("first-name")?.toString().trim();
    const lastName = formData.get("last-name")?.toString().trim();
    const email = formData.get("contact-email")?.toString().trim();
    const phone = formData.get("contact-phone") || null;
    const rawTimeline = formData.get("timeline");
    const scope = formData.get("project-scope");
    const rawComments = formData.get("system-specs") || "";
    const requiresNda = formData.get("nda-checkbox") === "on";

    // 4. Payload inspection: check for SQLi or malicious scripts
    if (detectMaliciousPayload(firstName).isMalicious || 
        detectMaliciousPayload(lastName).isMalicious || 
        detectMaliciousPayload(email).isMalicious || 
        detectMaliciousPayload(rawComments).isMalicious) {
      return { success: false, error: "Submission rejected: Suspicious character sequence detected." };
    }

    let timeline = 'JUST_EXPLORING';
    if (rawTimeline === 'immediate') timeline = 'IMMEDIATE';
    else if (rawTimeline === 'quarterly') timeline = 'ONE_TO_THREE_MONTHS';

    const comments = scope ? `[Scope: ${scope}]\n\n${rawComments}` : rawComments;

    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        timeline,
        comments,
        requiresNda,
        status: 'NEW'
      }
    });
    
    // Alert the admin dashboard
    revalidatePath("/sudo/leads");

    // Send auto-responder email to Client asynchronously
    sendClientConfirmationEmail({
      firstName,
      lastName,
      email,
      phone: phone || "Not provided",
      service: scope || timeline,
      message: rawComments || "No additional comments"
    }).catch(console.error);

    return { success: true, lead };
  } catch (error) {
    console.error("Failed to create lead:", error);
    return { success: false, error: "Failed to create lead" };
  }
}

export async function updateLeadStatus(id, newStatus) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { status: newStatus }
    });
    
    revalidatePath("/sudo/leads");
    return { success: true, lead };
  } catch (error) {
    console.error("Failed to update lead:", error);
    return { success: false, error: "Failed to update lead" };
  }
}

export async function updateLeadNotes(id, adminNotes) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { adminNotes }
    });
    
    revalidatePath("/sudo/leads");
    return { success: true, lead };
  } catch (error) {
    console.error("Failed to update lead notes:", error);
    return { success: false, error: "Failed to update lead notes" };
  }
}

export async function deleteLead(id) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await prisma.lead.delete({
      where: { id }
    });
    
    revalidatePath("/sudo/leads");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}
