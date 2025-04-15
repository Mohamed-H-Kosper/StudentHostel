import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaTrash,
  FaEdit,
  FaMoneyBillWave,
  FaBed,
} from "react-icons/fa";
import { MdOutlineStairs } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const AdminApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/Apartment/GetAll");
        setApartments(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (apartmentId, event) => {
    if (event) {
      event.preventDefault();
    }
    if (!window.confirm("Delete this apartment?")) return;

    try {
      await axios.delete(`/api/Apartment/${apartmentId}`);
      setApartments(apartments.filter((a) => a.apartment_Id !== apartmentId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">All Apartments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => (
                <Skeleton key={i} height={150} className="rounded-xl" />
              ))
          : apartments.map((apartment) => (
              <Link
                key={apartment.apartment_Id}
                to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
                className="last-added-card p-2 text-black m-4 rounded-lg shadow-md  text-left flex flex-col max-xl:w-1/4 max-md:w-full"
              >
                <img
                  loading="lazy"
                  alt={apartment.title}
                  src={`data:image/jpeg;base64,${apartment.apartment_Image}`}
                  className="w-full h-48 object-cover rounded-md"
                />
                <span className="text-[24px] font-semibold">
                  ${apartment.price}
                </span>
                <span className="text-[18px] font-semibold">
                  {apartment.title}
                </span>
                <span className="text-[12px] text-gray-500">
                  {apartment.address}
                </span>
                <span className="text-[10px] text-gray-500">
                  {new Date(apartment.publisheddate).toLocaleDateString()}
                </span>
                <div className="w-full flex flex-row mt-3">
                  <div className="flex flex-row mr-5">
                    <FaBed className="my-auto mr-1" />
                    <span className="text-[11px] ">
                      {apartment.num_Bed} Beds
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <MdOutlineStairs className="my-auto mr-1" />
                    <span className="text-[11px] ">
                      Floor {apartment.floorNum}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={(e) => handleDelete(apartment.apartment_Id, e)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default AdminApartments;
