import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Flex, Box, Image, Text, Badge, Center } from "@chakra-ui/react";
import api from "../../Services/api";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";

function Spots() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`
        );
        setProperties(response.data);
        setUserId(user.user.id);
      } catch (error) {
        console.log(error);
        console.log("asdf", error.response.data);
      }
    };
    fetchData();
  }, []);

  const handleBoxAddOrRemove = async (userId, propertyId) => {
    console.log(propertyId,'id')
    console.log(userId,'id')
    try {
      const requestData = {
        userId: userId,
      };
      await api.post(`${import.meta.env.VITE_APP_BASE_URL}admins/api/box/add-or-remove/${propertyId}/`,
        requestData
      );
      console.log("success");
    } catch (error) {
      console.error("Error adding or removing box:", error);
      console.error("Error adding 2:", error.response);
    }
  };

  return (
    <div>
      <Navbar />
      <Flex
        mt={10}
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
                <Image
                  src={property.image}
                  alt={property.imageAlt}
                  roundedTop="lg"
                  h="200px"
                />
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
                  <FaBoxOpen
                    size={23}
                    onClick={() => handleBoxAddOrRemove(userId, property.id)}
                  />
                  
                  <FaBox
                    size={20}
                    onClick={() => handleBoxAddOrRemove(userId, property.id)}
                  />
                </div>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>
      <Footer />
    </div>
  );
}

export default Spots;
