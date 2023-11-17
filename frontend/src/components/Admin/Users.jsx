import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import api from "../../Services/Axios/api";
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

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/users/`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUser = async (userId) => {
    try {
      console.log("toggle start");
      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/action/${userId}/`
      );
      console.log("toggle DONE");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_Active: !user.is_Active } : user
        )
      );
      console.log(`Toggling user with ID: ${userId}`, response);
      await fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };
  const sortedUsers = [...users].sort((a, b) => a.id - b.id);

  return (
    <div>
      <AdminNavbar />
      <Text ml={8} mt={5} textAlign="center" fontSize="xl" fontWeight="bold">
        User Management
      </Text>
      <Center>
        <Box m={4} w="75%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.is_active ? "Active" : "Blocked"}</Td>
                  <Td>
                    <Button
                      colorScheme={user.is_active ? "red" : "green"}
                      size="sm"
                      onClick={() => handleToggleUser(user.id)}
                    >
                      {user.is_active ? "Block" : "Unblock"}
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

export default Users;
