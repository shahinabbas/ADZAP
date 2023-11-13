import React from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  useDisclosure,
  useColorModeValue,
  MenuDivider,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Redux/userActions";
import { useDispatch } from "react-redux";

const navLinks = [
  { name: "Users", path: "/users" },
  { name: "AdStatus", path: "/status" },
  { name: "Category", path: "/category" },
  { name: "Faq", path: "/faq" },
];

export default function AdminNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/adminlogin");
  };

  // const handleLogout = () => {
  //   localStorage.clear();
  //   dispatch(logoutUser());
  //   navigate("/adminlogin");
  // };

  return (
    <>
      <Box px={4} bg={useColorModeValue("grey", "gray.800")}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <Link href="/admin">
            <Text fontSize="30px" fontWeight="bold" color="white">
              ADZAP
            </Text>
          </Link>
          <HStack spacing={8} alignItems="center">
            <HStack
              as="nav"
              spacing={6}
              d={{ base: "none", md: "flex" }}
              alignItems="center"
            >
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<BiChevronDown />}
                variant="ghost"
              >
                More
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Text onClick={() => navigate("/users")}>User</Text>
                </MenuItem>
                <MenuItem>
                  <Text onClick={() => navigate("/status")}>Ad status</Text>
                </MenuItem>
                <MenuItem>
                  <Text onClick={handleLogout}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

const NavLink = ({ name, path, onClose }) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("white", "blue.200"),
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

const MenuLink = ({ name, path, onClose }) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: "blue.400",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
