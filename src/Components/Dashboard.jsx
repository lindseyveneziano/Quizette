import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../context/firebase";

import useQuizState from "../context/useQuizState";
import HeroBanner from "./HeroBanner";
import SearchBar from "./SearchBar";
import CategoriesSection from "./CategoriesSection";
import RecentActivities from "./RecentActivities";
import Footer from "./Footer";
import LevelSelectModal from "./LevelSelectModal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { setSelectedLevel, setSelectedCategory } = useQuizState();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

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

        <HeroBanner
          name={userData?.name || "Loading"}
          id={userData?.username || "ID-000000"}
          points={180}
          onPlayClick={() => setIsModalOpen(true)}
        />

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
