"use server";

import { uploadToCloudinary } from "@riderota/utils";

const uploadAssetToCloudinary = async (base64Image: string) => {
  try {
    const assetUrl = await uploadToCloudinary(base64Image);
    return assetUrl;
  } catch (error) {
    console.error("Error uploading asset to Cloudinary:", error);
    throw error;
  }
};

export { uploadAssetToCloudinary };
