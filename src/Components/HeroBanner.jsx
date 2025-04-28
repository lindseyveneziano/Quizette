import React from "react";
import trophyImage from "../assets/trophy.jpg";
import profileImage from "../assets/profile.jpg";
import diamondIcon from "../assets/diamond.png";

const HeroBanner = ({
  onPlayClick,
  name = "User Name",
  id = "ID-0000",
  points = 0,
}) => {
  return (
    <div className="bg-white rounded-[2rem] px-6 py-4 w-full max-w-[430px] mx-auto shadow">
      {/* Profile Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-black">{name}</h2>
            <p className="text-sm text-gray-500">{id}</p>
          </div>
        </div>
        <div className="flex items-center bg-[#C7D7E3] rounded-lg px-2 py-1">
          <img src={diamondIcon} alt="Diamond" className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">{points}</span>
        </div>
      </div>

      {/* Banner Image + Button */}
      <div
        className="rounded-xl bg-cover bg-center mt-4 px-6 py-4 text-white relative h-[140px] flex flex-col justify-between items-end"
        style={{ backgroundImage: `url(${trophyImage})` }}
      >
        <div className="text-right w-full">
          <h1 className="text-[13px] font-semibold leading-tight">
            Test Your Knowledge with
            <br />
            <span className="text-[33px] font-bold block">Quizette</span>
          </h1>
        </div>

        <button
          onClick={onPlayClick}
          className="bg-white text-black text-[17px] font-bold py-2 px-6 rounded-full shadow mt-2"
        >
          Play Now!
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
