import React from "react";
import First from "./Home/First";
import District from "./Home/District";
import Banner from "./Home/Banner";
import Category from "./Home/Category";
import Login from "./Login";
import Signup from "./Signup";
function Home() {
  return (
    <>
      <Login />
      <Signup />
      <First />
      <District />
      <Banner />
      <Category />
      <Banner />
    </>
  );
}

export default Home;
