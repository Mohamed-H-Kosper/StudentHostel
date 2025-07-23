import axios from "axios";
import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { MdOutlineStairs } from "react-icons/md";
import "./HeroSec.css";
import { Grid } from "react-loader-spinner";
import { useState, useEffect } from "react";
import "./HeroSec";
const LastAdded = ({ filtersSearch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/Apartment/GetAll")
      .then((response) => {})
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="text-center text-3xl font-semibold mt-5 mb-5 load">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#60a5fa"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }
  if (!filtersSearch) {
    return "No result in search ";
  }
  return (
    <div className="w-full mt-4">
      <div
        data-aos="fade-right"
        data-aos-duration="3000"
        className="w-full text-left text-2xl font-medium last"
      >
        Last Added
      </div>
      <div className="w-full flex justify-center flex-row flex-wrap mt-3">
        <div className="flex flex-wrap justify-center">
          {filtersSearch.length === 0 ? (
            <h4 className="text-danger">
              No Result Matching This Apartment Title
            </h4>
          ) : (
            filtersSearch.map((apartment) => (
              <Link
                data-aos="fade-up"
                data-aos-duration="2000"
                key={apartment.apartment_Id}
                to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
                className="last-added-card w-1/5 p-2 text-black m-4 mb-5 rounded-lg shadow-md  text-left flex flex-col max-xl:w-1/5 max-md:w-full"
              >
                <img
                  loading="lazy"
                  alt={apartment.title}
                  src={`data:image/jpeg;base64,${apartment.apartment_Image}`}
                  className="w-full h-100 object-cover rounded-md"
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
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default LastAdded;
