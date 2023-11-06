import React from "react";
import Navbar from "./Navbar";
import { Image, Flex, Text, Button, Spacer } from "@chakra-ui/react";

function About() {
  return (
    <div>
      <Navbar />
      <Flex
        mt="80"
        bgImage="url(https://www.freepikcompany.com/img/forms/team-benefits.svg)"
        bgSize="fit"
        bgPosition="center"
        height="1500px" // Set an appropriate height for the background image
      >
        {/* Add content or components within the Flex container */}
      </Flex>
    </div>
  );
}

export default About;
