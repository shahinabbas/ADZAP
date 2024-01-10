import React, { useEffect, useState } from "react";
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
import AdminNavbar from "./AdminNavbar";
import api from "../../services/api";
const ReportedUser = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/reportuser/`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleUser = async (userId) => {
    try {
      console.log("toggle start");
      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/action/${userId}/`
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };
  console.log(data);
  return (
    <div>
      <AdminNavbar />

      <Text
        ml={8}
        mt={5}
        textAlign="center"
        fontSize={["xl", "2xl"]}
        fontWeight="bold"
      >
        Reported Users
      </Text>
      <Center>
        <Box m={[2, 4]} w={["75%", "55%"]}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User Id</Th>
                <Th>Report user</Th>
                <Th>Reason</Th>
                {/* <Th>Status</Th>
                <Th>Action</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.user}</Td>
                  <Td>{user.ReportedUser}</Td>
                  <Td>{user.Reason}</Td>
                  {/* <Td>{user.is_active ? "Active" : "Blocked"}</Td>
                  <Td>
                    <Button
                      colorScheme={ReportedUser.is_active ? "red" : "green"}
                      size={["xs", "sm"]}
                      onClick={() => handleToggleUser(user.ReportedUser)}
                    >
                      {ReportedUser.is_active ? "Block" : "Unblock"}
                    </Button>
                  </Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </div>
  );
};

export default ReportedUser;
