import React from "react";
import { useNavigate } from "react-router-dom";

const SecondAdvertise = ({ formData, prevStep }) => {
  const navigate = useNavigate();
  console.log("Form Data:", formData);
  console.log("Selected Files:", formData.selectedFiles);

  const handleConfirm = () => {
    navigate("/shop"); // التوجيه إلى صفحة المتجر عند التأكيد
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {formData.title || "Property for Sale"}
      </h2>

      {/* عرض الصور */}
      <div className="my-4 w-full flex text-center justify-center items-center gap-2">
        {formData.Apartment_Image ? (
          <img
            src={URL.createObjectURL(formData.Apartment_Image)}
            alt="Uploaded"
            className="w-[500px] h-[400px] my-auto rounded"
          />
        ) : (
          <p className="text-gray-500">No images uploaded.</p>
        )}
      </div>

      {/* معلومات العقار */}
      <div className="my-4 w-full flex justify-center items-center">
        <div className="w-[75%] py-4 px-7 bg-[#FFFFFF] drop-shadow-lg max-md:w-full">
          <h2 className="text-[24px] font-medium">
            {formData.title || "Property for Sale"}
          </h2>
          <p className="text-gray-500 text-[18px]">
            {formData.address || "No address provided"}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-400 font-medium text-[14px]">
                Price:{" "}
                <span className="font-medium text-black">
                  {formData.price ? `${formData.price} EGP` : "N/A"}
                </span>
              </p>
              <p className="text-gray-400 font-medium text-[14px]">
                Rooms:{" "}
                <span className="font-medium text-black">
                  {formData.numRooms || "N/A"}
                </span>
              </p>
              <p className="text-gray-400 font-medium text-[14px]">
                Num Of Beds:{" "}
                <span className="font-medium text-black">
                  {formData.numBeds || "N/A"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-[14px]">
                Floor:{" "}
                <span className="font-medium text-black">
                  {formData.floor || "N/A"}
                </span>
              </p>
              <p className="text-gray-400 font-medium text-[14px]">
                Status:{" "}
                <span className="font-medium text-black">Available</span>
              </p>
              <p className="text-gray-400 font-medium text-[14px]">
                Published Date:{" "}
                <span className="font-medium text-black">2 December 2020</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* الوصف */}
      <div className="my-4 w-full flex justify-center items-center">
        <div className="w-[75%] py-4 px-7 bg-[#FFFFFF] drop-shadow-lg max-md:w-full">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-600">
            {formData.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-400 text-white py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Confirm & Go to Shop
        </button>
      </div>
    </div>
  );
};

export default SecondAdvertise;
