import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import AdminNavbar from "./AdminNavbar";
import { fetchCategory } from "../../Services/apiUtils";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
} from "@chakra-ui/react";

const AdStatus = () => {
  const [action, setAction] = useState([]);
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`
      );
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await fetchCategory(); // Assuming fetchCategory is an async function
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
    fetchCategories();
  }, []);

  const handleToggleStatus = async (adId) => {
    try {
      console.log("toggle start");
      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/action/${adId}/`
      );
      console.log("toggle DONE");
      setAction((prevAds) =>
        prevAds.map((ad) =>
          ad.id === adId ? { ...ad, is_Active: !ad.is_Active } : ad
        )
      );
      await fetchData();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const getCategoryNameById = (catgId) => {
    const category = categories
      ? categories.find((cat) => cat.id === catgId)
      : null;
    return category ? category.name : "Unknown Category";
  };

  return (
    <div>
      <AdminNavbar />
      <Text ml={8} mt={5} textAlign="center" fontSize="xl" fontWeight="bold">
        AD Status Management
      </Text>
      <Center>
        <Box m={4} w="75%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Category</Th>
                <Th>Genre</Th>
                <Th>Price</Th>
                <Th>Landmark</Th>
                <Th>Pincode</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {post.map((ad) => (
                <Tr key={ad.id}>
                  <Td>{ad.id}</Td>
                  <Td>{getCategoryNameById(ad.category)}</Td>
                  <Td>{ad.media_type}</Td>
                  <Td>{ad.price}</Td>
                  <Td>{ad.landmark}</Td>
                  <Td>{ad.pincode}</Td>
                  <Td>{ad.is_active ? "Accepted" : "Declined"}</Td>
                  <Td>
                    <Button
                      colorScheme={ad.is_active ? "red" : "green"}
                      size="sm"
                      onClick={() => handleToggleStatus(ad.id)}
                    >
                      {ad.is_active ? "Decline" : "Accept"}
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </div>
  );
};

export default AdStatus;
