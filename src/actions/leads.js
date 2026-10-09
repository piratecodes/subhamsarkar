"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, verifyAdminSession } from "./auth";
import { revalidatePath } from "next/cache";
import { sendClientConfirmationEmail } from "@/lib/mail";

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
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("contact-email");
    const phone = formData.get("contact-phone") || null;
    const rawTimeline = formData.get("timeline");
    const scope = formData.get("project-scope");
    const rawComments = formData.get("system-specs") || "";
    const requiresNda = formData.get("nda-checkbox") === "on";

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
