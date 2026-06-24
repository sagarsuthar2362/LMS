import { v2 as cloudinary } from "cloudinary";
import ApiError from "../utils/ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (path) => {
  try {
    let result = await cloudinary.uploader.upload(path);
    return result.secure_url;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export default uploadOnCloudinary;
