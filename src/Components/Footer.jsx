import React from "react";
import { Home, Menu, Moon, User } from "lucide-react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[390px] bg-[#F1F1F1] py-3 px-8 flex justify-between items-center rounded-t-2xl shadow-inner z-50">
      <button className="flex flex-col items-center text-black">
        <Home className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center text-black">
        <Menu className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center text-black">
        <Moon className="w-6 h-6" />
      </button>
      <button className="flex flex-col items-center text-black">
        <User className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Footer;
