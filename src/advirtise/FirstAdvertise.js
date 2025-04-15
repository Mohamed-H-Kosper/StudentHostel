import React, { useState } from "react";
import Swal from "sweetalert2";

const FirstAdvertise = ({ formData, setFormData, nextStep }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can upload a maximum of 1 photo.",
      });
      return;
    }

    const file = files[0];
    setSelectedFiles([file]);

    setFormData((prev) => ({
      ...prev,
      Apartment_Image: file,
    }));
  };

  const handleNextStep = () => {
    if (!formData.Apartment_Image) {
      Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please upload an image before proceeding.",
      });
      return;
    }

    nextStep();
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Files Selected",
        text: "Please select at least one photo to upload.",
      });
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("Title", formData.title);
    formDataToSend.append("Price", formData.price);
    formDataToSend.append("Address", formData.address);
    formDataToSend.append("Description", formData.description);
    formDataToSend.append("FloorNum", formData.floor);
    formDataToSend.append("Num_Room", formData.numRooms);
    formDataToSend.append("Num_Bed", formData.numBeds);
    formDataToSend.append("ownerId", formData.ownerId);

    selectedFiles.forEach((file) => {
      formDataToSend.append("Apartment_Image", file);
      setFormData.Apartment_Image = file;
    });

    try {
      const response = await fetch("/api/Apartment", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Apartment data and photos uploaded successfully!",
        });
        setSelectedFiles([]);
        nextStep();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to upload apartment data and photos.",
        });
      }
    } catch (error) {
      console.error("Error uploading apartment data and photos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while uploading apartment data and photos.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Advertise Your Property</h2>

      {/* General Information Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">General Information</h3>
        <div className="grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Enter Description"
              rows="3"
            ></textarea>
          </div>
          {/* Additional fields */}
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              placeholder="Enter Price.."
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Floor</label>
            <input
              type="number"
              name="floor"
              value={formData.floor || ""}
              onChange={handleChange}
              placeholder="Enter Floor.."
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Number Of Rooms</label>
            <input
              type="number"
              name="numRooms"
              value={formData.numRooms || ""}
              onChange={handleChange}
              placeholder="Enter Rooms.."
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Number Of Beds</label>
            <input
              type="number"
              name="numBeds"
              value={formData.numBeds || ""}
              onChange={handleChange}
              placeholder="Enter Beds.."
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
      </div>

      {/* Location Information Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Location Information</h3>
        <div className="grid grid-cols-2 gap-4 max-md:flex max-md:flex-col">
          <div>
            <label className="block font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter Address.."
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload Photos</h3>
        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded">
          <p className="text-gray-500">You can add photos to your ad</p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label
            htmlFor="fileInput"
            className="bg-red-500 text-white py-2 px-4 mt-2 rounded cursor-pointer"
          >
            Upload from Computer
          </label>
          <p className="mt-4 text-sm text-gray-500">
            You can add up to 1 photo
          </p>

          {selectedFiles.length > 0 && (
            <div className="mt-4 w-full">
              <h4 className="font-semibold">Selected Photos:</h4>
              <div className="flex flex-wrap gap-2 mt-2 w-full justify-center">
                {Array.from(selectedFiles).map((file, index) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 overflow-hidden rounded"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            className={`py-2 px-4 mt-4 rounded text-white ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Upload Apartment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstAdvertise;
