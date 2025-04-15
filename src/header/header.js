import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/logoNavbar 1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import "./header.css";
import { useAuth } from "../AuthCheck";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, userRole, isOwner, isAdmin } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => setIsOpen(false);

  return (
    <header className="w-full py-2 px-6 bg-white shadow-md sticky z-10">
      <nav className="w-full flex justify-between items-center">
        {/* الشعار */}
        <Link to="/">
          <img loading="lazy" alt="Logo" className="Logo-image" src={logo} />
        </Link>

        {/* الروابط للشاشات الكبيرة */}
        <div className="hidden md:flex items-center">
          <NavLink to="/" className="font-medium mr-4 links">
            Home
          </NavLink>
          <NavLink to="/shop" className="font-medium mr-4 links">
            Shop
          </NavLink>
          {isOwner && !isAdmin ? (
            <NavLink to="/advirtise" className="font-medium mr-4 links">
              Add Apartment
            </NavLink>
          ) : isAdmin ? (
            <>
              <NavLink to="/AdminDashboard" className="font-medium mr-4 links">
                Dashboard
              </NavLink>
            </>
          ) : (
            <></>
          )}
          <NavLink to="/about-us" className="font-medium mr-4 links">
            About Us
          </NavLink>
          <NavLink to="/contact" className="font-medium mr-4 links">
            Contact Us
          </NavLink>
        </div>

        {/* جزء تسجيل الدخول أو إظهار اسم المستخدم */}
        <div className="bg-blue-600 pr-5 py-4 pl-[150px] btn-sign max-md:hidden max-xl:pl-16">
          {isAuthenticated ? (
            <div className="profile flex items-center space-x-4">
              <span className="name-profile text-white font-semibold">
                Welcome, {user || "User"}
              </span>
              <Link
                to={isOwner ? "/OwnerDashboard" : "/StudentDashboard"}
                className="btn-profile bg-blue-400 text-white px-3 py-1 rounded-full hover:bg-blue-500 transition-all"
              >
                Profile
              </Link>
            </div>
          ) : (
            <NavLink
              to="/signUp"
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-blue-700 button-sign"
            >
              Sign Up
            </NavLink>
          )}
        </div>

        {/* زر القائمة الجانبية للشاشات الصغيرة */}
        <button className="block md:hidden text-2xl" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* القائمة الجانبية للشاشات الصغيرة */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <div className="p-6 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-500">
              Student Hostel
            </h2>
            <button className="text-2xl text-gray-600" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          </div>

          {/* الروابط */}
          <NavLink
            to="/"
            className="font-medium edit-links"
            onClick={closeSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="font-medium edit-links"
            onClick={closeSidebar}
          >
            Shop
          </NavLink>
          {isOwner && !isAdmin ? (
            <NavLink to="/advirtise" className="font-medium mr-4 links links-add">
              Add Apartment
            </NavLink>
          ) : isAdmin ? (
            <>
              <NavLink to="/AdminDashboard" className="font-medium mr-4 links">
                Dashboard
              </NavLink>
            </>
          ) : (
            <></>
          )}
          <NavLink
            to="/about-us"
            className="font-medium edit-links"
            onClick={closeSidebar}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className="font-medium edit-links"
            onClick={closeSidebar}
          >
            Contact Us
          </NavLink>

          {/* إظهار حالة تسجيل الدخول في القائمة الجانبية */}
          {isAuthenticated ? (
            <div className="text-center">
              <span className="name-profile text-blue-600 font-semibold block mb-2">
                Welcome, {user}
              </span>
              <Link
                to={
                  userRole === "student"
                    ? "/StudentDashboard"
                    : "/OwnerDashboard"
                }
                className=" btn-profile bg-blue-400 text-white px-3 py-1 rounded-full hover:bg-blue-500 transition-all "
                onClick={closeSidebar}
              >
                Profile
              </Link>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="font-medium edit-links"
              onClick={closeSidebar}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
