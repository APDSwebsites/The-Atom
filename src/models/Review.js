//Destroy

import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this review."],
    maxlength: [60, "Title cannot be more than 60 characters"],
  },
  content: {
    type: String,
    required: [true, "Please provide the content for this review."],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please provide a rating between 1 and 5."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.index({ title: "text", content: "text" });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
