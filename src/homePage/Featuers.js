import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import "./HeroSec.css";

const Featuers = () => {
  return (
    <div className="flex w-full flex-col my-5 ">
      {/* this is the container of the title  */}
      <div className="text-center">
        <h3 data-aos="fade-down" data-aos-duration="3000" className="paragraph text-[48px] font-bold max-md:text-[38px]">
          Features that matter to you for the <br className="max-md:hidden" />
          best university housing
        </h3>
        <p data-aos="fade-up" data-aos-duration="3000" className="paragraph font-semibold text-[20px] text-gray-500">
          Sometimes you need important things in a college dorm like High-speed
          Wi-Fi, flexible living <br className="max-md:hidden" /> room and some
          other important features that help you study and concentrate easily.
        </p>
      </div>
      {/* this container for the cards of the featuers */}
      <div className="flex w-full flex-row flex-wrap justify-center my-3 max-md:flex-col">
        <div data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="paragraph featurd-card w-1/5 p-6 text-left m-4 bg-[#E2F1E8] rounded-xl max-md:w-full max-md:m-0 max-md:mb-4">
          <MdOutlineSecurity className="text-[50px] mb-2" />
          <h4 className="text-[24px] font-bold mb-2">Security</h4>
          <p className="text-[16px] font-medium text-gray-500">
            Here you will enjoy with security
          </p>
        </div>
        <div data-aos="flip-up"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="paragraph featurd-card w-1/5 p-6 text-left m-4 bg-[#E2F1E8] rounded-xl max-md:w-full max-md:m-0 max-md:mb-4">
          <FaCalendarAlt className="text-[50px] mb-2" />
          <h4 className="text-[24px] font-bold mb-2">Flexible living</h4>
          <p className="text-[16px] font-medium text-gray-500">
            Stay as Long or as little as you need with month-to- month contracts
          </p>
        </div>
        <div data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="paragraphfeaturd-card w-1/5 p-6 text-left m-4 bg-[#E2F1E8] rounded-xl max-md:w-full max-md:m-0 max-md:mb-4">
          <IoChatbubbleEllipsesSharp className="text-[50px] mb-2" />
          <h4 className="text-[24px] font-bold mb-2">24/7 support</h4>
          <p className="text-[16px] font-medium text-gray-500">
            On hand team for any issues you have
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featuers;
