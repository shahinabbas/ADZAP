import React from "react";
import { LeftPanel } from "./Chats/left-panel";
import { RightPanel } from "./Chats/right-panel";
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
function Chat() {
  return (
    <div>
        <Navbar />
      <Flex h="100vh" mt='65px'>
        <LeftPanel />
        <RightPanel />
      </Flex>
    </div>
  );
}

export default Chat;
