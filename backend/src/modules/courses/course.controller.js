import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import Course from "./course.model.js";

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, isPublished } = req.body;

  if (!title || !description || !price || !category) {
    throw new ApiError(400, "fields cannot be empty");
  }

  const course = await Course.create({
    title,
    description,
    price,
    category,
    isPublished,
    instructor: req.user.id,
    thumbnail: "testing",
  });

  res
    .status(201)
    .json({ success: true, message: "course created succesfully", course });
});

export const publishedCourses = asyncHandler(async (req, res) => {
  let courses = await Course.find({ isPublished: true });

  res.status(200).json({ success: true, courses });
});

export const singleCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  let course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(404, "course not found");
  }

  res.status(200).json({ success: true, course });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    isPublished,
    thumbnail,
    courseId,
  } = req.body;

  const course = await Course.findOne({ _id: courseId });

  if(!course){
    throw new ApiError()
  }

  if (course.instructor !== req.user.id) {
    throw new ApiError(401, "unauthorized access");
  }

  const updatedCourse = await Course.updateOne(
    { _id: courseId },
    { title, description, thumbnail, price, category, isPublished },
  );

  res.status(200).json({ success: true, updatedCourse });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findOne({ _id: courseId });

  if (course.instructor !== req.user.id) {
    throw new ApiError(
      401,
      "You are trying to delete the resource which is not yours",
    );
  }

  res
    .status(200)
    .json({ success: true, message: "Course deleted succesfully" });
});

export const publishCourse = asyncHandler(async (req, res) => {});

export const uploadThumbnail = asyncHandler(async (req, res) => {});
