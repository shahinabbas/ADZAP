import React from "react";
import { Flex, Box, Text, HStack, Heading, Spacer } from "@chakra-ui/react";

function Navbar() {
  return (
    <div>
      <Flex as="nav" bg='blue' alignItems="center"> 
        <Heading as="h1">ADZAP</Heading>
        <Spacer />

        <HStack spacing='20px' marginLeft='0'>
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
