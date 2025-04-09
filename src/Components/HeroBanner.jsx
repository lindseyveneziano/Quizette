import React from "react";
import trophyImage from "../assets/trophy.jpg";
import profileImage from "../assets/profile.jpg";
import diamondIcon from "../assets/diamond.png";

const HeroBanner = ({ onPlayClick }) => {
  return (
    <div
      className="bg-white rounded-[2rem] px-6 py-4 w-full max-w-[430px] mx-auto shadow font-serif"
      style={{ fontFamily: "'Times New Roman', serif" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">Miyalin Allibel</h2>
            <p className="text-sm text-gray-500">ID-1509</p>
          </div>
        </div>
        <div className="flex items-center bg-[#C7D7E3] rounded-lg px-2 py-1">
          <img src={diamondIcon} alt="Diamond" className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">180</span>
        </div>
      </div>
      <div
        className="rounded-xl bg-cover bg-center mt-4 px-6 py-4 text-white relative h-[140px] flex flex-col justify-between items-end"
        style={{ backgroundImage: `url(${trophyImage})` }}
      >
        <div className="text-right w-full">
          <h1 className="text-[18px] font-semibold leading-tight">
            Test Your Knowledge with
            <br />
            <span className="text-[22px] font-bold block">Quizette</span>
          </h1>
        </div>

        <button
          onClick={onPlayClick}
          className="bg-white text-black font-bold py-2 px-6 rounded-full shadow mt-2"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
