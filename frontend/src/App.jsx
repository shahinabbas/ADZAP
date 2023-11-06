import React, { useEffect, useState } from "react"; // Import React and other necessary modules
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, Switch } from "@chakra-ui/react";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Contact from "./components/User/Contact";
import About from "./components/User/About";
import Spots from "./components/User/Spots";
import Home from "./components/User/Home";
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/spots" element={<Spots />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
  );
}

export default App;
