import mongoose from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
