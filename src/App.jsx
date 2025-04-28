import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginRegister from "./pages/LoginRegister";
import QuizLevels from "./pages/QuizLevels";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/home" element={<Home />} />
      <Route path="/levels" element={<QuizLevels />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

