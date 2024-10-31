import mongoose from "mongoose";

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "image"],
    required: true,
  },
  text: String,
  imageData: {
    filename: String,
    contentType: String,
    base64Data: String,
  },
  caption: String,
  order: Number,
});

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    category: {
      type: String,
      enum: ["news", "review", "feature", "event"],
      default: "news",
    },
    tags: [String],
    content: [ContentBlockSchema],
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
