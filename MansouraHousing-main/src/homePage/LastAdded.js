import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { MdOutlineStairs } from "react-icons/md";
import "./HeroSec.css";
import { Grid } from "react-loader-spinner";

const FeaturedCard = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/Apartment/GetAll")
      .then((response) => {
        setApartments(response.data.slice(-4));
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="text-center text-3xl font-semibold mt-2 mb-5 m-5 loading-home">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#60a5fa"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
          className="loading-home"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {apartments.map((apartment) => (
        <Link
          key={apartment.apartment_Id}
          to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
          className="last-added-card w-1/4 p-2 text-black m-4 rounded-lg shadow-md  text-left flex flex-col max-xl:w-1/4 max-md:w-full"
        >
          <img
            loading="lazy"
            alt={apartment.title}
            src={`data:image/jpeg;base64,${apartment.apartment_Image}`}
            className="w-full h-48 object-cover rounded-md"
          />
          <span className="text-[24px] font-semibold">${apartment.price}</span>
          <span className="text-[18px] font-semibold">{apartment.title}</span>
          <span className="text-[12px] text-gray-500">{apartment.address}</span>
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
              <span className="text-[11px] ">Floor {apartment.floorNum}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Featured = () => {
  return (
    <div className="w-full mt-4">
      <div className="w-full text-left text-2xl font-medium">Last Added</div>
      <div className="w-full flex justify-center flex-row flex-wrap mt-3">
        <FeaturedCard />
      </div>
    </div>
  );
};

export default Featured;
