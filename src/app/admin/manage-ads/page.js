"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ManageAds() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/ads");
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const handleDelete = async (adId) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    try {
      const response = await fetch(`/api/ads/${adId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchAds();
      } else {
        throw new Error("Failed to delete ad");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete ad");
    }
  };

  const toggleActive = async (adId, currentStatus) => {
    try {
      const response = await fetch(`/api/ads/${adId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchAds();
      }
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Advertisements</h1>
        <Link
          href="/admin/create-ad"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Ad
        </Link>
      </div>

      <div className="grid gap-6">
        {ads.map((ad) => (
          <div
            key={ad._id}
            className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              {ad.imageData && (
                <img
                  src={`data:${ad.imageData.contentType};base64,${ad.imageData.base64Data}`}
                  alt={ad.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div>
                <h2 className="font-semibold">{ad.title}</h2>
                <a
                  href={ad.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm hover:underline"
                >
                  {ad.externalLink}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleActive(ad._id, ad.isActive)}
                className={`px-3 py-1 rounded ${
                  ad.isActive ? "bg-green-500" : "bg-gray-500"
                } text-white`}
              >
                {ad.isActive ? "Active" : "Inactive"}
              </button>
              <button
                onClick={() => handleDelete(ad._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
