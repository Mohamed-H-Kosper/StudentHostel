import "./InformationApartments.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Owner from "../images/Owner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import General from "../General-Information/General";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSec from "./Comments";
import photoProfile from "../images/photo-kosper.jpg";


function InformationApartment() {
  const [newApartments, setNewApartments] = useState([]);
  const [newOwner, setNewOwner] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/api/Apartment/${params.apartment_Id}`)
      .then((res) => res.json())
      .then((newApartments) => setNewApartments(newApartments));
  }, [params.apartment_Id]);

  useEffect(() => {
    fetch(`/api/Owner/${params.owner_Id}`)
      .then((res) => res.json())
      .then((newOwner) => setNewOwner(newOwner));
  }, [params.owner_Id]);

  const callOwner = () => {
    if (newOwner.phoneNumber) {
      const whatsappUrl = `https://wa.me/+2${newOwner.phoneNumber}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const emailOwner = () => {
    if (newOwner.email) {
      const emailUrl = `mailto:${newOwner.email}`;
      window.location.href = emailUrl;
    }
  };

  return (
    <div className="container-fluid information-container">
      <div className="row carouselReverse">
        <div className="about mt-3">
          <h3 data-aos="fade-right" data-aos-duration="3000" className="about-apartment">Apartments For Rent </h3>
          <h3 data-aos="fade-left" data-aos-duration="3000" className="price-apartment" key={newApartments.apartment_Id}>
            {newApartments.price} $
          </h3>
        </div>
        <div className="col-lg-9 col-md-9">
          <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="">
              <div className="w-full h-[500px] bg-slate-400 rounded-lg max-md:w-full max-md:h-auto">
                <img
                data-aos="fade-up"
                 data-aos-duration="3000"
                  loading="lazy"
                  src={`data:image/jpeg;base64,${newApartments.apartment_Image}`}
                  className="d-block w-full h-full object-cover"
                  alt="..."
                />
              </div>
            </div>
            {/* <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleInterval"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button> */}
          </div>
          {/* <div className="small-images">
            <img
              loading="lazy"
              src={`data:image/jpeg;base64,${newApartments.apartment_Image}`}
              alt="no"
              className="image-s"
            />
            ;
          </div> */}
        </div>

        <div data-aos="fade-left" data-aos-duration="3000" key={newOwner.id} className="call-owner col-lg-2 col-md-2">
          <img
            loading="lazy"
            src={photoProfile}
            alt="noPhoto"
            className="image-owner"
          />
          <h4 className="name-owner text-xl">{newOwner.normalizedUserName}</h4>
          <h5 className="address-owner"> {newApartments.address}</h5>
          {newOwner.phoneNumber && (
            <button className="btn btn-success view-button" onClick={callOwner}>
              <span className="icon-phone ">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span  className="text-phone">VIEW PHONE</span>
            </button>
          )}
          <button className="btn  message-button" onClick={emailOwner}>
            <span className="icon-email">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span  className="text-email">SEND MESSAGE</span>
          </button>
        </div>
      </div>
      <General />
      <CommentsSec />
    </div>
  );
}
export default InformationApartment;
