import { useState } from "react";

import { FaBars } from "react-icons/fa";
import StudentSidebar from "./StudentSidbar";
import StudentProfile from "./StudentProfil";
import StudentFavorites from "./StudentFav";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-white shadow-sm flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Student Dashboard</h1>
      </div>

      <div className="flex">
        <StudentSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 overflow-x-hidden md:ml-64">
          {activeTab === "profile" && <StudentProfile />}
          {activeTab === "favorites" && <StudentFavorites />}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
