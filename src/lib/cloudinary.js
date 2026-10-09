import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinaryFolder = (type) => {
  // type can be 'insights', 'projects', 'staffs'
  const baseFolder = process.env.NODE_ENV === 'production' 
    ? 'subham.digital' 
    : 'subham.digital/dev';
    
  return `${baseFolder}/${type}`;
};

export const destroyCloudinaryImage = async (imageUrl) => {
  try {
    if (!imageUrl || !imageUrl.includes('res.cloudinary.com')) return;
    
    const splitUrl = imageUrl.split('/');
    const uploadIndex = splitUrl.findIndex((part) => part === 'upload');
    
    if (uploadIndex !== -1) {
      // The version number (v123456789) is usually at uploadIndex + 1, so the public_id starts at uploadIndex + 2
      const publicIdWithExtension = splitUrl.slice(uploadIndex + 2).join('/');
      const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.')) || publicIdWithExtension;
      
      await cloudinary.uploader.destroy(publicId);
      console.log(`[Cloudinary] Deleted image: ${publicId}`);
    }
  } catch (err) {
    console.error('[Cloudinary] Deletion error:', err);
  }
};

export default cloudinary;
