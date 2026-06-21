import ApiError from "../utils/ApiError.js";
import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(400, "token not found");
  }
};
