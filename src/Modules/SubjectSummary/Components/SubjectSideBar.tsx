import { useDispatch, useSelector } from "react-redux";
import { setSubject } from "../../../store/store"; // dispatch for selected subject
import type { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import expand from "../../../assets/Images/sidebar.png";
import collapse from "../../../assets/Images/sidebar (1).png";
import { useState } from "react";

interface SubjectSidebarProps {
  subjects: string[]; // list of subject names
  currentGrade: string;
}

const SubjectSidebar = ({ subjects, currentGrade }: SubjectSidebarProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  // ✅ Get scores from Redux (persisted via localStorage)
  const subjectScores = useSelector((state: RootState) => state.subject.subjects);

 return (
  <div
    className={`${
    isExpanded ? "w-80" : "w-24"
  } bg-white h-full rounded-r-xl p-4 space-y-3 transition-all duration-300 shadow-md`}
  >
    {/* Toggle Button */}
    <div className="flex justify-end">
      <img
        src={isExpanded ? collapse : expand}
        alt="toggle sidebar"
        className="w-6 h-6 cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      />
    </div>

    {/* Title */}
    {isExpanded && (
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        Subjects - {currentGrade}
      </h2>
    )}

    {/* Subject List */}
    {subjects.map((subject, index) => {
      const score = subjectScores[subject]?.currentScore ?? 0;

      return (
        <div
          key={index}
          className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 cursor-pointer p-1 rounded-lg transition"
          onClick={() => {
            dispatch(setSubject(subject));
            navigate(`/subject-summary/${subject}`);
          }}
        >
          {isExpanded && (
            <span className="text-gray-800 font-medium">{subject}</span>
          )}

          <span
            className={`text-blue-500 font-semibold ${
              !isExpanded ? "text-sm" : ""
            }`}
          >
            {score}%
          </span>
        </div>
      );
    })}
  </div>
);

};

export default SubjectSidebar;
