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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FilterIcon, SearchIcon } from "../../../images/icons";
import { FiSend } from "react-icons/fi";

export const RightPanel = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(()=>{
    const socket= new WebSocket(
      `ws://${window.location.host}/ws/${selectedUser.id}/`
    ) 
  })
  // useEffect(() => {
  //   const socket = new WebSocket(
  //     `ws://${window.location.host}/ws/${selectedUser.id}/`
  //   );

    // socket.onopen = () => {
    //   console.log("WebSocket connection opened");
    // };

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setMessages((prevMessages) => [...prevMessages, data]);
    // };

    // setWs(socket);

    // return () => {
    //   socket.close();
    // };
  // }, [selectedUser.id]); 

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (ws && message.trim() !== "") {
      ws.send(JSON.stringify({ message, username: "user" }));
      setMessage("");
    }
  };

  return (
    <Flex
      direction="column"
      textAlign="center"
      color="#41525d"
      align={selectedUser ? "center" : "center"}
    >
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
          <Text>User</Text>
        </Flex>
      </Box>

      {selectedUser ? (
        <Box>
          <Heading fontWeight="light">{selectedUser.name}</Heading>
          <Box
            w="auto"
            maxW="700px"
            bg="gray.500"
            color="white"
            borderRadius="18px 18px 18px 0px"
            p="3"
            margin={10}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.{" "}
          </Box>
          {messages.map((msg, index) => (
            <Box
              mt={index === 0 ? 5 : 2}
              key={index}
              w="auto"
              maxW="70%" // Adjust this value as needed
              ml="auto" // This will align the box to the right end
              bg="gray.500"
              color="white"
              borderRadius="18px 18px 0px 18px"
              p="3"
              margin={2}
            >
              {msg.text}
            </Box>
          ))}

          <Box position="fixed" bottom="0" left="30%" right="50" p="4">
            <Input
              placeholder={"Enter message"}
              value={message}
              onChange={handleInputChange}
            />
            <IconButton
              ml="2"
              colorScheme="teal"
              aria-label="Send message"
              icon={<FiSend />}
              onClick={handleSendMessage}
            />
          </Box>
        </Box>
      ) : (
        <Center
          bg="#f0f2f5"
          borderBottom="6px solid #43c960"
          position="relative"
          w="70%"
        >
          <Box pt="8">
            <Heading fontWeight="light">ADZAP</Heading>
            <Text fontSize="sm" mt="4">
              Chat with the seller and make better negotiations.
              <br />
            </Text>
          </Box>
        </Center>
      )}

      <AbsoluteCenter axis="horizontal" bottom="10" flex="1" mt="10">
        <HStack justifyItems="baseline" color="#8696a0"></HStack>
      </AbsoluteCenter>
    </Flex>
  );
};
