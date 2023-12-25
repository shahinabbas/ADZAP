import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../Redux/userActions";
import { FaBoxOpen } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { setNotificationCount } from "../../Redux/userActions";
import { NotificationData } from "../../Redux/userActions";
import api from "../../services/api";
import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  Spacer,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
  chakra,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const IconButton = ({ children }) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: "#f6f6f6" }}
    >
      {children}
    </Button>
  );
};

export const setupNotification = (dispatch, user) => {
  const ws = new WebSocket(
    `${import.meta.env.VITE_APP_WS_BASE_URL}notification/${user.user.id}/`
  );
  console.log("WebSocket connection established");

  ws.onopen = (e) => {
    console.log("notification connected");
  };
  ws.onmessage = function (e) {
    const data = JSON.parse(e.data);
    dispatch(setNotificationCount(data.count));
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };
  ws.onerror = () => {
    console.log("WebSocket connection error");
  };
  return ws;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [notificationHistory, setNotificationHistory] = useState();

  useEffect(() => {
    dispatch(fetchUser());
    if (user && user.user) {
      setupNotification(dispatch, user);
      dispatch(NotificationData(user.user.id));
    }
  }, [dispatch]);
  const navigate = useNavigate();
  const handleCreatePostClick = () => {
    if (user && user.coins >= 10) {
      navigate("/post");
    } else {
      navigate("/payment");
    }
  };

  const fetchNotificationChat = async () => {
    try {
      const lastFiveNotificationData = user.notificationdata.slice(0, 5);
      const chatDataPromises = user.notificationdata.map(
        async (notification) => {
          const chatId = notification.chat;
          const response = await api.get(
            `${import.meta.env.VITE_APP_BASE_URL}chat/api/history/${chatId}/`
          );
          return response.data;
        }
      );

      const chatData = await Promise.all(chatDataPromises);
      setNotificationHistory(chatData);
    } catch (error) {
      console.log("fetchNotificationChat error", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg={useColorModeValue("gray.200", "gray.700")}
      width="100%"
      zIndex="1"
    >
      <Container maxW="1280px" px={4} mx="auto">
        <HStack spacing={4}>
          <Text
            fontSize="30px"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            ADZAP
          </Text>
          <Spacer />
          <HStack spacing={3}>
            <Button
              color="#fff"
              rounded="md"
              bg="#3b49df"
              _hover={{ bg: "#323ebe" }}
              onClick={handleCreatePostClick}
            >
              Create a post
            </Button>
            <FaBoxOpen
              size={26}
              onClick={() => navigate("/box")}
              cursor={"pointer"}
            />
            <Box mr={2}>
              <chakra.span
                pos="relative"
                display="inline-block"
                onClick={() => navigate("/payment")}
              >
                <TbCoinRupeeFilled size={26} />
                <chakra.span
                  pos="absolute"
                  top="-1px"
                  right="-1px"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color="red.100"
                  transform="translate(50%,-50%)"
                  bg="red.600"
                  rounded="full"
                >
                  {user && user.user && user.user.id ? user.user.coins : 0}
                </chakra.span>
              </chakra.span>
            </Box>
            <Menu isLazy>
              {/* <MenuButton onClick={()=>{fetchNotificationChat()}}> */}
              <MenuButton onClick={() => navigate("/chat")}>
                <chakra.span
                  pos="relative"
                  display="inline-block"
                  onClick={() => navigate("/payment")}
                >
                  <FaBell size={22} />
                  <chakra.span
                    pos="absolute"
                    top="-1px"
                    right="-1px"
                    px={2}
                    py={1}
                    fontSize="xs"
                    fontWeight="bold"
                    lineHeight="none"
                    color="red.100"
                    transform="translate(50%, -50%)"
                    bg="red.600"
                    rounded="full"
                  >
                    {user.notificationCount}
                  </chakra.span>
                </chakra.span>
              </MenuButton>
              {/* <MenuList zIndex={5}>
                {notificationHistory &&
                  notificationHistory.map((notification) => (
                    <MenuItem key={notification.id}>
                      <Text fontWeight="500">{notification.message}</Text>
                    </MenuItem>
                  ))}
              </MenuList> */}
            </Menu>

            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size="sm"
                  src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
                />
              </MenuButton>

              {user && user.user && user.user.id ? (
                <Text>Welcome, {user.user.name}!</Text>
              ) : (
                <button onClick={() => navigate("/login")}>Login</button>
              )}

              <MenuList zIndex={5}>
                <MenuItem>
                  <Text>
                    {user && user.user && user.user.id ? (
                      <Text onClick={() => navigate("/profile")}>
                        {user.user.name}
                      </Text>
                    ) : (
                      <Text onClick={() => navigate("/login")}>Login</Text>
                    )}
                  </Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Dashboard</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500">Create Post</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500" onClick={() => navigate("/login")}>
                    Login
                  </Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500" onClick={handleLogout}>
                    Log Out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
