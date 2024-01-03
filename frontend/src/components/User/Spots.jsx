import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import Navbar from "./Navbar";
import {
  Flex,
  Box,
  Text,
  Badge,
  Center,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import api from "../../Services/api";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import FrequentlyAskedQuestions from "./Home/FrequentlyAskedQuestions";
import { motion } from "framer-motion";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { fetchCategory } from "../../Services/apiUtils";

function Spots() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState();
  const [boxData, setBoxData] = useState();
  const [category, setCategory] = useState();
  const [searchTerm, setSearchTerm] = useState("");

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
  const fetchData = async (searchTerm = "", categoryId) => {
    try {
      const params = {
        is_active: true,
      };
  
      if (searchTerm) {
        params.search = searchTerm;
      }
  
      if (categoryId) {
        params.categoryId = categoryId;
      }
  
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`,
        {
          params,
        }
      );
  
      console.log(response.data, "jhzshuidhuihaihisfh");
      setProperties(response.data);
      setUserId(user.user.id);
      fetchBox();
    } catch (error) {
      console.log(error);
      console.log("asdf", error.response.data);
    }
  };
  
  const fetchCatgry = async () => {
    try {
      const categoryData = await fetchCategory();
      setCategory(categoryData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchData(searchTerm);
    fetchCatgry();
  }, [searchTerm]);
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
        fetchBox();
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
      <Box mt={90} width={{ base: "80%", md: "50%" }} mx="auto">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => fetchData(searchTerm)}
          />
        </InputGroup>
      </Box>
      {category && category.length > 0 && (
        <Menu>
          <MenuButton
            as={Button}
            bgColor={"white"}
            border={"black"}
            rightIcon={<CiFilter />}
          >
            Filter
          </MenuButton>
          <MenuList>
            {category.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => fetchData(item.id)}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
      {properties.length === 0 ? (
        <>
          <Center>
            <img
              src="src\images\9318688.jpg"
              alt="No box data image"
              style={{ width: "35%", height: "50%" }}
            />
          </Center>
        </>
      ) : (
        <>
          <Center mt={9}>
            <Text fontSize={40} fontWeight={"Bold"} fontFamily={"monospace"}>
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
                      {property.country} &bull; {property.state}
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
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {boxData &&
                      boxData.some((box) => box.postId === property.id) ? (
                        <FaBox
                          size={23}
                          cursor="pointer"
                          onClick={() => handleBoxRemove(property.id)}
                        />
                      ) : (
                        <FaBoxOpen
                          cursor="pointer"
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
        </>
      )}
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
