import { Router } from "express";
import {
  createSection,
  deleteSection,
  getCourseSections,
  updateSection,
} from "./section.controller";
import { verifyToken } from "../../middleware/verifyToken";
import { authorize } from "../../middleware/authorize";

const sectionRoutes = Router();

// route to create a course section
sectionRoutes.post(
  "/courses/:courseId/sections",
  verifyToken,
  authorize("instructor"),
  createSection,
);

// route to get section
sectionRoutes.get("/courses/:courseId/sections", getCourseSections);

// route to update the section
sectionRoutes.patch(
  "sections/:sectionId",
  verifyToken,
  authorize("instructor"),
  updateSection,
);

// route to delete the section
sectionRoutes.delete(
  "sections/:sectionId",
  verifyToken,
  authorize("instructor"),
  deleteSection,
);

export default sectionRoutes;
