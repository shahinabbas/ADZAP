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
  Stack,
  Icon,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";

import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

const navLinks = [
  { name: "Users", path: "/users" },
  { name: "AdStatus", path: "/status" },
  { name: "Category", path: "/category" },
  { name: "Banner", path: "/banner" },
];

const dropdownLinks = [
  {
    name: "Blog",
    path: "/users",
  },
  {
    name: "Documentation",
    path: "#",
  },
  {
    name: "Logout",
    path: "#",
  },
];

export default function AdminNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} bg={useColorModeValue("grey", "gray.800")}>
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          {/* <Icon as={RiFlashlightFill} h={8} w={8} /> */}
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

              <Menu autoSelect={false} isLazy>
                {({ isOpen, onClose }) => (
                  <>
                    <MenuButton _hover={{ color: "White" }}>
                      <Flex alignItems="center">
                        <Text>Community</Text>
                        <Icon
                          as={BiChevronDown}
                          h={5}
                          w={5}
                          ml={1}
                          transition="all .25s ease-in-out"
                          transform={isOpen ? "rotate(180deg)" : ""}
                        />
                      </Flex>
                    </MenuButton>
                    <MenuList
                      zIndex={5}
                      bg={useColorModeValue(
                        "rgb(255, 255, 255)",
                        "rgb(26, 32, 44)"
                      )}
                      border="none"
                      boxShadow={useColorModeValue(
                        "2px 4px 6px 2px rgba(160, 174, 192, 0.6)",
                        "2px 4px 6px 2px rgba(9, 17, 28, 0.6)"
                      )}
                    >
                      {dropdownLinks.map((link, index) => (
                        <MenuLink
                          key={index}
                          name={link.name}
                          path={link.path}
                          onClose={onClose}
                        />
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            </HStack>
          </HStack>

          {/* <Button colorScheme="blue" size="md" rounded="md" d={{ base: 'none', md: 'block' }}>
          Sign in
        </Button> */}

          {/* <IconButton
          size="md"
          // icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          d={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        /> */}
        </Flex>
      </Box>
    </>
  );
}

// // NavLink Component
// interface NavLinkProps {
//   name: string;
//   path: string;
//   onClose: () => void;
// }

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

// // Dropdown MenuLink Component
// interface MenuLinkProps {
//   name: string;
//   path: string;
//   onClose: () => void;
// }

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
