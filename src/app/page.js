
// pages/index.js
// app/page.js
"use client";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
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
//   <div className="space-y-4">
//   {articles.map((article) => (
//     <div key={article._id} className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-xl font-semibold">{article.title}</h2>
//       <p className="text-gray-600">By {article.author}</p>
//       <p className="text-sm text-gray-500">
//         Published: {new Date(article.publishDate).toLocaleDateString()}
//       </p>
//       <div className="mt-4 space-x-4">
//         <Link href="/admin/create-article" className="text-blue-500 hover:underline">Edit</Link>
//         <button onClick={() => handleDelete(article)} className="text-red-500 hover:underline">Delete</button>
//       </div>
//     </div>
//   ))}
// </div>
  return (
    <Layout>
      <h1></h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold mb-4"></h2>
          <div className="bg-gray-200 p-4 mb-8">{articles.map((article) => (
           <h3 className="text-xl font-semibold">{article.title}</h3> 
          ))}
            {/* <h3 className="text-xl font-semibold">Headline Goes Here</h3> */}
            <img
              src="/placeholder-image.jpg"
              alt=""
              className="w-full h-64 object-cover mb-4"
            />
            <p> Brief excerpt of the top story goes here. Click to read more... </p>

          </div>

          <h2 className="text-2xl font-bold mb-4">Latest Content</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-100 p-4">
                <h3 className="text-lg font-semibold">Article Title</h3>
                <p>Brief excerpt of the article content...</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Announcements & Ads</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-300 p-4 h-48">
                Ad {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
