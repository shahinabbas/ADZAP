import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Image,
  Flex,
  Text,
  Button,
  Spacer,
  Input,
  FormControl,
  Textarea,
} from "@chakra-ui/react";

function Spot() {
  return (
    <div>
      <Navbar />
      <Flex>
        <Image
          mt={12}
          ml={45}
          h="500"
          src="src\images\download (1).png"
          alt="image"
        />
        <Flex flexDirection="column" mt={14} ml={14}>
          <Text fontSize="5xl" fontWeight="bold">
            Hording
          </Text>
          <br />
          <Text fontSize="2xl" mr={6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </Text>
          <br />
          <Text>Place:Aroor</Text>
          <Text>Place:Aroor</Text>
        </Flex>
      </Flex>

      <Footer />
    </div>
  );
}

export default Spot;
