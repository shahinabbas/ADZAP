import React, { useState } from "react";
import { LeftPanel } from "./Chats/left-panel";
import { RightPanel } from "./Chats/right-panel";
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <Navbar />
      <Flex h="100vh" mt="65px">
        <LeftPanel onItemClick={handleUserClick} />
        <RightPanel selectedUser={selectedUser} />
      </Flex>
    </div>
  );
}

export default Chat;
