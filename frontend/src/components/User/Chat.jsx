import React, { useEffect, useState } from "react";
import { LeftPanel } from "./Chats/left-panel";
import { RightPanel } from "./Chats/right-panel";
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import { setSelectedChatUser } from "../../Redux/userActions";
import { useDispatch } from "react-redux";

function Chat() {
  const dispatch = useDispatch();
  
  const handleUserClick = (user) => {
    dispatch(setSelectedChatUser(user));
  };

  return (
    <div>
      <Navbar />
      <Flex h="100vh" mt="65px">
        <LeftPanel onItemClick={handleUserClick} />
        <RightPanel />
      </Flex>
    </div>
  );
}

export default Chat;
