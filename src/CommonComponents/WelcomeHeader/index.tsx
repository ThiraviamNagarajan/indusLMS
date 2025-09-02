import React, { useState } from "react";
import calendar from "../../assets/Images/icons8-calendar-96.png";
import star from "../../assets/Images/icons8-star-100.png";

const WelcomeHeader = ({ name, grade }: any) => {
  const [academicYear, setAcademicYear] = useState("2025-2026");

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-2xl flex flex-col gap-2">
      {/* Row 1: Welcome + Academic Year */}
      <div className="flex  items-center gap-2">
        <h2 className="text-lg font-bold text-gray-800">
          Welcome back {name}!
        </h2>

       
      </div>

      {/* Row 2: Grade */}
      <div className="flex gap-3 items-center">
      <div className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full shadow flex  gap-2 items-center w-fit h-fit">
        <img src={star} alt="star" className="w-3 h-3" />
        <span className="text-xs font-bold">{grade}</span>
      </div>
       <div className="bg-purple-50 p-2 rounded-lg flex items-center gap-2">
          {/* Calendar Icon */}
          <img src={calendar} alt="calendar" className="w-6 h-6" />

          {/* Text stack: Academic Period + Year */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-purple-700">
              Academic Period
            </span>
            <span className="text-xs font-semibold text-purple-900">
              {academicYear}
            </span>
          </div>
        </div>
        </div>
    </div>
  );
};

export default WelcomeHeader;
