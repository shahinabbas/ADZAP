import React, { useEffect, useState } from "react"; // Import React and other necessary modules
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, Switch } from "@chakra-ui/react";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Contact from "./components/User/Contact";
import About from "./components/User/About";
import Spots from "./components/User/Spots";
import Home from "./components/User/Home";
import Post from "./components/User/Post";
import Spot from "./components/User/Spot";
import AdminLogin from "./components/Admin/AdminLogin";
import BannerManagement from "./components/Admin/BannerManagement";
import Category from "./components/Admin/Category";
import Users from "./components/Admin/Users";
import AdStatus from "./components/Admin/AdStatus";
import AdminHome from "./components/Admin/AdminHome";
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";

function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:8000/adzap/api/hello/')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMessage(data.message);
  //     })
  //     .catch((error) => {
  //       console.error('API request failed', error);
  //     });
  // }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={userStore}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="/spot" element={<Spot />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/post" element={<Post />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/banner" element={<BannerManagement />} />
            <Route path="/category" element={<Category />} />
            <Route path="/users" element={<Users />} />
            <Route path="/status" element={<AdStatus />} />
            <Route path="/admin" element={<AdminHome />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
