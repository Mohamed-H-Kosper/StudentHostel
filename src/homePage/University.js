import React from "react";
import UnvisrityImage from "../images/universityImage.png";
import './HeroSec';
const University = () => {
  return (
    <div>
      <h2  data-aos="fade-up"
        data-aos-duration="2000" className="d-flex align-items-center justify-content-center mb-5 mt-5 hostel-text">
     Welcome in Mansoura University Student Hostel
    </h2>
      <img
      data-aos="zoom-in-up"
        loading="lazy"
        alt="UnvisrityImage"
        src={UnvisrityImage}
        className="mx-auto"
      ></img>
    </div>
  );
};

export default University;
