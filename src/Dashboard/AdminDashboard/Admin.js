import { useState } from "react";

import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidbar";
import AdminUsers from "./AdminUsers";
import AdminApartments from "./AdminApartments";
import { useAuth } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("owners");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !isAdmin) {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden p-4 bg-white shadow-sm flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-gray-600 hover:text-gray-800"
        >
          <FaBars className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="flex">
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 overflow-x-hidden">
          {activeTab === "owners" && <AdminUsers type="owners" />}
          {activeTab === "students" && <AdminUsers type="students" />}
          {activeTab === "apartments" && <AdminApartments />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
