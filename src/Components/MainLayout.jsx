import React from "react";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex justify-center items-center">
      <div className="bg-white w-[390px] h-[812px] overflow-y-scroll rounded-2xl shadow-lg relative">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
