import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizState from "../context/useQuizState";
import HeroBanner from "./HeroBanner";
import SearchBar from "./SearchBar";
import CategoriesSection from "./CategoriesSection";
import RecentActivities from "./RecentActivities";
import Footer from "../components/Footer";
import LevelSelectModal from "./LevelSelectModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedLevel, setSelectedCategory } = useQuizState();
  const navigate = useNavigate();

  const handleLevelSelect = (level) => {
    setSelectedCategory(null); 
    setSelectedLevel(level);
    setIsModalOpen(false);
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#E6EEF5]">
      <div className="w-[390px] h-[812px] overflow-y-scroll bg-white rounded-2xl shadow p-3 flex flex-col gap-3 relative pb-4">
        <style>
          {`
            ::-webkit-scrollbar {
              width: 6px;
            }
            ::-webkit-scrollbar-thumb {
              background-color: #bbb;
              border-radius: 9999px;
            }
          `}
        </style>

        <HeroBanner onPlayClick={() => setIsModalOpen(true)} />
        <SearchBar />
        <div className="category-scroll px-1">
          <CategoriesSection />
        </div>
        <div className="mt-[-10px]">
          <RecentActivities />
        </div>
        <div className="pb-10" />
        <Footer />
      </div>

      <LevelSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleLevelSelect}
      />
    </div>
  );
};

export default Dashboard;
