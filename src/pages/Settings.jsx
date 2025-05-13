import React, { useState } from "react";
import MainLayout from "../Components/MainLayout";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(true);

  const handleClearCache = () => {
    alert("Cache cleared successfully!");
  };

  return (
    <MainLayout>
      <div className="w-[390px] bg-white rounded-2xl shadow-lg p-6 space-y-6 font-serif mx-auto">
        <h1 className="text-2xl font-bold text-[#1D4C79] text-center">⚙️ Settings</h1>

        <SettingToggle
          label="🔔 Notifications"
          enabled={notificationsEnabled}
          setEnabled={setNotificationsEnabled}
        />

        <SettingToggle
          label="🌙 Dark Mode"
          enabled={darkMode}
          setEnabled={setDarkMode}
        />

        <SettingToggle
          label="📶 Use Wi-Fi Only"
          enabled={wifiOnly}
          setEnabled={setWifiOnly}
        />

        <SettingLink label="🔒 Privacy Settings" href="#" />

        <div className="flex justify-between items-center border-b pb-4">
          <span className="text-lg">🗑️ Clear Cache</span>
          <button
            onClick={handleClearCache}
            className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition"
          >
            Clear
          </button>
        </div>

        <SettingLink label="📩 Contact Support" href="#" />
        <SettingLink label="📜 Terms & Policies" href="#" />

        <div className="text-center pt-10 text-sm text-gray-600 space-y-1">
          <p>📱 Quizette App</p>
          <p>Version 1.0.0</p>
          <p>© 2025 All rights reserved.</p>
        </div>
      </div>
    </MainLayout>
  );
};

// Toggle Setting Component
const SettingToggle = ({ label, enabled, setEnabled }) => (
  <div className="flex justify-between items-center border-b pb-4">
    <span className="text-lg">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
      <span className="ml-2 text-sm text-gray-600">{enabled ? "On" : "Off"}</span>
    </label>
  </div>
);

// Link Setting Component
const SettingLink = ({ label, href }) => (
  <a
    href={href}
    className="flex justify-between items-center border-b pb-4 text-lg text-black hover:text-blue-600 transition"
  >
    {label}
    <span className="text-sm text-gray-400">›</span>
  </a>
);

export default Settings;
