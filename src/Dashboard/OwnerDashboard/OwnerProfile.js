import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "../../AuthCheck";
import { useNavigate } from "react-router-dom";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);

          setUserName(
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ]
          );
          setUserPhone(
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/homephone"
            ]
          );
          setUserEmail(
            decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ]
          );
          setUserType(
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          );
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* هنا عرض كل الداتا الخاصه بالمالك  مثل الاسم والعنوان ...*/}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 p-2 bg-gray-50 rounded-lg">
              {userName || "null"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 p-2 bg-gray-50 rounded-lg">
              {userEmail || "null"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <p className="mt-1 p-2 bg-gray-50 rounded-lg">
              {userPhone || "null"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <p className="mt-1 p-2 bg-gray-50 rounded-lg">
              {userType || "null"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
