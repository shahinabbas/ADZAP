import React, { useEffect, useState } from "react";
import { LeftPanel } from "./Chats/left-panel";
import { RightPanel } from "./Chats/right-panel";
import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import { setSelectedChatUser } from "../../Redux/userActions";
import { useDispatch } from "react-redux";
import { fetchCount } from "../../Redux/userActions";
function Chat() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCount());
  //   return () => {
  //     dispatch(setSelectedChatUser(null));
  //   };
  // }, [dispatch]);

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
