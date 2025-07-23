import {
  FaTimes,
  FaHome,
  FaUsers,
  FaGraduationCap,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  return (
    <div
      className={`fixed md:sticky z-20 w-64 h-[80vh] bg-dark text-white transition-transform duration-300
        top-0 left-0 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        <button
          onClick={() => {
            setActiveTab("owners");
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
            ${activeTab === "owners" ? "bg-primary" : "hover:bg-gray-700"}`}
        >
          <FaUsers className="w-5 h-5" />
          <span>Owners</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("students");
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
            ${activeTab === "students" ? "bg-primary" : "hover:bg-gray-700"}`}
        >
          <FaGraduationCap className="w-5 h-5" />
          <span>Students</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("apartments");
            setIsMobileOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors
            ${activeTab === "apartments" ? "bg-primary" : "hover:bg-gray-700"}`}
        >
          <FaHome className="w-5 h-5" />
          <span>Apartments</span>
        </button>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 bg-dark">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
export default AdminSidebar;
