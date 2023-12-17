import React, { useState, useEffect } from "react";
import {
  Avatar,
  chakra,
  HStack,
  Stack,
  Flex,
  Box,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { DeliveredIcon } from "../../../images/icons";
import { fetchUser } from "../../../Services/apiUtils";
import { useSelector } from "react-redux";

export function ChatList({ onItemClick }) {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    console.log('chat-list');
    const fetchData = async () => {
      try {
        const userResponse = await fetchUser();
        const filteredUserData = userResponse.filter((item) => item.id !== user.user.id);
        setUserData(filteredUserData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <Stack
      spacing="0"
      pr="1"
      divider={<StackDivider w="82%" alignSelf="flex-end" />}
    >
      {userData &&
        userData.map((item, index) => (
          <HStack
            key={index}
            _hover={{
              cursor: "pointer",
              backgroundColor: "#f5f6f6",
            }}
            py="3"
            onClick={() => {
              onItemClick(item);
              console.log("Selected User:", item);
            }}
          >
            <Avatar mx="3" name={item.name} src={item.src} />
            <Box flex="1" pr="4">
              <Flex justify="space-between" align="baseline">
                <Box>
                  <Text fontWeight="medium">{item.name}</Text>
                  <HStack>
                    <DeliveredIcon color={item.seen ? "#53bdeb" : "#667781"} />
                    <Text color="#667781" fontSize="sm">
                      {item.message}
                    </Text>
                  </HStack>
                </Box>
                <chakra.time fontSize="xs" color="#667781">
                  {item.date}
                </chakra.time>
              </Flex>
            </Box>
          </HStack>
        ))}
    </Stack>
  );
}

// User clicks on a user in the ChatList component (Left Panel).
// The onClick event in ChatList triggers the onItemClick function.
// The onItemClick function is passed from Chat to LeftPanel to ChatList.
// The onItemClick function is called with the clicked user data.
// The handleUserClick function in the Chat component updates the selectedUser state with the clicked user data.
// The updated selectedUser state is passed down to the RightPanel component.
// The RightPanel component renders with the details of the selected user.