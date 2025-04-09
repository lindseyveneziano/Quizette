import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";

const QuizLevels = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedLevel } = useQuizState();

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/home");
    }
  }, [selectedCategory, navigate]);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow-lg p-6 font-serif">
        <h2 className="text-xl font-bold mb-4 text-center">
          Choose Difficulty for <span className="text-blue-500">{selectedCategory}</span>
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleLevelClick("beginner")}
            className="w-full bg-gradient-to-r from-green-300 to-blue-500 text-white py-3 rounded-xl text-lg font-semibold shadow"
          >
            Beginner
          </button>
          <button
            onClick={() => handleLevelClick("intermediate")}
            className="w-full bg-gradient-to-r from-yellow-300 to-orange-500 text-white py-3 rounded-xl text-lg font-semibold shadow"
          >
            Intermediate
          </button>
          <button
            onClick={() => handleLevelClick("advanced")}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 rounded-xl text-lg font-semibold shadow"
          >
            Advanced
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizLevels;
