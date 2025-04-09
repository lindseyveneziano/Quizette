
import React from "react";
import dataIcon from "../assets/data.jpg";
import algoIcon from "../assets/algorithms.png";
import cyberIcon from "../assets/cybersecurity.png";
import dbIcon from "../assets/database.png";
import aiIcon from "../assets/ai.png";


const activities = [
  {
    icon: dataIcon,
    title: "Data Structures",
    questions: 10,
    score: 6,
    color: "#F9AFAF",
  },
  {
    icon: algoIcon,
    title: "Algorithms",
    questions: 10,
    score: 10,
    color: "#E68ABB",
  },
  {
    icon: cyberIcon,
    title: "Cybersecurity",
    questions: 10,
    score: 8,
    color: "#70A1D7",
  },
  {
    icon: dbIcon,
    title: "Database",
    questions: 10,
    score: 5,
    color: "#78D6C6",
  },
  {
    icon: aiIcon,
    title: "Artificial Intelligence",
    questions: 10,
    score: 7,
    color: "#C085A9",
  },
];


const RecentActivities = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-normal text-black font-['Times_New_Roman'] mb-3">
        Recent Activity
      </h2>


      <div className="flex flex-col gap-3">
        {activities.map((activity, i) => {
          const percentage = (activity.score / activity.questions) * 100;


          return (
            <div
              key={i}
              className="bg-[#C7D7E3] rounded-xl flex items-center justify-between px-4 py-3"
            >
             
              <div className="flex items-center gap-4">
                <img
                  src={activity.icon}
                  alt={activity.title}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-sm font-semibold font-['Times_New_Roman']">
                    {activity.title}
                  </p>
                  <p className="text-[11px] text-gray-700 font-['Times_New_Roman']">
                    {activity.questions} Questions
                  </p>
                </div>
              </div>


              
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center font-semibold font-['Times_New_Roman'] text-[12px]"
                style={{
                  backgroundColor: `${activity.color}33`, 
                }}
              >
                {activity.score}/10
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-[3px]"
                  style={{
                    borderColor: activity.color,
                    borderTopColor: "transparent",
                    transform: `rotate(${(percentage / 10) * 36}deg)`,
                    transition: "transform 0.3s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default RecentActivities;
