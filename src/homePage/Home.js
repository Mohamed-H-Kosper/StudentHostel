import React from "react";
import HeroSec from "./HeroSec";
import LastAdded from "./LastAdded";
import University from "./University";
import Featuers from "./Featuers";
import FaqSection from "./Asks";

const Home = () => {
  return (
    <div>
      <HeroSec />
      <LastAdded />
      <University />
      <Featuers />
      <FaqSection />
    </div>
  );
};

export default Home;
