import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    externalLink: {
      type: String,
      required: [true, "Please provide an external link"],
    },
    imageData: {
      contentType: String,
      base64Data: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ad = mongoose.models.Ad || mongoose.model("Ad", AdSchema);

export default Ad;
