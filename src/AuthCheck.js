import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// إنشاء Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [StudentId, setStudentId] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // دالة لفك تشفير token وتحديث حالة المستخدم
  const fetchUserData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUser("");
      setStudentId("");
      setIsAdmin(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": userName,
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
          email,
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
          User_id,
      } = decoded;

      setUser(userName);
      setUserRole(role);
      setIsAuthenticated(true);

      if (role === "student" || role === "owner") {
        setStudentId(User_id);
      }

      if (email === "Admin@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
      setUserRole(null);
      setUser("");
      setStudentId("");
      setIsAdmin(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole(null);
    setUser("");
    setStudentId("");
    setIsAdmin(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token") {
        fetchUserData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue = {
    user,
    isAuthenticated,
    isOwner: userRole === "owner",
    isStudent: userRole === "student",
    fetchUserData,
    logout,
    StudentId,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
