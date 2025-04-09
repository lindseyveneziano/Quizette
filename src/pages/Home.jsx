import React from "react";
import Dashboard from "../Components/Dashboard";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex justify-center items-center">
      <div
        className="bg-white w-[430px] h-[812px] overflow-y-scroll rounded-2xl shadow-lg"
        style={{ scrollbarGutter: "stable" }}
      >
      
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
