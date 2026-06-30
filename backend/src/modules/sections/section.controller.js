import asyncHandler from "../../utils/asyncHandler.js";
import Course from "../courses/course.model.js";
import ApiError from "../../utils/ApiError.js";
import Section from "./section.model.js";

export const createSection = asyncHandler(async (req, res) => {
  const { title, description, order } = req.body;
  const { courseId } = req.params;

  // validate required fields
  if (!title || !description || !order) {
    throw new ApiError(400, "All fields are required");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course not found");
  }

  // ensure only the owner instructor can modify this course
  if (course.instructor.toString() !== req.user.id) {
    throw new ApiError(403, "Forbidden");
  }

  const existingSection = await Section.findOne({
    course: courseId,
    order,
  });

  //   prevent duplication of the section within same course
  if (existingSection) {
    throw new ApiError(
      409,
      "section order already exist change order of new section",
    );
  }

  const section = await Section.create({
    title,
    description,
    order,
    course: courseId,
  });

  return res
    .status(201)
    .json({ success: true, message: "section created succesfully", section });
});

export const getCourseSections = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (!course.isPublished) {
    throw new ApiError(404, "Course not found");
  }

  const sections = await Section.find({ course: courseId }).sort({
    order: 1,
  });

  return res.status(200).json({ success: true, sections });
});

export const updateSection = asyncHandler(async (req, res) => {});
export const deleteSection = asyncHandler(async (req, res) => {});
 