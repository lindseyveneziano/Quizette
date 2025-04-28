import React, { useState } from "react";
import MainLayout from "../Components/MainLayout";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alli Los",
    username: "@alli.codes",
    bio: "Future millionaire frontend & swe baddie 😌",
    email: "123@gmail.com",
    location: "New York, NY",
    preferredLanguage: "English",
    profileImage: "src/assets/profile.jpg",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <MainLayout>
      <div className="w-[390px] h-[812px] bg-white rounded-2xl shadow-lg p-6 font-serif flex flex-col items-center space-y-5 pb-20 overflow-y-auto">
        <h1 className="text-2xl font-bold text-[#1D4C79] text-center">👤 Profile</h1>

        {/* Profile Image */}
        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#E6EEF5]"
        />

        {/* Change profile picture */}
        {isEditing && (
          <input
            type="text"
            value={editedProfile.profileImage}
            onChange={(e) => handleChange("profileImage", e.target.value)}
            placeholder="Image URL"
            className="border rounded-lg p-2 w-full text-sm"
          />
        )}

        {/* Info Section */}
        <div className="w-full space-y-4 text-center">
          {/* Name */}
          <ProfileField
            label="Name"
            value={profile.name}
            editValue={editedProfile.name}
            isEditing={isEditing}
            onChange={(val) => handleChange("name", val)}
          />

          {/* Username (not editable) */}
          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-lg font-medium">{profile.username}</p>
          </div>

          {/* Bio */}
          <ProfileField
            label="Bio"
            value={profile.bio}
            editValue={editedProfile.bio}
            isEditing={isEditing}
            onChange={(val) => handleChange("bio", val)}
          />

          {/* Email */}
          <ProfileField
            label="Email"
            value={profile.email}
            editValue={editedProfile.email}
            isEditing={isEditing}
            onChange={(val) => handleChange("email", val)}
          />

          {/* Location */}
          <ProfileField
            label="Location"
            value={profile.location}
            editValue={editedProfile.location}
            isEditing={isEditing}
            onChange={(val) => handleChange("location", val)}
          />

          {/* Preferred Language */}
          <ProfileField
            label="Preferred Language"
            value={profile.preferredLanguage}
            editValue={editedProfile.preferredLanguage}
            isEditing={isEditing}
            onChange={(val) => handleChange("preferredLanguage", val)}
          />
        </div>

        {/* Buttons */}
        {isEditing ? (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="bg-[#1D4C79] text-white px-4 py-2 rounded-full text-sm shadow hover:bg-[#163a5c] transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-[#1D4C79] text-white px-4 py-2 rounded-full text-sm shadow hover:bg-[#163a5c] transition"
          >
            Edit Profile
          </button>
        )}

        {/* Footer Info */}
        <div className="pt-10 text-sm text-gray-500 text-center">
          <p>📅 User since 2024</p>
          <p>🧠 120 quizzes taken</p>
          <p>🏆 Top Category: Algorithms</p>
        </div>
      </div>
    </MainLayout>
  );
};

const ProfileField = ({ label, value, editValue, isEditing, onChange }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    {isEditing ? (
      <input
        type="text"
        value={editValue}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2 w-full text-sm"
      />
    ) : (
      <p className="text-base font-medium">{value}</p>
    )}
  </div>
);

export default Profile;
