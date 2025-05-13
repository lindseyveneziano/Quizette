import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";
import QuestionCard from "../components/QuestionCard";
import questions from "../data/questions";
import { fetchTechQuizQuestions } from "../api/fetchTechQuizQuestions";
import { db, auth } from "../context/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

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
      if (!selectedLevel) {
        navigate("/");
        return;
      }

      try {
        const data = await fetchTechQuizQuestions(selectedCategory, selectedLevel);
        setQuizQuestions(data);
      } catch (err) {
        setUsedFallback(true);
        let fallback = [];

        if (selectedCategory) {
          fallback = questions[selectedCategory]?.[selectedLevel] || [];
        } else {
          Object.values(questions).forEach((category) => {
            if (category[selectedLevel]) fallback.push(...category[selectedLevel]);
          });
          fallback = fallback.sort(() => Math.random() - 0.5);
        }

        const formattedFallback = fallback.map((q) => ({
          question: q.question,
          options: q.options.map((opt) => ({
            text: opt,
            isCorrect: opt === q.answer,
          })),
        }));

        setQuizQuestions(formattedFallback);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [selectedLevel, selectedCategory, navigate]);

const handleAnswer = async (isCorrect) => {
  if (isCorrect) setScore((prev) => prev + 1);

  const isLast = currentQuestionIndex === quizQuestions.length - 1;

  if (!isLast) {
    setCurrentQuestionIndex((prev) => prev + 1);
  } else {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        const userData = userSnap.exists() ? userSnap.data() : {};

        // Save quiz result
        await addDoc(collection(db, "quizResults"), {
          uid: user.uid,
          email: user.email,
          name: userData.name || "",
          username: userData.username || "",
          category: selectedCategory,
          level: selectedLevel,
          score,
          total: quizQuestions.length,
          timestamp: serverTimestamp(),
        });

        // Update points, quizzesTaken, and topCategory
        await updateDoc(userDocRef, {
          points: increment(score),
          quizzesTaken: increment(1),
          topCategory: selectedCategory || "None", // ✅ Set to last completed category
        });
      }
    } catch (err) {
      console.error("Error saving quiz result or updating stats:", err.message);
    }

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
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center px-2 py-4">
      <div className="w-[370px] max-h-[760px] bg-white rounded-2xl shadow-lg px-5 py-4 font-serif border-[3px] border-[#C7D7E3] overflow-y-auto">

        {usedFallback && (
          <div className="text-yellow-600 text-sm text-center mb-2 font-medium">
            ⚠ Using fallback questions due to API issue.
          </div>
        )}

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
