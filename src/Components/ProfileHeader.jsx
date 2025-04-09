import React from "react";
import profileImage from "../assets/profile.jpg";
import diamondIcon from "../assets/diamond.png";

const ProfileHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 pt-4 w-full">
      <div className="flex items-center gap-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-black">Miyalin Allibel</h2>
          <p className="text-sm text-gray-500">ID-1509</p>
        </div>
      </div>
      <div className="bg-[#C7D7E3] px-4 py-1.5 rounded-xl flex items-center gap-2">
        <img src={diamondIcon} alt="Diamond" className="w-6 h-6" />
        <span className="text-lg font-semibold text-black">180</span>
      </div>
    </div>
  );
};

export default ProfileHeader;
