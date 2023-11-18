import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import AdminNavbar from "./AdminNavbar";
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
  const [post, setPost] = useState([]);

  const handleToggleUser = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_Active: !user.is_Active } : user
      )
    );
  };

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <Text ml={8} mt={5} textAlign="center" fontSize="xl" fontWeight="bold">
        Status Management
      </Text>
      <Center>
        <Box m={4} w="75%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
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
                  <Td>{ad.media_type}</Td>
                  <Td>{ad.price}</Td>
                  <Td>{ad.landmark}</Td>
                  <Td>{ad.pincode}</Td>
                  <Td>{ad.is_Active ? "Accepted" : "Declined"}</Td>
                  <Td>
                    <Button
                      colorScheme={ad.is_Active ? "red" : "green"}
                      size="sm"
                      onClick={() => handleToggleUser(ad.id)}
                    >
                      {ad.is_Active ? "Accept" : "Decline"}
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
