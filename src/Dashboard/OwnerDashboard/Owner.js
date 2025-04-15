import { useState, useEffect } from "react"; 
import { FaBars } from "react-icons/fa";
import OwnerSidebar from "./OwnerSidbar";
import OwnerProfile from "./OwnerProfile";
import OwnerApartments from "./OwnerApartments";
import { useAuth } from "../../AuthCheck";
import { Navigate, useSearchParams } from "react-router-dom";

const OwnerDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isOwner, isAuthenticated } = useAuth();

  if (!isAuthenticated || !isOwner) {
    return <Navigate to="/" />;
  }

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
        <h1 className="text-xl font-bold">Owner Dashboard</h1>
      </div>

      <div className="flex">
        <OwnerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 overflow-x-hidden ">
          {activeTab === "profile" && <OwnerProfile />}
          {activeTab === "apartments" && <OwnerApartments />}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
