import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this article."],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    content: [
      {
        type: {
          type: String,
          enum: ["text", "image"],
          required: true,
        },
        text: String,
        imageUrl: String,
        caption: String,
        order: Number,
      },
    ],
    category: {
      type: String,
      required: [true, "Please specify a category"],
      enum: ["news", "review", "feature", "event"],
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent multiple models error during hot reload in development
const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);

export default Article;
