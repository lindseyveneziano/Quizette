import React from "react";
import dataIcon from "../assets/data.jpg";
import algoIcon from "../assets/algorithms.png";
import cyberIcon from "../assets/cybersecurity.png";
import dbIcon from "../assets/database.png";
import aiIcon from "../assets/ai.png";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";

// Category data
const categories = [
  { label: "Containers & Deployment", apiValue: "Containers & Deployment", icon: dbIcon },
  { label: "General Programming", apiValue: "General Programming", icon: algoIcon },
  { label: "DevOps & Security", apiValue: "DevOps & Security", icon: cyberIcon },
  { label: "Linux Essentials", apiValue: "Linux Essentials", icon: dataIcon },
  { label: "JavaScript Frameworks", apiValue: "JavaScript Frameworks", icon: aiIcon },
];

const CategoriesSection = ({ searchQuery }) => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useQuizState();

  const handleClick = (category) => {
    setSelectedCategory(category.apiValue);
    navigate("/levels");
  };

  const filtered = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-3">
      <h2 className="text-xl font-normal text-black font-['Times_New_Roman'] mb-3">
        Categories
      </h2>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 px-4">No matching categories found.</p>
      ) : (
        <div className="flex gap-6 overflow-x-auto px-4 scroll-smooth">
          {filtered.map((cat, i) => (
            <button
              key={i}
              className="flex flex-col items-center flex-shrink-0 min-w-[100px] text-center focus:outline-none"
              onClick={() => handleClick(cat)}
            >
              <img
                src={cat.icon}
                alt={cat.label}
                className="w-12 h-12 object-contain"
              />
              <p className="text-[11px] mt-1 font-['Times_New_Roman'] text-black whitespace-nowrap">
                {cat.label}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
