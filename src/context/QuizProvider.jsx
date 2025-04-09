import React, { useState } from "react";
import QuizStateContext from "./QuizStateContext";

export const QuizProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <QuizStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedLevel,
        setSelectedLevel,
        score,
        setScore,
      }}
    >
      {children}
    </QuizStateContext.Provider>
  );
};
