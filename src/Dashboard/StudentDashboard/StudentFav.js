import { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { MdOutlineStairs } from "react-icons/md";
import { Link } from "react-router-dom";

const StudentFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // استرداد البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // دالة لإزالة شقة من المفضلة
  const removeFavorite = (apartmentId) => {
    const updatedFavorites = favorites.filter(
      (apartment) => apartment.apartment_Id !== apartmentId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Favorite Apartments</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite apartments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((apartment) => (
            <Link
              key={apartment.apartment_Id}
              to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
              className="last-added-card  p-2 text-black m-4 rounded-lg shadow-md  text-left flex flex-col max-xl:w-1/4 max-md:w-full"
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
                  <span className="text-[11px] ">{apartment.num_Bed} Beds</span>
                </div>
                <div className="flex flex-row">
                  <MdOutlineStairs className="my-auto mr-1" />
                  <span className="text-[11px] ">
                    Floor {apartment.floorNum}
                  </span>
                </div>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  removeFavorite(apartment.apartment_Id);
                }}
              >
                Remove
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentFavorites;
