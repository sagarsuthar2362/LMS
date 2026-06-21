import User from "../users/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import { generateToken } from "./auth.token.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return res.status(201).json({ success: true, user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  let token = await generateToken({
    id: user._id,
    role: user.role,
  });

  res.cookie("token", token);

  return res.status(200).json({ success: true, user });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const me = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user.id);

  if (!currentUser) {
    throw new ApiError(404, "user not found");
  }

  res.status(200).json({ success: true, currentUser });
});
