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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatUser } from "../../../Redux/userActions";
import api from "../../../Services/api";
import { fetchCount } from "../../../Redux/userActions";

export function ChatList({ onItemClick }) {
  const user = useSelector((state) => state.user);
  const selected = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [count, setCount] = useState();
  const [userFromMessage, setUser] = useState();
  const dispatch = useDispatch();
  const Count = useSelector((state) => state.user.count);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetchUser();
        const filteredUserData = userResponse.filter(
          (item) => item.id !== user.user.id
        );
        setUserData(filteredUserData);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserFromMessage = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}chat/api/userfrommessage/${
            user.user.id
          }/`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchUserFromMessage();
    dispatch(fetchCount());
  }, []);

  // const fetchCount = async () => {
  //   try {
  //     const response = await api.get(
  //       `${import.meta.env.VITE_APP_BASE_URL}chat/api/count/`
  //     );
  //     console.log(response.data);
  //     setCount(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onUserClick = (user) => {
    dispatch(setSelectedChatUser(user));
    // setSelectedUser(user);
  };

  return (
    <Stack
      spacing="0"
      pr="1"
      divider={<StackDivider w="82%" alignSelf="flex-end" />}
    >
      {userData &&
        userData.map((item, index) => {
          const matchingUser =
            userFromMessage &&
            userFromMessage.find(
              (user) => user.other_user === item.id || user.user === item.id
            );
          if (matchingUser) {
            return (
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
                        <Text color="#667781" fontSize="sm">
                          {item.message}
                        </Text>
                      </HStack>
                    </Box>
                    {/* <chakra.time fontSize="xs" color="#667781">
                  {item.date}
                </chakra.time> */}
                    {Count &&
                      Count.map((countItem) => {
                        if (countItem.user === item.id) {
                          return (
                            <chakra.time
                              key={countItem.user}
                              w="20px"
                              h="20px"
                              bg="grey"
                              color="white"
                              borderRadius="full"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              fontSize="sm"
                            >
                              {countItem.user_count}
                            </chakra.time>
                          );
                        }
                        return null;
                      })}
                  </Flex>
                </Box>
              </HStack>
            );
          }
          return null;
        })}
      {userData &&
        userData.map((item, index) => {
          const matchingUser =
            userFromMessage &&
            userFromMessage.find(
              (user) => user.other_user === item.id || user.user === item.id
            );
          if (!matchingUser) {
            return (
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
                        <Text color="#667781" fontSize="sm">
                          {item.message}
                        </Text>
                      </HStack>
                    </Box>
                  
                    {Count &&
                      Count.map((countItem) => {
                        if (countItem.user === item.id) {
                          return (
                            <chakra.time
                              key={countItem.user}
                              w="20px"
                              h="20px"
                              bg="grey"
                              color="white"
                              borderRadius="full"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              fontSize="sm"
                            >
                              {countItem.user_count}
                            </chakra.time>
                          );
                        }
                        return null;
                      })}
                  </Flex>
                </Box>
              </HStack>
            );
          }
          return null;
        })}
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
