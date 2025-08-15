import { UploadApiResponse } from "cloudinary";
import cloudinary from "./config";

export const uploadToCloudinary = async (file: string): Promise<string> => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      access_mode: "public",
      media_metadata: true,
    });

    console.log("Uploaded to Cloudinary:", res);

    return res.url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
