import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaTrash,
  FaUniversity,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminUsers = ({ type }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = type === "owners" ? "/api/Owner/" : "/api/Student/";

        // إضافة التوكن إلى الهيدر
        const token = localStorage.getItem("token");
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const handleDelete = async (userId) => {
    try {
      const endpoint =
        type === "owners" ? `/api/Owner/${userId}` : `/api/Student/${userId}`;

      const token = localStorage.getItem("token");
      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(
        users.filter((user) =>
          type === "owners"
            ? user.id !== userId
            : user.id !== userId
        )
      );
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    }
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  if (loading) return <div className="p-4">Loading...</div>;
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">
        {type === "owners" ? "Property Owners" : "Students"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <Skeleton height={20} count={4} />
                </div>
              ))
          : users.map((user) => {
              const isOwner = type === "owners";
              const userData = {
                id: isOwner ? user.id : user.id,
                name: isOwner
                  ? `${user.normalizedUserName}`
                  : `${user.normalizedUserName}`,
                email: isOwner ? user.normalizedEmail : user.normalizedEmail,
                phone: isOwner ? user.phoneNumber : user.phoneNumber,
              };

              return (
                <div
                  key={userData.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FaUser className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[20px]">
                        {userData.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {isOwner ? "Owner" : "Student"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="truncate">{userData.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-gray-400" />
                      <span>{userData.phone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(userData.id)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default AdminUsers;
