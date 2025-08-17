"use server";

import { uploadToCloudinary, generateSlugFromName } from "@riderota/utils";

const uploadAssetToCloudinary = async (base64Image: string) => {
  try {
    const assetUrl = await uploadToCloudinary(base64Image);
    return assetUrl;
  } catch (error) {
    console.error("Error uploading asset to Cloudinary:", error);
    throw error;
  }
};

const generateSlugUtil = (slug: string) => {
  try {
    const generatedSlug = generateSlugFromName(slug);
    return generatedSlug;
  } catch (error) {
    console.error("Error generating slug:", error);
    throw error;
  }
};

export { uploadAssetToCloudinary, generateSlugUtil };
