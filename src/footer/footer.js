import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 !text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Homefast</h3>
          <ul className="">
            <li className="mb-2">
              <Link to="/about-us" className="hover:underline text-gray-300">
                About Us
              </Link>
            </li>{" "}
            <li className="mb-2">
              <Link to="/contact" className="hover:underline text-gray-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul>
            <li className="mb-2">
              <Link to="/shop" className="hover:underline text-gray-300">
                Shop Now
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/advirtise" className="hover:underline text-gray-300">
                Add Apartment
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline text-gray-300">
                Terms of Use
              </a>
            </li>
            <li className="mb-2">
              <Link to="/login" className="hover:underline text-gray-300">
                Log In
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:underline text-gray-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-3">Copyright (c) Mohamed Hassan Kosper </p>
    </footer>
  );
};

export default Footer;
