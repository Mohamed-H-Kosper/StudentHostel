import React, { useEffect, useState } from "react";
import heroImage from "../images/MainImage.png";
import "./HeroSec.css";
import LastAdded from "./LastAdded";
import axios from "axios";
const HeroSec = () => {
  const [data, setData] = useState([]);
  const [filtersSearch, setFiltersSearch] = useState([]);

  useEffect(() => {
    axios
      .get("http://studenthostelwebsite.runasp.net/api/Apartment/GetAll")
      .then((response) => {
        setData(response.data);
        setFiltersSearch(response.data.slice(-4));
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      });
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value;
    if (value.trim()) {
      const filterdTitle = data.filter(
        (f) =>
          f.title.toLowerCase().includes(value.toLowerCase()) ||
          f.description.toLowerCase().includes(value.toLowerCase()) ||
          f.price.toString().includes(value.toLowerCase())
      );

      setFiltersSearch(filterdTitle);
    } else {
      setFiltersSearch(data.slice(-4));
    }
  };
  return (
    <>
      <div className="relative w-full h-[50vh] flex justify-center items-center">
        {/* this is the image of the hero section */}
        <img
          loading="lazy"
          alt="heroImage"
          src={heroImage}
          className="absolute inset-0 h-full w-full max-md:h-full max-md:w-fit image-home"
        ></img>
        {/* here is the content of the hero section  */}
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="3000"
          className="text-home backdrop-contrast-50 px-5 py-3 rounded-lg"
        >
          <h1 className="text-5xl font-semibold text-center text-[#FFFFFF] shadow-lg ">
            Find your perfect student <br /> home near your university
          </h1>
          <input
            type="search"
            title="Search here for house"
            placeholder="Search in student hostel"
            className="mt-6 py-2 px-4 w-full rounded-lg  search-home"
            onChange={handleFilter}
          />
        </div>
      </div>
      <LastAdded filtersSearch={filtersSearch} />
    </>
  );
};

export default HeroSec;
