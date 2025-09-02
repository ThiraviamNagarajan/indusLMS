import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import SubjectSummary from "./Modules/SubjectSummary/SubjectSummary";
import "./App.css";
import Login from "./Modules/LoginPage";
import Navbar from "./Modules/NavBar";
import Sidebar from "./Modules/Sidebar";
import ProfileSideBar from "./Modules/ProfileSidebar";

import StudentLearningPathWay from "./Modules/StudentsLearningPathway/StudentDashboard";
import { Assignments } from "./Modules/Assignments";
import { ProgressReport } from "./Modules/ProgressReport";
import { TimeTable } from "./Modules/TimeTable";
import { LearnerProfile } from "./Modules/LearnerProfile";
import { Messaging } from "./Modules/Messaging";
import { Notification } from "./Modules/Notification";
import { SchoolPolicies } from "./Modules/SchoolPolicies";
import { Dashboard } from "./Modules/Dashboard";
import { useState } from "react";

function AppContent() {
  const location = useLocation();

  // Login page should not show layout
  const isLoginPage = location.pathname === "/";

  // Centralized sidebar states
  const [isLeftExpanded, setIsLeftExpanded] = useState(false);   // Sidebar
  const [isRightExpanded, setIsRightExpanded] = useState(false); // ProfileSideBar

  // Toggle handlers ensuring only one can be open
  const toggleLeftSidebar = () => {
    setIsLeftExpanded((prev) => {
      if (!prev) setIsRightExpanded(false); // close right if opening left
      return !prev;
    });
  };

  const toggleRightSidebar = () => {
    setIsRightExpanded((prev) => {
      if (!prev) setIsLeftExpanded(false); // close left if opening right
      return !prev;
    });
  };

  if (isLoginPage) {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar isExpanded={isLeftExpanded} onToggle={toggleLeftSidebar} />

      {/* Center column */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Top Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Routes>
            <Route path="/StudentLearningPathway" element={<StudentLearningPathWay />} />
            <Route path="/subject-summary/:subject" element={<SubjectSummary />} />
            <Route path="/Assignments" element={<Assignments />} />
            <Route path="/ProgressReport" element={<ProgressReport />} />
            <Route path="/TimeTable" element={<TimeTable />} />
            <Route path="/LearnerProfile" element={<LearnerProfile />} />
            <Route path="/Messaging" element={<Messaging />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/SchoolPolicies" element={<SchoolPolicies />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>

      {/* Right Sidebar */}
      <ProfileSideBar isCollapsed={!isRightExpanded} onToggle={toggleRightSidebar} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;

