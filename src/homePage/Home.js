import React from "react";
import HeroSec from "./HeroSec";
import Featured from "./LastAdded";
import University from "./University";
import Featuers from "./Featuers";
import FaqSection from "./Asks";

const Home = () => {
  return (
    <div>
      <HeroSec />
      {/* <Featured /> */}
      <University />
      <Featuers />
      <FaqSection />
    </div>
  );
};

export default Home;
