import React from "react";
import Hero from "../Hero/Hero";
import Wproduct from "../WomensProduct/Wproduct";
import HeroBanner from "../HeroBanner/HeroBanner";
import NewCollections from "../NewCollection/NewCollection";
import Offer from "../Offer/Offer";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Wproduct />
      <HeroBanner />
      <NewCollections />
      <Offer />
    </div>
  );
};
export default Shop;
