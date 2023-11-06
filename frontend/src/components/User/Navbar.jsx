import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Flex, Box, Text, HStack, Heading, Spacer } from "@chakra-ui/react";
import Signup from "./Signup";
import Login from "./Login";
function Navbar() {
  const navigate=useNavigate();
  return (
    <div>
      <Flex as="nav" bg="blue" alignItems="center">
        <Heading as="h1" style={{cursor:'pointer'}} onClick={() => navigate("/")}>ADZAP</Heading>
        <Spacer />
        <Login />
        <Signup />
        <HStack spacing="20px" marginLeft="0">
          <Box bg="black" p="10px">
            M
          </Box>
          <Text>User</Text>
        </HStack>
      </Flex>
    </div>
  );
}

export default Navbar;
