import { useState, useEffect } from "react";
import { FaBed, FaEdit, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineStairs } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { icon } from "@fortawesome/fontawesome-svg-core";

const OwnerApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [fetchingApartments, setFetchingApartments] = useState(true);
  const navigate = useNavigate();

  const getOwnerIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    }
    return null;
  };

  // جلب الشقق الخاصة بالمالك
  const fetchOwnerApartments = async () => {
    const ownerId = getOwnerIdFromToken();

    if (ownerId) {
      try {
        const response = await fetch(`/api/Apartment/GetAll`);

        if (response.ok) {
          const data = await response.json();

          const filteredApartments = data.filter(
            (apartment) => String(apartment.ownerId) === String(ownerId)
          );

          console.log("Filtered Apartments:", filteredApartments);
          setApartments(filteredApartments);
        } else {
          throw new Error("Failed to fetch apartments.");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error Fetching",
          text: "Error in fetch apartments",
        });
      } finally {
        setFetchingApartments(false);
      }
    }
  };

  useEffect(() => {
    fetchOwnerApartments();
  }, []);

  const handleDelete = async (id, event) => {
    if (event) {
      event.preventDefault();
    }

    if (window.confirm("Are you sure you want to delete this apartment?")) {
      try {
        const response = await fetch(`/api/Apartment/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          setApartments(apartments.filter((apt) => apt.id !== id));
        } else {
          throw new Error("Failed to delete apartment.");
        }
      } catch (error) {
        console.error("Error deleting apartment:", error);
      }
    }
  };

  const handleEdit = (apartment, event) => {
    if (event) {
      event.preventDefault();
    }

    if (!apartment.OwnerId) {
      apartment.OwnerId = getOwnerIdFromToken();
    }

    if (!apartment.Apartment_Image) {
      apartment.Apartment_Image = apartment.apartment_Image;
    }

    setSelectedApartment(apartment);
    setEditModalOpen(true);
  };

  // حفظ التعديلات
  const handleSave = async (updatedApartment) => {
    try {
      const requestBody = {
        Apartment_Id: updatedApartment.apartment_Id,
        Num_Bed: updatedApartment.num_Bed,
        Num_Room: updatedApartment.num_Room,
        FloorNum: updatedApartment.floorNum,
        Description: updatedApartment.description,
        Address: updatedApartment.address,
        Price: updatedApartment.price,
        Title: updatedApartment.title,
        OwnerId: updatedApartment.OwnerId,
        Apartment_Image: updatedApartment.Apartment_Image,
        isRented: updatedApartment.isRented,
      };

      const response = await fetch(
        `/api/Apartment/${updatedApartment.apartment_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const text = await response.text();
        console.log("Response Text:", text);

        if (text) {
          const updatedData = JSON.parse(text);

          setApartments((prevApartments) =>
            prevApartments.map((apt) =>
              apt.apartment_Id === updatedData.apartment_Id ? updatedData : apt
            )
          );
          setEditModalOpen(false);
        } else {
          await fetchOwnerApartments();
          setEditModalOpen(false);
        }
      } else {
        const errorText = await response.text();
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Error: " + errorText,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Apartments</h1>

      {fetchingApartments ? (
        <div className="flex justify-center">
          <ClipLoader size={50} color="#3b82f6" />
        </div>
      ) : apartments.length === 0 ? (
        <p className="text-gray-500 text-center">No apartments found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => (
            <Link
              key={apartment.apartment_Id}
              to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
              className=" p-2 text-black m-4 rounded-lg shadow-md text-left flex flex-col max-xl:w-1/4 max-md:w-full"
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
                  <span className="text-[11px]">{apartment.num_Bed} Beds</span>
                </div>
                <div className="flex flex-row">
                  <MdOutlineStairs className="my-auto mr-1" />
                  <span className="text-[11px]">
                    Floor {apartment.floorNum}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-6 justify-around">
                <button
                  onClick={(e) => handleEdit(apartment, e)}
                  className="text-white flex hover:bg-blue-800 p-2 border-1 rounded-lg bg-blue-600"
                >
                  Edit
                  <FaEdit className="w-5 h-5 my-auto ml-2" />
                </button>
                <button
                  onClick={(e) => handleDelete(apartment.apartment_Id, e)}
                  className="text-white flex hover:bg-red-800 p-2 border-1 rounded-lg bg-red-600"
                >
                  Delete <FaTrash className="w-5 h-5 ml-2 my-auto" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}

      {editModalOpen && (
        <EditApartmentModal
          apartment={selectedApartment}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
          getOwnerIdFromToken={getOwnerIdFromToken} // تمرير الدالة كـ prop
        />
      )}
    </div>
  );
};

// نموذج تعديل الشقة
const EditApartmentModal = ({
  apartment,
  onClose,
  onSave,
  getOwnerIdFromToken,
}) => {
  const [formData, setFormData] = useState({
    apartment_Id: apartment.apartment_Id,
    num_Bed: apartment.num_Bed,
    num_Room: apartment.num_Room,
    floorNum: apartment.floorNum,
    description: apartment.description,
    address: apartment.address,
    price: apartment.price,
    title: apartment.title,
    OwnerId: apartment.OwnerId || getOwnerIdFromToken(),
    Apartment_Image: apartment.Apartment_Image || apartment.apartment_Image,
    isRented: apartment.isRented || false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? !checked : value,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    const updatedApartment = {
      ...formData,
      isRented: !formData.isRented,
    };
    await onSave(updatedApartment);
    setIsLoading(false);
    Swal.fire({
      icon: "success",
      title: "Successfull!",
      text: "Your Apartment Updated Successfully!",
    });
    // window.location.reload();
    navigate("/OwnerDashboard?tab=apartments");
  };
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 top-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[70vh] overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Edit Apartment</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              rows="3"
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              Is Available
            </label>
            <input
              type="checkbox"
              name="isRented"
              checked={!formData.isRented}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              {!formData.isRented ? "Available" : "Not Available"}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Beds
            </label>
            <input
              type="number"
              name="num_Bed"
              value={formData.num_Bed}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Rooms
            </label>
            <input
              type="number"
              name="num_Room"
              value={formData.num_Room}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Floor Number
            </label>
            <input
              type="number"
              name="floorNum"
              value={formData.floorNum}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
          >
            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" className="mr-2" />
            ) : null}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerApartments;
