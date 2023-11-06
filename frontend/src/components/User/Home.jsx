import React from "react";
import First from "./Home/First";
import District from "./Home/District";
import Banner from "./Home/Banner";
import Category from "./Home/Category";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Home() {
  return (
    <>
      <Navbar />
      <First />
      <District />
      <Banner />
      <Category />
      <Banner />
      <Footer />
    </>
  );
}

export default Home;
