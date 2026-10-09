"use server";

import cloudinary, { getCloudinaryFolder, destroyCloudinaryImage } from "@/lib/cloudinary";

export async function uploadMedia(formData) {
  try {
    const file = formData.get("file");
    const folder = formData.get("folder") || "media";
    if (!file || typeof file === "string") {
      return { success: false, error: "No file provided" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Convert to base64 Data URI for Cloudinary
    const base64Str = buffer.toString('base64');
    const dataUri = `data:${file.type || 'image/jpeg'};base64,${base64Str}`;

    const cloudinaryFolder = getCloudinaryFolder(folder);

    const uploadResponse = await cloudinary.uploader.upload(dataUri, {
      folder: cloudinaryFolder,
      resource_type: "auto",
    });

    return { success: true, url: uploadResponse.secure_url };
  } catch (error) {
    console.error("Failed to upload media to Cloudinary:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function deleteMediaFiles(urls) {
  const session = await import('./auth').then(m => m.verifyAdminSession());
  if (!session) return { success: false, error: "Unauthorized" };

  if (!urls || urls.length === 0) return { success: true };
  
  try {
    for (const url of urls) {
      if (!url || typeof url !== 'string') continue;
      
      if (url.includes('res.cloudinary.com')) {
        await destroyCloudinaryImage(url);
      }
    }
    return { success: true };
  } catch (error) {
    console.error("Batch delete failed:", error);
    return { success: false, error: "Failed to delete files" };
  }
}
