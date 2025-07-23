import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Apartments.css";
import iconStairs from "../images/iconstairs.png";
import { faBed, faHome } from "@fortawesome/free-solid-svg-icons";
import NavFilter from "./NavFilter";
import Next from "./Next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "react-loader-spinner";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function Apartments() {
  const [allApartments, setAllApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [filters, setFilters] = useState({
    numRooms: "",
    numBeds: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/Apartment/GetAll`)
      .then((response) => {
        setAllApartments(response.data);
        setFilteredApartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFavorite = (apartment) => {
    let updatedFavorites;
    const isFavorite = favorites.some(
      (fav) => fav.apartment_Id === apartment.apartment_Id
    );

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.apartment_Id !== apartment.apartment_Id
      );
    } else {
      updatedFavorites = [...favorites, apartment];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    let filtered = allApartments.filter((apartment) => {
      return (
        (filters.numRooms === "" ||
          apartment.num_Room === parseInt(filters.numRooms)) &&
        (filters.numBeds === "" ||
          apartment.num_Bed === parseInt(filters.numBeds)) &&
        (filters.minPrice === "" ||
          apartment.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" ||
          apartment.price <= parseFloat(filters.maxPrice))
      );
    });

    setFilteredApartments(filtered);
  }, [filters, allApartments]);

  if (loading) {
    return (
      <div className="mt-5 mb-5 w-full flex justify-center mx-auto">
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

  return (
    <>
      <NavFilter onFilter={handleFilter} />
      <div className="container-fluid apartment-container">
        <div className="row">
          {filteredApartments.length === 0 ? (
            <div className="text-center w-100 mt-5">
              <h3 className="text-danger">❌ No results match your search.</h3>
              <p>Try adjusting your search criteria and try again.</p>
            </div>
          ) : (
            filteredApartments.map((apartment) => (
              <div
                className="col-xl-3 col-lg-4 col-md-4 card-shop"
                key={apartment.apartment_Id}
              >
                <Link
                  to={`/details/${apartment.apartment_Id}/owner/${apartment.ownerId}`}
                >
                  <div data-aos="fade-up" className="card ">
                    {/* <div className=""> */}
                    <img
                      loading="lazy"
                      src={`data:image/jpeg;base64,${apartment.apartment_Image}`}
                      className="card-img-top"
                      alt="NoImage"
                    />
                    {/* </div> */}
                    <div className="card-body relative">
                      {favorites.some(
                        (fav) => fav.apartment_Id === apartment.apartment_Id
                      ) ? (
                        <MdFavorite
                          className="absolute top-4 right-3 text-2xl cursor-pointer z-30 text-red-500"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(apartment);
                          }}
                        />
                      ) : (
                        <MdFavoriteBorder
                          className="absolute top-4 right-3 text-2xl cursor-pointer z-30"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(apartment);
                          }}
                        />
                      )}
                      <h3 className="card-title">{apartment.price} $</h3>
                      <h5 className="card-title">{apartment.title}</h5>
                      <h6 className="card-date">
                        Date:{" "}
                        {new Date(apartment.publisheddate).toLocaleDateString()}
                      </h6>
                      <h6 className="d-flex">
                        <FontAwesomeIcon icon={faHome} className="icon-room" />
                        <span className="text">{apartment.num_Room} Room</span>
                        <img
                          loading="lazy"
                          src={iconStairs}
                          alt="no"
                          className="icon-stairs mb-1"
                        />
                        <span className="text mr-2">
                          {apartment.floorNum} Floor
                        </span>
                        <FontAwesomeIcon icon={faBed} className="icon-room" />
                        <span className="text">{apartment.num_Bed} Bed</span>
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <Next />
    </>
  );
}

export default Apartments;
