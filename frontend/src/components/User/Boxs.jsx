import React, { useEffect, useState } from "react";
import { fetchBox } from "../../Services/apiUtils";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import {
  Flex,
  Image,
  Box,
  Text,
  Badge,
  Center,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import api from "../../Services/api";
import { FaBox } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import Footer from "./Footer";
function Boxs() {
  const [userId, setUserId] = useState(null);
  const user = useSelector((state) => state.user);
  const [boxData, setBoxData] = useState([]);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userIdValue = user.user.id;
      setUserId(userIdValue);
      const res = await fetchBox(userIdValue);

      if (res && res.data) {
        setBoxData(res.data);
        console.log(res.data, "jqhfwbhy");

        if (Array.isArray(res.data) && res.data.length > 0) {
          const promises = res.data.map(async (box) => {
            const response = await api.get(
              `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${
                box.postId
              }/`
            );
            return response.data;
          });
          const postsDetails = await Promise.all(promises);
          setProperties(postsDetails);
        } else {
          console.log("No data received from the server.");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

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
      fetchData();
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
        fetchData();
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

      {boxData.length === 0 && (
        <>
          <Center>
            <Image
              src="src/images/empty.jpg"
              alt="No data image"
              mt={10}
              boxSize={{ base: "100%", md: "50%" }}
            />
          </Center>
          <Button
            onClick={() => navigate("/spots")}
            mt={{ base: -570, md: -1170 }}
            ml={{ base: 58, md: 505 }}
            color={"white"}
            bgColor={"#3745d2"}
            fontSize={{ base: 0, md: 15 }}
            w={{ base: "0%", md: "100px" }}
            h={{ base: "0px", md: "30px" }}
          >
            Click here
          </Button>
        </>
      )}
      <div>
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
              m={4}
            >
              <Link to={`/spot/${property.id}/`}>
                <Center>
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
      </div>
      <Footer />
    </div>
  );
}

export default Boxs;
