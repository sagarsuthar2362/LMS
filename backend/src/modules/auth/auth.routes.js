import { Router } from "express";
import { login, logout, me, register } from "./auth.controller.js";
import { verifyToken } from "./auth.token.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", verifyToken, me);

export default authRoutes;
