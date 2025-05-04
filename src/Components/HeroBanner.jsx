import React, { useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../context/firebase";

import trophyImage from "../assets/trophy.jpg";
import defaultProfile from "../assets/profile.jpg";
import diamondIcon from "../assets/diamond.png";

const HeroBanner = ({
  onPlayClick,
  name = "User Name",
  id = "ID-0000",
  points = 0,
  profileImage,
}) => {
  const fileInputRef = useRef();

  const handleProfileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const user = auth.currentUser;

    if (!file || !user) return;

    try {
      const storagePath = `profileImages/${user.uid}/${file.name}`;
      const imageRef = ref(storage, storagePath);
      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "users", user.uid), { profileImage: imageUrl });

      window.location.reload();
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] px-6 py-4 w-full max-w-[430px] mx-auto shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div onClick={handleProfileClick} className="cursor-pointer">
          {profileImage === undefined ? (
  <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
) : (
  <img
    src={profileImage || defaultProfile}
    alt="Profile"
    className="w-14 h-14 rounded-full object-cover"
  />
)}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
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
