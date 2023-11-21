import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Flex, Box, Image, Text, Badge, Center } from "@chakra-ui/react";
import api from "../../Services/api";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import FrequentlyAskedQuestions from "./Home/FrequentlyAskedQuestions";
import { motion } from "framer-motion";
function Spots() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState();
  const [boxData, setBoxData] = useState();

  const fetchBox = async () => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/box/`,
        {
          params: {
            userId: userId,
          },
        }
      );
      setBoxData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`
        );
        setProperties(response.data);
        setUserId(user.user.id);
        fetchBox();
      } catch (error) {
        console.log(error);
        console.log("asdf", error.response.data);
      }
    };
    fetchData();
  }, []);

  const handleBoxAdd = async (spotId) => {
    try {
      const requestData = {
        postId: spotId,
        user: userId,
      };
      const response = await api.post(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/box/`,
        requestData
      );
      console.log("success box add", response.data);
      fetchBox();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBoxRemove = async (postId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/box/${postId}/`
      );

      if (response.status === 204) {
        console.log("Success: Box removed");
        fetchBox(); // or perform any other action after successful removal
      } else if (response.status === 404) {
        console.log("Error: Box not found");
      } else {
        console.log("Unexpected error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Center>
        <Text
          mt="90px"
          fontSize={40}
          fontWeight={"Bold"}
          fontFamily={"monospace"}
        >
          {" "}
          Explore the Spots
        </Text>
      </Center>
      <Flex
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {properties.map((property, index) => (
          <Box
            key={index}
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            w={{
              base: "100%",
              sm: "calc(60% - 2rem)",
              md: "calc(33.33% - 9rem)",
            }}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            m={4} // Add margin between cards
          >
            <Link to={`/spot/${property.id}/`}>
              <Center>
                {/* <Image
                  src={property.image}
                  alt={property.imageAlt}
                  roundedTop="lg"
                  h="200px"
                /> */}
                <Box
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  position="relative"
                  overflow="hidden"
                  borderRadius="lg"
                  h="200px"
                >
                  <motion.img
                    src={property.image}
                    alt={property.imageAlt}
                    roundedTop="lg"
                    h="200px"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Box>
              </Center>
            </Link>
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge rounded="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {property.country} beds &bull; {property.state} baths
                </Box>
              </Box>

              <Text
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {property.title}
              </Text>

              <Box>
                {property.price}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {boxData &&
                  boxData.some((box) => box.postId === property.id) ? (
                    <FaBox
                      size={23}
                      onClick={() => handleBoxRemove(property.id)}
                    />
                  ) : (
                    <FaBoxOpen
                      size={20}
                      onClick={() => handleBoxAdd(property.id)}
                    />
                  )}
                </div>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
      <br />
      <br />
      <br />
      <br />
      <br />
      <FrequentlyAskedQuestions />
      <Footer />
    </div>
  );
}

export default Spots;
