import React, { useEffect } from "react";
import First from "./Home/First";
import District from "./Home/District";
import Banner from "./Home/Banner";
import Category from "./Home/Category";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FrequentlyAskedQuestions from "./Home/FrequentlyAskedQuestions";
import Review from "./Home/Review";
import Spaces from "./Home/Spaces";

function Home() {
  return (
    <>
      <Navbar />
      <First />
      {/* <District /> */}
      {/* <Banner textAlign='right' src='src\images\download (1).png' title=' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.' /> */}
        <Spaces />
      <Category />
      <br />
      <br />
      {/* <Banner
        textAlign="left"
        src="src\images\download (2).png"
        title=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex eat occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
      /> */}
      <Review />
      <FrequentlyAskedQuestions />
      <Footer />
    </>
  );
}

export default Home;
