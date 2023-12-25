import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../../Services/api";
import { Image, Flex, Text, Button, Box, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategory,fetchSingleUser } from "../../Services/apiUtils";
import { logoutUser } from "../../Redux/userActions";
import { ChatList } from "./Chats/chat-list";
import { useDispatch } from "react-redux";
import { setSelectedChatUser } from "../../Redux/userActions";

function Spot() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [spotData, setSpotData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [catgId, setCatgId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${spotId}/`
        );
        setSpotData(response.data);
        const categoryData = await fetchCategory();
        setCategories(categoryData);
        setCatgId(response.data.category);
      } catch (error) {
        console.error(error, "error");
      }
    };
    fetchData();
  }, [spotId]);

  const handleSelectUser = async (selectedUser) => {
    try {
      const singleUserData = await fetchSingleUser(selectedUser);
      dispatch(setSelectedChatUser(singleUserData));

      navigate("/chat");
    } catch (error) {
      console.error("Error fetching single user:", error);
    }
  };


  const getCategoryNameById = (catgId) => {
    const category = categories
      ? categories.find((cat) => cat.id === catgId)
      : null;
    return category ? category.name : "Unknown Category";
  };

  if (!categories) {
    return (
      <div>
        <Navbar />
        <Text mt="70px">Loading........</Text>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Stack direction={["column", "row"]} spacing={8} mt="75px" ml={8}>
        <Image
          boxSize={["100%", "500px"]}
          objectFit="cover"
          src={spotData.image}
          alt="image"
        />
        <Box>
          <Text fontSize="5xl" fontWeight="bold">
            {getCategoryNameById(catgId)}
          </Text>
          <Text fontWeight="bold">Price: {spotData.price}</Text>
          <Text fontSize="2xl" mt={4}>
            {spotData.discription}
          </Text>
          <Flex direction={["column", "row"]} mt={5}>
            <Button onClick={() => handleSelectUser(spotData.user)}>
              Chat With Seller
            </Button>
            <Button bg="#3b49df" color={"white"} ml={[0, 10]}>
              More Spots
            </Button>
          </Flex>
        </Box>
      </Stack>
      <Stack ml={[8, 10]} fontWeight="bold" direction="column">
        <Text mt={2}>Country: {spotData.country}</Text>
        <Text mt={2}>State: {spotData.state}</Text>
        <Text mt={2}>City: {spotData.city}</Text>
        <Text mt={2}>Landmark: {spotData.landmark}</Text>
      </Stack>

      <Footer />
      {/* <ChatList onSelectUser={handleSelectUser} /> */}
    </div>
  );
}

export default Spot;
