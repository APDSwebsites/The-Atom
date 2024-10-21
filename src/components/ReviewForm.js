import React, { useState } from "react";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("rating", rating);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Review submitted successfully!");
        setTitle("");
        setContent("");
        setRating(5);
        setImage(null);
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label htmlFor="content" className="block">
          Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label htmlFor="rating" className="block">
          Rating:
        </label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label htmlFor="image" className="block">
          Image:
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="w-full border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
