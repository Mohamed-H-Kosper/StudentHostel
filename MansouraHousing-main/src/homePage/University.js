import React from "react";
import UnvisrityImage from "../images/universityImage.png";

const University = () => {
  return (
    <div>
      <img
        loading="lazy"
        alt="UnvisrityImage"
        src={UnvisrityImage}
        className="mx-auto"
      ></img>
    </div>
  );
};

export default University;
