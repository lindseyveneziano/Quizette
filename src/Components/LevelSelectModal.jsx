import React from "react";

const LevelSelectModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50">
      <div
        className="w-[320px] p-6 rounded-2xl shadow-xl text-center relative border border-blue-200"
        style={{
          background: "linear-gradient(to bottom right, #d0e8ff, #c1dfff, #b1d6ff)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl font-bold hover:text-black"
        >
          ×
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          Ready to challenge yourself?
        </h2>
        <p className="text-sm text-gray-700 mb-5">
          Choose your level to begin…
        </p>
        <div className="space-y-3">
          <button
            onClick={() => onSelect("beginner")}
            className="w-full py-3 px-4 rounded-xl text-white font-bold shadow transition hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #6ee7b7, #3b82f6)",
            }}
          >
            Beginner
            <p className="text-xs font-medium text-white opacity-90">
              Fundamental concepts
            </p>
          </button>

          <button
            onClick={() => onSelect("intermediate")}
            className="w-full py-3 px-4 rounded-xl text-white font-bold shadow transition hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #60a5fa, #6366f1)",
            }}
          >
            Intermediate
            <p className="text-xs font-medium text-white opacity-90">
              Moderate difficulty with applied knowledge
            </p>
          </button>

          <button
            onClick={() => onSelect("advanced")}
            className="w-full py-3 px-4 rounded-xl text-white font-bold shadow transition hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #1e40af)",
            }}
          >
            Advanced
            <p className="text-xs font-medium text-white opacity-90">
              Challenging questions to test deep understanding
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelectModal;
