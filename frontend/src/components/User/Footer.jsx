import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BsDiscord } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate()
  return (
    <Box bg="#4370B4" color="white" p={{ base: 5, md: 8 }} mt={10} marginInline="auto">
      <Stack
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        direction={{ base: "column", md: "row" }}
      >
        <Box maxW="300px">
          <Link href="#" isExternal></Link>
          <Text mt={2} fontSize="25px">
            Adzap
          </Text>
          <br />
          <Text>Email: adzap@gmail.com</Text>
          <Text>Phone: +91 0000000000</Text>
          <Text>Location: Kundanoor, Maradu, Ernakulam</Text>
        </Box>
        <HStack
          spacing={14}
          // d={{ base: "none", sm: "flex" }}
          // justifyContent={{ sm: "space-between", md: "normal" }}
        >
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold" onClick={()=>navigate('/about')}>
              About
            </Text>
            <VStack spacing={2} alignItems="flex-start">
              <CustomLink>Contrinute</CustomLink>
              <CustomLink>Media assets</CustomLink>
              <CustomLink>Changelog</CustomLink>
              <CustomLink>Releases</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Community
            </Text>
            <VStack spacing={2} alignItems="flex-start">
              <CustomLink>Chat on Discord</CustomLink>
              <CustomLink>Follow on Twitter</CustomLink>
              <CustomLink>Follow on Github</CustomLink>
              <CustomLink>Github discussions</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Project
            </Text>
            <VStack spacing={2} alignItems="flex-start">
              <CustomLink>TemplatesKart</CustomLink>
              <CustomLink>Documentation</CustomLink>
              <CustomLink>Github organization</CustomLink>
              <CustomLink>npm organization</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>
      <Divider my={4} />

      <Flex justifyContent="center">
        <Text fontSize="md">
          <Link
            href="https://github.com/shahinabbas"
            textDecoration="underline"
            _hover={{ textDecoration: "underline" }}
            isExternal
          >
            Copyright © 2023-2025 Adzap Company. All rights reserved
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link
      href="#"
      fontSize="sm"
      _hover={{ textDecoration: "underline" }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Footer;
