import React from "react";
import useQuizState from "../context/useQuizState";

// Updated icon map for new labels
import dataIcon from "../assets/data.jpg";
import algoIcon from "../assets/algorithms.png";
import cyberIcon from "../assets/cybersecurity.png";
import dbIcon from "../assets/database.png";
import aiIcon from "../assets/ai.png";

const categoryIcons = {
  "SQL & Databases": dbIcon,
  "General Programming": algoIcon,
  "DevOps & Security": cyberIcon,
  "Linux Essentials": dataIcon,
  "JavaScript Frameworks": aiIcon,
};

const QuestionCard = ({
  questionData,
  questionNumber,
  totalQuestions,
  onAnswer,
}) => {
  const { selectedCategory, selectedLevel } = useQuizState();
  const icon = categoryIcons[selectedCategory];

  const handleClick = (selectedText) => {
    const selected = questionData.options.find(opt => opt.text === selectedText);
    if (selected) {
      onAnswer(selected.isCorrect);
    }
  };

  return (
    <div className="w-full h-full gap-6 px-5 py-4 flex flex-col items-center justify-start font-times">
      {/* Header badge */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-[140px] h-[140px] bg-[#C7D7E3] rounded-full flex flex-col justify-center items-center shadow px-3 text-center">
          <p className="text-sm font-semibold text-gray-700 leading-tight">
            Level: {selectedLevel || "Beginner"}
          </p>
          <p className="text-sm font-bold text-black leading-tight">
            {selectedCategory || "Category"}
          </p>
          {icon && (
            <img src={icon} alt={selectedCategory} className="w-6 h-6 mt-1" />
          )}
        </div>
        <p className="text-sm text-gray-500">
          {questionNumber}/{totalQuestions}
        </p>
      </div>

      {/* Question box */}
      <div className="bg-[#C7D7E3] text-black text-center text-base font-semibold rounded-xl px-4 py-4 mt-4 shadow w-full">
        {questionData.question}
      </div>

      {/* Answer options */}
      <div className="flex flex-col gap-4 mt-20 w-full">
        {questionData.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleClick(opt.text)}
            className="group w-full flex items-center justify-start bg-[#E6EEF5] hover:bg-[#d5e5f5] text-black font-medium py-3 px-4 rounded-xl border border-gray-300 shadow-sm transition"
          >
            <div className="w-4 h-4 border-2 border-black rounded-full mr-3 group-hover:bg-black transition-all duration-200" />
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
