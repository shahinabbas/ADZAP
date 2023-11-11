import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Flex, Box, Text, HStack, Heading, Spacer } from "@chakra-ui/react";
import Signup from "./Signup";
import Login from "./Login";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {" "}
      <Flex as="nav" bg="blue" alignItems="center" h="75px" bgColor="#5C59EC">
        <Heading
          as="h1"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          ADZAP
        </Heading>
        <Link to='/post'>Post</Link>
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
