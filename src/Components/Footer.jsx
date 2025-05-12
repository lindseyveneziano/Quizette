import React from "react";
import { Home, Search, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-white py-4 px-8 flex justify-between items-center rounded-t-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200">
      {[
        { icon: <Home className="w-6 h-6" />, label: "Home", route: "/home" },
        { icon: <Search className="w-6 h-6" />, label: "Search", route: "/search" },
        { icon: <Settings className="w-6 h-6" />, label: "Settings", route: "/settings" },
        { icon: <User className="w-6 h-6" />, label: "Profile", route: "/profile" },
      ].map((item, idx) => (
        <button
          key={idx}
          onClick={() => navigate(item.route)}
          className="flex flex-col items-center text-gray-700 hover:text-black transition duration-200"
        >
          {item.icon}
          <span className="text-[11px] mt-1 font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Footer;
