import React, { useState } from "react";
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
const ReportedUser = () => {
  const [data, setData] = useState();
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
        <Box m={[2, 4]} w={["95%", "75%"]}>
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
              {data.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.is_active ? "Active" : "Blocked"}</Td>
                  <Td>
                    <Button
                      colorScheme={user.is_active ? "red" : "green"}
                      size={["xs", "sm"]}
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

export default ReportedUser;
