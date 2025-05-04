import React, { useEffect, useState } from "react";
import { db, auth } from "../context/firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

import containerIcon from "../assets/database.png";
import programmingIcon from "../assets/algorithms.png";
import devopsIcon from "../assets/cybersecurity.png";
import linuxIcon from "../assets/database.png";
import jsIcon from "../assets/ai.png";

const categoryMeta = {
  "Containers & Deployment": { icon: containerIcon, color: "#A0C4FF" },
  "General Programming": { icon: programmingIcon, color: "#E68ABB" },
  "DevOps & Security": { icon: devopsIcon, color: "#70A1D7" },
  "Linux Essentials": { icon: linuxIcon, color: "#F9AFAF" },
  "JavaScript Frameworks": { icon: jsIcon, color: "#C085A9" },
};

const RecentActivities = () => {
  const [grouped, setGrouped] = useState({});
  const [expandedStats, setExpandedStats] = useState({});
  const [showAll, setShowAll] = useState({});

  useEffect(() => {
    const fetchUserActivities = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "quizResults"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map((doc) => doc.data());

      const groupedByCategory = {};
      for (const e of entries) {
        const key = e.category;
        if (!groupedByCategory[key]) groupedByCategory[key] = [];
        groupedByCategory[key].push(e);
      }

      setGrouped(groupedByCategory);
    };

    fetchUserActivities();
  }, []);

  const toggleStats = (cat) =>
    setExpandedStats((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const toggleAll = (cat) =>
    setShowAll((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className="mt-6 pb-8">
      <h2 className="text-xl font-semibold text-black mb-3">Recent Activity</h2>

      {Object.entries(grouped).map(([category, attempts]) => {
        const latest = attempts[0];
        const icon = categoryMeta[category]?.icon;
        const color = categoryMeta[category]?.color || "#DDD";

        const totalAttempts = attempts.length;
        const totalScore = attempts.reduce((acc, a) => acc + a.score, 0);
        const totalQuestions = attempts.reduce((acc, a) => acc + a.total, 0);
        const average = (totalScore / totalAttempts).toFixed(1);
        const percentage = (latest.score / latest.total) * 100;

        return (
          <div
            key={category}
            className="bg-[#C7D7E3] rounded-xl px-4 py-3 mb-4 shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {icon && (
                  <img
                    src={icon}
                    alt={category}
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{category}</p>
                  <p className="text-[13px] text-gray-700">
                    {latest.total} Questions • Latest: {latest.score}/{latest.total}
                  </p>
                </div>
              </div>

              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-[12px]"
                style={{ backgroundColor: `${color}33` }}
              >
                {latest.score}/{latest.total}
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-[3px]"
                  style={{
                    borderColor: color,
                    borderTopColor: "transparent",
                    transform: `rotate(${(percentage / 10) * 36}deg)`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => toggleStats(category)}
                className="bg-[#D9E8F6] hover:bg-[#c4d9ee] text-[13px] font-medium text-gray-800 px-4 py-1 rounded-full shadow-sm transition"
              >
                {expandedStats[category] ? "Hide Stats" : "View Stats"}
              </button>

              <button
                onClick={() => toggleAll(category)}
                className="bg-[#D9E8F6] hover:bg-[#c4d9ee] text-[13px] font-medium text-gray-800 px-4 py-1 rounded-full shadow-sm transition"
              >
                {showAll[category] ? "Hide Attempts" : "View All"}
              </button>
            </div>

            {expandedStats[category] && (
              <div className="mt-2 ml-1 text-[13px] text-gray-800">
                <p>Attempts: {totalAttempts}</p>
                <p>Avg Score: {average}/10</p>
                <p>Total: {totalScore}/{totalQuestions}</p>
              </div>
            )}

            {showAll[category] && (
              <div className="mt-2 ml-1 text-[13px] text-gray-700">
                {attempts.map((a, i) => (
                  <div key={i} className="mb-1 flex justify-between text-sm">
                    <span>{new Date(a.timestamp?.seconds * 1000).toLocaleString()}</span>
                    <span>
                      {a.score}/{a.total}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivities;
