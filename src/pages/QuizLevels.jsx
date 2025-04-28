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

  const handleClose = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="relative w-[390px] h-[812px] rounded-2xl overflow-hidden shadow-2xl bg-white flex justify-center items-center">
        <div className="w-[320px] p-6 rounded-2xl shadow-xl text-center relative border border-blue-200 bg-white">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 text-gray-600 text-xl font-bold font-times hover:text-black"
          >
            ×
          </button>

          {/* Header */}
          <h2 className="text-lg font-bold font-times text-gray-800 mb-1">
            Choose Difficulty for{" "}
            <span className="text-blue-600">{selectedCategory}</span>
          </h2>
          <p className="text-sm font-times text-gray-700 mb-5">
            Pick a level that matches your knowledge.
          </p>

          {/* Level buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleLevelClick("beginner")}
              className="w-full py-3 px-4 rounded-xl text-white font-times font-bold shadow transition hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #6ee7b7, #3b82f6)",
              }}
            >
              Beginner
              <p className="text-xs font-medium text-white font-times opacity-90">
                Fundamental concepts
              </p>
            </button>

            <button
              onClick={() => handleLevelClick("intermediate")}
              className="w-full py-3 px-4 rounded-xl text-white font-times font-bold shadow transition hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #60a5fa, #6366f1)",
              }}
            >
              Intermediate
              <p className="text-xs font-medium text-white font-times opacity-90">
                Moderate difficulty with applied knowledge
              </p>
            </button>

            <button
              onClick={() => handleLevelClick("advanced")}
              className="w-full py-3 px-4 rounded-xl text-white font-times font-bold shadow transition hover:scale-105"
              style={{
                background: "linear-gradient(90deg, #3b82f6, #1e40af)",
              }}
            >
              Advanced
              <p className="text-xs font-medium text-white font-times opacity-90">
                Challenging questions to test deep understanding
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizLevels;
