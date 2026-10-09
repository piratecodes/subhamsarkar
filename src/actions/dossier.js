"use server";

import { prisma } from "@/lib/prisma";
import { verifySession, verifyAdminSession } from "./auth";
import { revalidatePath } from "next/cache";
import { deleteMediaFiles } from "./media";

export async function getProjects() {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const projects = await prisma.dossier.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, projects };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function createProject(formData) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const project = await prisma.dossier.create({
      data: {
        title: formData.title,
        category: formData.category,
        industry: formData.industry,
        industryNiche: formData.industryNiche || null,
        associatedWith: formData.associatedWith || null,
        associatedWithLogo: formData.associatedWithLogo || null,
        associatedWithLogoAlt: formData.associatedWithLogoAlt || null,
        associatedWithLink: formData.associatedWithLink || null,
        ref: formData.ref,
        status: formData.status,
        discipline: formData.discipline,
        eyebrow: formData.eyebrow || null,
        summary: formData.summary,
        bottleneck: formData.bottleneck,
        approach: formData.approach,
        outcome: formData.outcome,
        thumbnail: formData.thumbnail || null,
        thumbnailAlt: formData.thumbnailAlt || null,
        images: formData.images || [],
        pipeline: formData.pipeline || [],
        stats: formData.stats || {},
        topologySchematic: formData.topologySchematic || {},
        technicalDetails: formData.technicalDetails || {},
        isPublished: formData.isPublished ?? true
      }
    });
    
    revalidatePath("/sudo/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id, formData) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const oldProject = await prisma.dossier.findUnique({ where: { id }});
    
    const project = await prisma.dossier.update({
      where: { id },
      data: {
        title: formData.title,
        category: formData.category,
        industry: formData.industry,
        industryNiche: formData.industryNiche || null,
        associatedWith: formData.associatedWith || null,
        associatedWithLogo: formData.associatedWithLogo || null,
        associatedWithLogoAlt: formData.associatedWithLogoAlt || null,
        associatedWithLink: formData.associatedWithLink || null,
        ref: formData.ref,
        status: formData.status,
        discipline: formData.discipline,
        eyebrow: formData.eyebrow || null,
        summary: formData.summary,
        bottleneck: formData.bottleneck,
        approach: formData.approach,
        outcome: formData.outcome,
        thumbnail: formData.thumbnail,
        thumbnailAlt: formData.thumbnailAlt,
        images: formData.images,
        pipeline: formData.pipeline,
        stats: formData.stats,
        topologySchematic: formData.topologySchematic,
        technicalDetails: formData.technicalDetails,
        isPublished: formData.isPublished
      }
    });
    
    // Cleanup replaced images
    if (oldProject) {
      const filesToDelete = [];
      if (oldProject.thumbnail && oldProject.thumbnail !== formData.thumbnail) filesToDelete.push(oldProject.thumbnail);
      if (oldProject.associatedWithLogo && oldProject.associatedWithLogo !== formData.associatedWithLogo) filesToDelete.push(oldProject.associatedWithLogo);
      
      const newImages = (formData.images || []).map(img => img.url);
      const oldImages = (oldProject.images || []).map(img => img.url);
      for (const oldImg of oldImages) {
        if (!newImages.includes(oldImg)) filesToDelete.push(oldImg);
      }
      
      if (filesToDelete.length > 0) {
        await deleteMediaFiles(filesToDelete);
      }
    }

    revalidatePath("/sudo/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id) {
  const session = await verifyAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const project = await prisma.dossier.findUnique({ where: { id }});
    
    await prisma.dossier.delete({
      where: { id }
    });
    
    // Cleanup all images
    if (project) {
      const filesToDelete = [];
      if (project.thumbnail) filesToDelete.push(project.thumbnail);
      if (project.associatedWithLogo) filesToDelete.push(project.associatedWithLogo);
      if (project.images) {
         filesToDelete.push(...project.images.map(img => img.url));
      }
      if (filesToDelete.length > 0) {
        await deleteMediaFiles(filesToDelete);
      }
    }

    revalidatePath("/sudo/projects");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function getUniqueDossierCategoriesAndIndustries() {
  const session = await verifySession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const projects = await prisma.dossier.findMany({
      select: { category: true, industry: true }
    });
    const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];
    const industries = [...new Set(projects.map(p => p.industry).filter(Boolean))];
    return { success: true, categories, industries };
  } catch (error) {
    console.error("Failed to fetch unique fields:", error);
    return { success: false, error: "Failed to fetch unique fields" };
  }
}
