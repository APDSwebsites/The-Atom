"use client";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArchivePage() {
  const [articles, setArticles] = useState([]);
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
    fetchAds();

    // Set up the ad rotation interval
    const rotationInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= ads.length ? 0 : nextIndex;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(rotationInterval);
  }, [ads.length]);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, articles]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await fetch("/api/ads");
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const filterArticles = () => {
    if (!searchQuery.trim()) {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter((article) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        article.title?.toLowerCase().includes(searchTerm) ||
        article.author?.toLowerCase().includes(searchTerm) ||
        article.content?.some(
          (block) =>
            block.type === "text" &&
            block.text?.toLowerCase().includes(searchTerm)
        ) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredArticles(filtered);
  };

  const getFirstTextBlock = (content) => {
    if (!Array.isArray(content)) return "";
    const textBlock = content.find((block) => block.type === "text");
    return textBlock?.text || "";
  };

  const getFirstImageBlock = (content) => {
    if (!Array.isArray(content)) return null;
    return content.find((block) => block.type === "image" && block.imageData);
  };

  // Get currently visible ads (4 at a time)
  const getVisibleAds = () => {
    if (ads.length <= 4) return ads;

    const visibleAds = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentAdIndex + i) % ads.length;
      visibleAds.push(ads[index]);
    }
    return visibleAds;
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Search</h1>

        {/* Search Bar */}
        <div className="mb-8 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded"
            style={{ width: "12.5%" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-8">
          {/* Ad Sidebar with Carousel */}
          <aside className="w-64 space-y-4">
            <h2 className="text-xl font-bold mb-4">Sponsored Content</h2>
            <div className="space-y-4 relative transition-all duration-500 ease-in-out">
              {getVisibleAds().map((ad) => (
                <a
                  key={ad._id}
                  href={ad.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  {ad.imageData && (
                    <img
                      src={`data:${ad.imageData.contentType};base64,${ad.imageData.base64Data}`}
                      alt={ad.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-2">
                    <h3 className="font-semibold">{ad.title}</h3>
                  </div>
                </a>
              ))}
              {/* Carousel Indicators */}
              {ads.length > 4 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {Array.from({ length: Math.ceil(ads.length / 4) }).map(
                    (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentAdIndex(idx * 4)}
                        className={`w-2 h-2 rounded-full ${
                          Math.floor(currentAdIndex / 4) === idx
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Go to ad set ${idx + 1}`}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => {
              const firstImage = getFirstImageBlock(article.content);
              const excerpt = getFirstTextBlock(article.content);

              return (
                <Link
                  href={`/articles/${article._id}`}
                  key={article._id}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <article className="h-full flex flex-col">
                    {firstImage && firstImage.imageData && (
                      <div className="relative w-full h-48">
                        <img
                          src={`data:${firstImage.imageData.contentType};base64,${firstImage.imageData.base64Data}`}
                          alt={firstImage.caption || article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-grow">
                      <h2 className="text-xl font-bold mb-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-2">
                        By {article.author} •{" "}
                        {new Date(article.publishDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 line-clamp-3 mb-4">
                        {excerpt}
                      </p>
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No articles found matching your search.
          </p>
        )}
      </div>
    </Layout>
  );
}