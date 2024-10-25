"use client";
import { useState } from "react";
import Image from "next/image";

export default function ArticleForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("news");
  const [tags, setTags] = useState("");
  const [contentBlocks, setContentBlocks] = useState([
    { type: "text", text: "", order: 0 },
  ]);

  const handleAddTextBlock = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "text", text: "", order: contentBlocks.length },
    ]);
  };

  const handleAddImageBlock = () => {
    setContentBlocks([
      ...contentBlocks,
      { type: "image", imageUrl: "", caption: "", order: contentBlocks.length },
    ]);
  };

  const handleContentChange = (index, value, field = "text") => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = value;
    setContentBlocks(newBlocks);
  };

  const handleImageUpload = async (index, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        handleContentChange(index, data.imageData, "imageData");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveBlock = (index) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index);
    newBlocks.forEach((block, i) => {
      block.order = i;
    });
    setContentBlocks(newBlocks);
  };

  const handleMoveBlock = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === contentBlocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...contentBlocks];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[newIndex];
    newBlocks[newIndex] = temp;

    // Update order values
    newBlocks.forEach((block, i) => {
      block.order = i;
    });

    setContentBlocks(newBlocks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!title.trim() || !author.trim() || contentBlocks.length === 0) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          category,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          content: contentBlocks,
          isPublished: true,
        }),
      });

      if (response.ok) {
        alert("Article published successfully!");
        // Reset form
        setTitle("");
        setAuthor("");
        setCategory("news");
        setTags("");
        setContentBlocks([{ type: "text", text: "", order: 0 }]);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to publish article");
      }
    } catch (error) {
      console.error("Error publishing article:", error);
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Author *
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
        >
          <option value="news">News</option>
          <option value="review">Review</option>
          <option value="feature">Feature</option>
          <option value="event">Event</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full border rounded-md shadow-sm p-2"
          placeholder="art, music, culture"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Content Blocks
        </label>
        {contentBlocks.map((block, index) => (
          <div key={index} className="border p-4 rounded relative">
            <div className="absolute right-2 top-2 flex space-x-2">
              <button
                type="button"
                onClick={() => handleMoveBlock(index, "up")}
                disabled={index === 0}
                className="text-blue-500 hover:text-blue-700 disabled:text-gray-400"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMoveBlock(index, "down")}
                disabled={index === contentBlocks.length - 1}
                className="text-blue-500 hover:text-blue-700 disabled:text-gray-400"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => handleRemoveBlock(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>

            {block.type === "text" ? (
              <textarea
                value={block.text}
                onChange={(e) => handleContentChange(index, e.target.value)}
                className="w-full h-32 border rounded p-2 mt-6"
                placeholder="Enter text content..."
              />
            ) : (
              <div className="mt-6">
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(index, e.target.files[0])}
                  accept="image/*"
                  className="mb-2"
                />
                {block.imageData && (
                  <div className="relative h-40 w-full mb-2">
                    <Image
                      src={`data:${block.imageData.contentType};base64,${block.imageData.base64Data}`}
                      alt="Uploaded content"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={block.caption || ""}
                  onChange={(e) =>
                    handleContentChange(index, e.target.value, "caption")
                  }
                  className="w-full border rounded p-2"
                  placeholder="Image caption (optional)"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleAddTextBlock}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add Text Block
        </button>
        <button
          type="button"
          onClick={handleAddImageBlock}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Image Block
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-colors"
      >
        Publish Article
      </button>
    </form>
  );
}
