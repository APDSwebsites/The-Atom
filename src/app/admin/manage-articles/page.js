"use client";
import { useState, useEffect } from "react";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles when component mounts
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      if (data.success) {
        setArticles(data.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Articles</h1>

      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">By {article.author}</p>
            <p className="text-sm text-gray-500">
              Published: {new Date(article.publishDate).toLocaleDateString()}
            </p>
            <div className="mt-4 space-x-4">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
