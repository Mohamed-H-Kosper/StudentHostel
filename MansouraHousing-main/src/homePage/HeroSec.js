import React from "react";
import heroImage from "../images/MainImage.png";
import "./HeroSec.css";
const HeroSec = () => {
  return (
    <div className="relative w-full h-[50vh] flex justify-center items-center">
      {/* this is the image of the hero section */}
      <img
        loading="lazy"
        alt="heroImage"
        src={heroImage}
        className="absolute inset-0 h-full w-full max-md:h-full max-md:w-fit image-home"
      ></img>
      {/* here is the content of the hero section  */}
      <div className="text-home">
        <h1 className="text-5xl font-semibold text-center text-[#FFFFFF] shadow-lg blur-md">
          Find your perfect student <br /> home near your university
        </h1>
        <input
          type="search"
          title="Search here for house"
          placeholder="Search in student hostel"
          className="mt-6 py-2 px-4 w-full rounded-lg  search-home"
        />
      </div>
    </div>
  );
};

export default HeroSec;
