import React from "react";
import Navbar from "./Navbar";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />

      <Flex
        direction={{ base: "column", md: "row" }}
        p={8}
        justify="center" // Center horizontally
        align="center" // Center vertically
      >
        <Image
          src="src\images\9169253.jpg"
          boxSize={{ base: "100%", md: "40%" }}
          objectFit="cover"
          position="relative"   
        >
        </Image>
        <Box
          maxW={{ base: "270px", md: "270px" }}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          boxSize="70%"
          overflow={"hidden"}
          ml={{ base: 0, md: 450 }}
          mt={{ base: 4, md: 0 }}
        >
          <Flex justify={"center"} mt={5}>
            <Avatar
              size={"xl"}
              src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>
          
          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {user.user.name}
              </Heading>
              <Text color={"gray.500"}>{user.user.email}</Text>
              <Text>Post Count</Text>
            </Stack>

            <Button
              w={"full"}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Profile;
