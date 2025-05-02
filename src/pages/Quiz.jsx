import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import { fetchTechQuizQuestions } from "../api/fetchTechQuizQuestions";

const Quiz = () => {
  const { selectedLevel, selectedCategory } = useQuizState();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      console.log("Loading questions...");

      if (!selectedLevel) {
        console.log("No level selected, navigating to home.");
        navigate("/");
        return;
      }

      console.log(`Selected category: ${selectedCategory}, Selected level: ${selectedLevel}`);

      try {
        const data = await fetchTechQuizQuestions(selectedCategory, selectedLevel);
        console.log("Fetched data from API:", data);

        const formatted = data.map((q) => {
          const options = Object.entries(q.answers)
            .filter(([_, val]) => val)
            .map(([_, val]) => val);

          const correctKey = Object.entries(q.correct_answers).find(
            ([_, isCorrect]) => isCorrect === "true"
          )?.[0]?.replace("_correct", "");

          const correctAnswer = q.answers[correctKey];

          return {
            question: q.question,
            options,
            answer: correctAnswer,
          };
        });

        console.log("Formatted questions from API:", formatted);
        setQuizQuestions(formatted);
      } catch (err) {
        console.warn("QuizAPI failed. Using fallback questions.");
        setUsedFallback(true);

        let fallback = [];

        // Fallback logic for category-based questions
        if (selectedCategory) {
          fallback = questions[selectedCategory]?.[selectedLevel] || [];
          console.log(`Using fallback questions for category: ${selectedCategory}, level: ${selectedLevel}`);
        } else {
          Object.values(questions).forEach((category) => {
            if (category[selectedLevel]) {
              fallback.push(...category[selectedLevel]);
            }
          });
          fallback = fallback.sort(() => Math.random() - 0.5);
          console.log("Using fallback questions for all categories.");
        }

        const formattedFallback = fallback.map((q) => ({
          question: q.question,
          options: q.options,
          answer: q.answer,
        }));

        console.log("Formatted fallback questions:", formattedFallback);
        setQuizQuestions(formattedFallback);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [selectedLevel, selectedCategory, navigate]);

  const handleAnswer = (isCorrect) => {
    console.log(`Answer is ${isCorrect ? "correct" : "incorrect"}`);
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("Quiz finished. Navigating to results.");
      navigate("/results", {
        state: {
          score,
          total: quizQuestions.length,
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center font-serif text-gray-700">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!quizQuestions.length) {
    return (
      <div className="h-screen flex justify-center items-center font-serif text-gray-700">
        <p>No questions available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow-lg p-6 font-serif">
        {usedFallback && (
          <div className="text-yellow-600 text-sm text-center mb-4 font-medium">
            ⚠ Using fallback questions due to API issue.
          </div>
        )}

        <QuestionCard
          questionData={quizQuestions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={(answerText) =>
            handleAnswer(answerText === quizQuestions[currentQuestionIndex].answer)
          }
        />
      </div>
    </div>
  );
};

export default Quiz;
