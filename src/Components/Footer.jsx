import React from "react";
import { Home, Search, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-[#F1F1F1] py-3 px-8 flex justify-between items-center rounded-t-2xl shadow-inner z-50">
      <button onClick={() => navigate("/home")} className="flex flex-col items-center text-black">
        <Home className="w-6 h-6" />
      </button>
      <button onClick={() => navigate("/search")} className="flex flex-col items-center text-black">
        <Search className="w-6 h-6" />
      </button>
      <button onClick={() => navigate("/settings")} className="flex flex-col items-center text-black">
        <Settings className="w-6 h-6" />
      </button>
      <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-black">
        <User className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Footer;
