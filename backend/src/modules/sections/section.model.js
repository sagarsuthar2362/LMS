import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required:true
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const Section = mongoose.model("Section", SectionSchema);
export default Section;
