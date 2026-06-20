import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError.js";

export const generateToken = async (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  } catch (error) {
    throw new ApiError(500, "failed to generate token");
  }
};



