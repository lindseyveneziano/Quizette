import React, { useState } from "react";
import MainLayout from "../Components/MainLayout";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";
import dataIcon from "../assets/data.jpg";
import algoIcon from "../assets/algorithms.png";
import cyberIcon from "../assets/cybersecurity.png";
import dbIcon from "../assets/database.png";
import aiIcon from "../assets/ai.png";

const categories = [
  { label: "Data Structures", icon: dataIcon },
  { label: "Algorithms", icon: algoIcon },
  { label: "Cybersecurity", icon: cyberIcon },
  { label: "Database", icon: dbIcon },
  { label: "Artificial Intelligence", icon: aiIcon },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();
  const { setSelectedCategory } = useQuizState();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate("/levels");

    // Update recent searches
    setRecentSearches((prev) => {
      const updated = [category, ...prev.filter((item) => item !== category)];
      return updated.slice(0, 5); // Limit to 5
    });
  };

  const handleRemoveRecent = (category) => {
    setRecentSearches((prev) => prev.filter((item) => item !== category));
  };

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="p-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-4 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />

        {/* Recent Searches */}
        {recentSearches.length > 0 && searchTerm === "" && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 text-black">Recent Searches</h2>
            <div className="flex flex-col gap-2">
              {recentSearches.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 py-2 px-4 rounded-lg transition"
                >
                  <button
                    onClick={() => handleCategoryClick(item)}
                    className="text-blue-600 text-left flex-1"
                  >
                    {item}
                  </button>
                  <button
                    onClick={() => handleRemoveRecent(item)}
                    className="text-gray-400 hover:text-red-500 text-lg ml-3"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-col gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(cat.label)}
                className="flex items-center gap-4 p-3 bg-[#f9fafb] rounded-xl shadow hover:bg-blue-100 transition"
              >
                <img src={cat.icon} alt={cat.label} className="w-10 h-10 object-contain" />
                <span className="text-lg font-medium text-black">{cat.label}</span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 mt-12">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486206.png"
                alt="No results"
                className="w-24 h-24 mb-4 opacity-70"
              />
              <p>No matching categories found!</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
