import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Form, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function NavFilter({ onFilter }) {
  const [numRooms, setNumRooms] = useState("");
  const [numBeds, setNumBeds] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    onFilter({ numRooms, numBeds, minPrice, maxPrice });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container
        fluid
        className="NavContainer tertiary shadow p-3 mb-2 bg-body rounded"
      >
        <div className="filter-left">
          <Form.Select
            aria-label="Select Number of Rooms"
            className="number-room me-3 cursor-pointer"
            value={numRooms}
            onChange={(e) => setNumRooms(e.target.value)}
            data-aos="fade-right"
          >
            <option value="">Number Of Room</option>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            aria-label="Select Number of Beds"
            className="Category me-3"
            value={numBeds}
            onChange={(e) => setNumBeds(e.target.value)}
            data-aos="fade-right"
          >
            <option value="">Number Of Beds</option>
            {[1, 2, 3, 4, 5, 6, 7].map((bed, index) => (
              <option key={index + 1} value={index + 1}>
                {bed}
              </option>
            ))}
          </Form.Select>
          <Form className="d-flex price-center">
            <Form.Group className="d-flex ">
              <Form.Control
                type="number"
                placeholder="Min Price $"
                className="price  me-2 max-md:text-sm ml-5"
                aria-label="min-price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            data-aos="fade-right"
              />
              <Form.Control
                type="number"
                placeholder="Max Price $"
                className="price price-max ml-3"
                aria-label="max-price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            data-aos="fade-right"

              />
            </Form.Group>
          </Form>
        </div>

        <div className="filter-right">
          <button data-aos="fade-left" data-aos-duration="3000" className="btn button-filter px-4 py-2" onClick={handleSearch}>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavFilter;
