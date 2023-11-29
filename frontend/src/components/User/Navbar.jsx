import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../../Redux/userActions";
import { FaBoxOpen } from "react-icons/fa";
import { TbCoinRupeeFilled } from "react-icons/tb";
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
import { useEffect } from "react";

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

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/post");
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
              onClick={handleClick}
            >
              Create a post
            </Button>
            <FaBoxOpen
              size={26}
              onClick={() => navigate("/box")}
              cursor={"pointer"}
            />
            <chakra.span pos="relative" display="inline-block" onClick={()=>navigate('/payment')}>
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

            <IconButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="img"
                aria-labelledby="ap1tc5wqdskeg9i5jtulggx2n8axe0vz"
              >
                <title id="ap1tc5wqdskeg9i5jtulggx2n8axe0vz">
                  Notifications
                </title>
                <path d="M20 17h2v2H2v-2h2v-7a8 8 0 1116 0v7zm-2 0v-7a6 6 0 10-12 0v7h12zm-9 4h6v2H9v-2z"></path>
              </svg>
            </IconButton>
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
                  </Text>{" "}
                </MenuItem>

                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Dashboard</Text>
                </MenuItem>
                <MenuItem>
                  <Text fontWeight="500" onClick={handleClick}>
                    Create Post
                  </Text>
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
