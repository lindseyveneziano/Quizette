import React from "react";

const QuestionCard = ({ questionData, questionNumber, totalQuestions, onAnswer }) => {
  const { question, options, answer } = questionData;

  const handleClick = (option) => {
    const isCorrect = option === answer;
    onAnswer(isCorrect);
  };

  return (
    <div className="flex flex-col h-full justify-between">
     
      <div className="text-sm text-gray-600">
        Question {questionNumber} of {totalQuestions}
      </div>

      <div className="mt-4 text-lg font-semibold text-black">{question}</div>

      <div className="mt-4 space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleClick(opt)}
            className="w-full bg-blue-100 hover:bg-blue-200 text-black font-medium py-2 px-4 rounded-lg transition duration-150"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
