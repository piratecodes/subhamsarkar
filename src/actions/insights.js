"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, verifyAdminSession } from "./auth";
import { revalidatePath } from "next/cache";
import { deleteMediaFiles } from "./media";
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export async function getInsights() {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const insights = await prisma.insight.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true
          }
        }
      }
    });
    return { success: true, insights };
  } catch (error) {
    console.error("Failed to fetch insights:", error);
    return { success: false, error: "Failed to fetch insights" };
  }
}

export async function getInsightCategories() {
  try {
    const insights = await prisma.insight.findMany({
      where: { category: { not: null } },
      select: { category: true },
      distinct: ['category'],
    });
    return { success: true, categories: insights.map(i => i.category).filter(c => c && c.trim() !== '') };
  } catch (error) {
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getInsightByCategory(categoryName) {
  try {
    const insight = await prisma.insight.findFirst({
      where: { 
        category: categoryName,
        excerpt: { not: null, not: '' }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, excerpt: insight?.excerpt || null };
  } catch (error) {
    return { success: false, error: "Failed to fetch category data" };
  }
}


// Removed unused processAndSaveImage since uploading is handled by Media API

export async function createInsight(data) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    let finalImageUrl = data.coverImage || null;
    let finalSchema = data.seoJsonLdSchema;
    if (finalSchema && finalImageUrl) {
      finalSchema = finalSchema.replace('__IMAGE_URL_PLACEHOLDER__', 'https://subhamsarkar.dev' + finalImageUrl);
    }

    const insight = await prisma.insight.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        faqs: data.faqs ? JSON.stringify(data.faqs) : null,
        coverImage: finalImageUrl,
        coverImageAlt: data.coverImageAlt || null,
        category: data.category || null,
        customAuthor: data.customAuthor || null,
        authorId: session.userId,
        isPublished: data.isPublished,
        seoMetaTitle: data.seoMetaTitle || null,
        seoMetaDescription: data.seoMetaDescription || null,
        seoMetaKeywords: data.seoMetaKeywords || null,
        seoCanonicalUrl: data.seoCanonicalUrl || null,
        seoIsNoIndex: data.seoIsNoIndex || false,
        seoJsonLdSchema: finalSchema || null,
      }
    });
    
    revalidatePath("/sudo/insights");
    return { success: true, insight };
  } catch (error) {
    console.error("Failed to create insight:", error);
    return { success: false, error: "Failed to create insight" };
  }
}

export async function updateInsight(id, data) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const oldInsight = await prisma.insight.findUnique({ where: { id }});
    let finalImageUrl = data.coverImage || (oldInsight ? oldInsight.coverImage : null);
    
    // If a new image was provided, delete the old one
    if (oldInsight && oldInsight.coverImage && finalImageUrl !== oldInsight.coverImage) {
      await deleteMediaFiles([oldInsight.coverImage]);
    }

    let finalSchema = data.seoJsonLdSchema;
    if (finalSchema && finalImageUrl) {
      finalSchema = finalSchema.replace('__IMAGE_URL_PLACEHOLDER__', 'https://subhamsarkar.dev' + finalImageUrl);
    }

    const insight = await prisma.insight.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        faqs: data.faqs ? JSON.stringify(data.faqs) : null,
        coverImage: finalImageUrl,
        coverImageAlt: data.coverImageAlt || null,
        category: data.category || null,
        customAuthor: data.customAuthor || null,
        authorId: session.userId,
        isPublished: data.isPublished,
        seoMetaTitle: data.seoMetaTitle || null,
        seoMetaDescription: data.seoMetaDescription || null,
        seoMetaKeywords: data.seoMetaKeywords || null,
        seoCanonicalUrl: data.seoCanonicalUrl || null,
        seoIsNoIndex: data.seoIsNoIndex || false,
        seoJsonLdSchema: finalSchema || null,
      }
    });
    
    revalidatePath("/sudo/insights");
    return { success: true, insight };
  } catch (error) {
    console.error("Failed to update insight:", error);
    return { success: false, error: "Failed to update insight" };
  }
}

export async function deleteInsight(id) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const insight = await prisma.insight.findUnique({ where: { id }});
    
    await prisma.insight.delete({
      where: { id }
    });
    
    if (insight && insight.coverImage) {
      await deleteMediaFiles([insight.coverImage]);
    }

    revalidatePath("/sudo/insights");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete insight:", error);
    return { success: false, error: "Failed to delete insight" };
  }
}
