import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  publishCourse,
  publishedCourses,
  singleCourse,
  updateCourse,
  uploadThumbnail,
} from "./course.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { authorize } from "../../middleware/authorize.js";
import upload from "../../middleware/multer.middleware.js";

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

courseRoutes.patch(
  "/:courseId/thumbnail",
  upload.single("thumbnail"),
  verifyToken,
  uploadThumbnail,
);

// routes for everyone
courseRoutes.get("/", publishedCourses);
courseRoutes.get("/:courseId", singleCourse);

export default courseRoutes;
