"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAd() {
  const [title, setTitle] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("externalLink", externalLink);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/ads", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/admin/manage-ads");
        router.refresh();
      } else {
        throw new Error("Failed to create ad");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("Failed to create ad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Create New Advertisement</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">External Link</label>
          <input
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://..."
            required
          />
        </div>

        <div>
          <label className="block mb-2">Advertisement Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
          {preview && (
            <div className="mt-4 relative h-48">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Creating..." : "Create Advertisement"}
        </button>
      </form>
    </div>
  );
}
