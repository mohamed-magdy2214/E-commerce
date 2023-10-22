import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";


export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts />
    </>
  );
}
