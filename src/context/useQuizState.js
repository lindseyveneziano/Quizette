import { useContext } from "react";
import QuizStateContext from "./QuizStateContext";

const useQuizState = () => {
  const context = useContext(QuizStateContext);

  if (!context) {
    throw new Error("useQuizState must be used within a QuizProvider");
  }

  return context;
};

export default useQuizState;
