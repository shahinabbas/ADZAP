import React, { useEffect, useState } from "react"; // Import React and other necessary modules
import Profile from "./components/Profile";
import Home from "./components/Home";
import { ChakraProvider } from "@chakra-ui/react";

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
      <Home />
      <Profile />
    </ChakraProvider>
  );
}

export default App;
