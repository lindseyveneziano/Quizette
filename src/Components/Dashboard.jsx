import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
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
    let unsubscribeUser = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        });
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, []);

  const handleLevelSelect = (level) => {
    setSelectedCategory("Containers & Deployment");
    setSelectedLevel(level);
    setIsModalOpen(false);
    navigate("/quiz");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#E6EEF5]">
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow flex flex-col overflow-hidden">
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

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          <HeroBanner
            name={userData?.name || "Loading"}
            id={userData?.username || "ID-000000"}
            points={userData?.points || 0}
            profileImage={userData?.profileImage}
            onPlayClick={() => setIsModalOpen(true)}
          />
          <SearchBar />
          <div className="category-scroll px-1">
            <CategoriesSection />
          </div>
          {userData && (
            <div className="mt-[-10px]">
              <RecentActivities />
            </div>
          )}
          <div className="pb-10" />
        </div>

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
