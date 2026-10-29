"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, verifyAdminSession } from "./auth";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });
  
  return settings;
}

export async function updateSiteSettings(formData) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const data = {
      whatsapp: formData.get("whatsapp") || null,
      email: formData.get("email") || null,
      address: formData.get("address") || null,
      facebook: formData.get("facebook") || null,
      instagram: formData.get("instagram") || null,
      linkedin: formData.get("linkedin") || null,
      github: formData.get("github") || null,
      twitter: formData.get("twitter") || null,
    };

    await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data }
    });

    revalidatePath('/sudo/settings');
    revalidatePath('/', 'layout');
    revalidatePath('/privacy-policy');
    revalidatePath('/terms-and-conditions');

    return { success: true };
  } catch (error) {
    console.error("Failed to update site settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
