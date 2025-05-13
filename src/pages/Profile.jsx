import React, { useState, useEffect } from "react";
import MainLayout from "../Components/MainLayout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../context/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultProfile = {
    name: "",
    bio: "New here!",
    email: "",
    location: "Earth",
    preferredLanguage: "English",
    profileImage: "src/assets/profile.jpg",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editedProfile, setEditedProfile] = useState(defaultProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setEditedProfile(data);
        } else {
          const newProfile = {
            ...defaultProfile,
            email: currentUser.email,
            name: currentUser.email.split("@")[0],
            uid: currentUser.uid,
          };
          await setDoc(userDoc, newProfile);
          setProfile(newProfile);
          setEditedProfile(newProfile);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, { ...editedProfile, uid: user.uid }, { merge: true });
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

  if (loading) return <MainLayout><p className="text-center">Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <div className="w-full max-w-md min-h-screen bg-white rounded-2xl shadow-lg p-6 font-serif flex flex-col items-center space-y-5 pb-32 overflow-y-auto mx-auto">
        <h1 className="text-2xl font-bold text-[#1D4C79] text-center">👤 Profile</h1>

        <img
          src={profile.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#E6EEF5]"
        />

        {isEditing && (
          <input
            type="text"
            value={editedProfile.profileImage}
            onChange={(e) => handleChange("profileImage", e.target.value)}
            placeholder="Image URL"
            className="border rounded-lg p-2 w-full text-sm"
          />
        )}

        <div className="w-full space-y-4 text-center">
          <ProfileField
            label="Name"
            value={profile.name}
            editValue={editedProfile.name}
            isEditing={isEditing}
            onChange={(val) => handleChange("name", val)}
          />
          <ProfileField
            label="Bio"
            value={profile.bio}
            editValue={editedProfile.bio}
            isEditing={isEditing}
            onChange={(val) => handleChange("bio", val)}
          />
          <ProfileField
            label="Email"
            value={profile.email}
            editValue={editedProfile.email}
            isEditing={isEditing}
            onChange={(val) => handleChange("email", val)}
          />
          <ProfileField
            label="Location"
            value={profile.location}
            editValue={editedProfile.location}
            isEditing={isEditing}
            onChange={(val) => handleChange("location", val)}
          />
          <ProfileField
            label="Preferred Language"
            value={profile.preferredLanguage}
            editValue={editedProfile.preferredLanguage}
            isEditing={isEditing}
            onChange={(val) => handleChange("preferredLanguage", val)}
          />
        </div>

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
