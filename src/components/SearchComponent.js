import React, { useState } from "react";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `/api/reviews/search?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data.success) {
      setResults(data.data);
    } else {
      console.error("Search failed");
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Search reviews..."
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>
      <div className="mt-4">
        {results.map((review) => (
          <div key={review._id} className="mb-2">
            <h3 className="font-bold">{review.title}</h3>
            <p>{review.content.substring(0, 100)}...</p>
            <p>Rating: {review.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
