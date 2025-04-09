import React, { createContext, useState } from "react";

const QuizStateContext = createContext();

export const QuizProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <QuizStateContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedLevel,
        setSelectedLevel,
      }}
    >
      {children}
    </QuizStateContext.Provider>
  );
};

export default QuizStateContext;
