import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#E6EEF5] flex justify-center items-center">
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow-lg p-6 font-times text-center flex flex-col justify-center items-center space-y-4">
        <h1 className="text-2xl font-times font-bold text-[#1D4C79]">🏆 Quiz Completed!</h1>
        <p className="text-lg text-gray-600">Your Score:</p>
        <div className="text-4xl font-bold font-times text-blue-600">
          {score} / {total}
        </div>
        <p className="text-md text-gray-600 font-times">Great job completing the quiz!</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-[#1D4C79] text-white py-2 px-6 font-times rounded-full shadow hover:bg-blue-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Results;
