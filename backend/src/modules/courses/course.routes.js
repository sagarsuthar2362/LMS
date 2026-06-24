import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  publishCourse,
  publishedCourses,
  singleCourse,
  updateCourse,
} from "./course.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";

const courseRoutes = Router();

// instructor routes
courseRoutes.post("/", verifyToken, authorize("instructor"), createCourse);

courseRoutes.patch(
  "/:courseId",
  verifyToken,
  authorize("instructor"),
  updateCourse,
);

courseRoutes.delete(
  "/:courseId",
  verifyToken,
  authorize("instructor"),
  deleteCourse,
);

courseRoutes.patch(
  "/:courseId/publish",
  verifyToken,
  authorize("instructor"),
  publishCourse,
);

// routes for everyone
courseRoutes.get("/", publishedCourses);
courseRoutes.get("/:courseId", singleCourse);

export default courseRoutes;
