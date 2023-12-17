import {
  AbsoluteCenter,
  Center,
  Flex,
  Box,
  Heading,
  HStack,
  Text,
  Input,
  Avatar,
  InputGroup,
  InputLeftElement,
  Tooltip,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import api from "../../../Services/api";
import { setupNotification } from "../Navbar";

export const RightPanel = ({ selectedUser }) => {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userChatHistory, setUserChatHistory] = useState([]);

  useEffect(() => {
    if (!selectedUser) return;

    let access_token = localStorage.getItem("access");
    const path = `${import.meta.env.VITE_APP_WS_BASE_URL}${user.user.id}/${
      selectedUser.id
    }/?token=${access_token}`;

    getUserChatHistory();

    const ws = new WebSocket(path);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (ws.readyState === WebSocket.OPEN) {
        setChatMessages((prevMessages) => [...prevMessages, data]);
      }
      setupNotification();
    };

    ws.onerror = (e) => {
      console.error(e);
    };

    ws.onclose = () => {
      console.log("WebSocket Closed");
    };

    return () => {
      ws?.close();
      console.log("WebSocket Closed (cleanup)");
      setChatMessages([]);
    };
  }, [selectedUser]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // const notificationStatus =async () => {
  //   console.log('222222222222222222222222');
  //   try {
  //     const response =await api.patch(
  //       `${import.meta.env.VITE_APP_BASE_URL}chat/api/notification/${
  //         selectedUser.id
  //       }/`
  //     );
  //     console.log(response,'notificationststus');
  //   } catch (error) {
  //     console.log("notification status error", error);
  //   }
  // };

  const getUserChatHistory = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}chat/api/history/?user_id=${
          selectedUser.id
        }`
      );
      const reversedChatHistory = response.data.slice().reverse();
      setUserChatHistory(reversedChatHistory);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("access");
        return;
      }
    }
  };

  const handleSendMessage = () => {
    if (
      socket &&
      socket.readyState === WebSocket.OPEN &&
      message.trim() !== ""
    ) {
      socket.send(
        JSON.stringify({
          message: message,
          current_user_id: user.user.id,
          from_user: true,
          receiver: selectedUser.id,
        })
      );

      setMessage("");
    }
  };

  return (
    <>
      {selectedUser ? (
        <Flex direction="column" h="100vh" w="full">
          <Box w="full">
            <Flex
              bg="#f0f2f5"
              justify="space-between"
              py="2"
              px="4"
              borderRight="1px solid #f2f2f2"
              color="#54656f"
              ml={2}
            >
              <Avatar
                boxSize="40px"
                name="Clara Fiona"
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwZmVtYWxlJTIwaGVhZHNob3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
              />
              <Text>{selectedUser.name}</Text>
            </Flex>
          </Box>
          <Flex flex="1" overflowY="auto" p={5} flexDirection="column">
            {userChatHistory.map((chat, index) => (
              <Box
                key={index}
                maxWidth="100%"
                bg="gray.500"
                color={chat.user === user.user.id ? "white" : "black"}
                borderRadius={
                  chat.user === user.user.id
                    ? "18px 18px 0px 18px"
                    : "18px 18px 18px 0px"
                }
                p="2"
                mb={3}
                alignSelf={
                  chat.user === user.user.id ? "flex-end" : "flex-start"
                }
              >
                {chat.message}
              </Box>
            ))}
            {chatMessages.map((chat, index) => (
              <Box
                key={index}
                maxWidth="100%"
                bg="gray.500"
                color={
                  chat.current_user_id === user.user.id ? "white" : "black"
                }
                borderRadius={
                  chat.current_user_id === user.user.id
                    ? "18px 18px 0px 18px"
                    : "18px 18px 18px 0px"
                }
                p="3"
                alignSelf={
                  chat.current_user_id === user.user.id
                    ? "flex-end"
                    : "flex-start"
                }
              >
                {chat.message}
              </Box>
            ))}
          </Flex>

          <Box position="fixed" bottom="0" left="30%" right="0" p="4">
            <InputGroup>
              <Input
                placeholder={"Enter message"}
                value={message}
                onChange={handleInputChange}
              />
              <InputRightElement>
                <IconButton
                  colorScheme="teal"
                  aria-label="Send message"
                  icon={<FiSend />}
                  onClick={handleSendMessage}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
      ) : (
        <>
          <Center bg="#f0f2f5" position="relative" w="70%">
            <Box pt="8">
              <Heading fontWeight="light">ADZAP</Heading>
              <Text fontSize="sm" mt="4">
                Chat with the seller and make better negotiations.
                <br />
              </Text>
            </Box>
          </Center>
        </>
      )}
    </>
  );
};
