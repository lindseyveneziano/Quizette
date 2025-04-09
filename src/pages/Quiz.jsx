import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";
import questions from "../data/questions";
import QuestionCard from "../components/QuestionCard";

const Quiz = () => {
  const { selectedCategory, selectedLevel } = useQuizState();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    if (!selectedLevel) {
      navigate("/");
      return;
    }

    let fetchedQuestions = [];

    if (selectedCategory) {
      
      fetchedQuestions = questions[selectedCategory]?.[selectedLevel] || [];
    } else {
      
      Object.values(questions).forEach((category) => {
        if (category[selectedLevel]) {
          fetchedQuestions.push(...category[selectedLevel]);
        }
      });
      fetchedQuestions = fetchedQuestions.sort(() => Math.random() - 0.5); 
    }

    setQuizQuestions(fetchedQuestions);
  }, [selectedCategory, selectedLevel, navigate]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", {
        state: {
          score,
          total: quizQuestions.length,
        },
      });
    }
  };

  if (!quizQuestions.length) {
    return (
      <div className="h-screen flex justify-center items-center font-serif text-gray-700">
        <p>No questions available for this selection.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow-lg p-6 font-serif">
        <QuestionCard
          questionData={quizQuestions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
