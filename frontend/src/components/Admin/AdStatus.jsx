import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
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
  const [users, setUsers] = useState([
    { id: 1, genre: "hording", price: 10000, landmark:'aroor',pincode:123456,is_Active: true },
    { id: 2, genre: "hording", price: 10000, landmark:'aroor',pincode:123456,is_Active: false },
  ]);

  const handleToggleUser = (userId) => {
    // Find the user by ID and toggle the is_Active field
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_Active: !user.is_Active } : user
      )
    );
  };

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
              {users.map((ad) => (
                <Tr key={ad.id}>
                  <Td>{ad.id}</Td>
                  <Td>{ad.genre}</Td>
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
