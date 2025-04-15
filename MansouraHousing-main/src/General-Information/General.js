import { useEffect, useState } from "react";
import "./General.css";
import { useParams } from "react-router-dom";
function General() {
  const [newApartments, setNewApartments] = useState([]);
  const params = useParams();
  // console.log(params);
  useEffect(() => {
    fetch(`/api/Apartment/${params.apartment_Id}`)
      .then((res) => res.json())
      .then((newApartments) => setNewApartments(newApartments));
  }, [params.apartment_Id]);

  return (
    <div className="row">
      <div className="col-lg-9 col-md-9 mb-4 general-information">
        <h5>General Information</h5>
        <div id="Information-All">
          <div className="information-left">
            <div className="information">
              <h6>published Date</h6>
              <h6> Status</h6>
              <h6> Title</h6>
              <h6> Rooms</h6>
            </div>
            <div className="answer">
              <h6>{newApartments.publisheddate}</h6>
              <h6>{newApartments.isRented ? " not Avalible" : "Avalible"}</h6>
              <h6>{newApartments.title}</h6>
              <h6> {newApartments.num_Room}</h6>
            </div>
          </div>
          <div className="information-right ">
            <div className="information">
              <h6>Beds</h6>
              <h6> Address</h6>
              <h6> Floors</h6>
            </div>
            <div className="answer2">
              <h6>{newApartments.num_Bed} </h6>
              <h6>{newApartments.address}</h6>
              <h6> {newApartments.floorNum}</h6>
            </div>
          </div>
        </div>
        <div className="Description ">
          <div className="Description1 ">
            <h6 className=" pb-4 fw-bold description-text1">Description </h6>
          </div>
          <div className="Description1 ">
            <h6 className=" pb-4 fw-bold description-text2 ">
              {newApartments.description}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
export default General;
