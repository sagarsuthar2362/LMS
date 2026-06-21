import { Router } from "express";
import { createCourse } from "./course.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const courseRoutes = Router();

courseRoutes.post("/", verifyToken, authorize("instructor"), createCourse);

export default courseRoutes;
