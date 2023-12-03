import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../Redux/userActions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/login") {
      onOpen();
    }
  }, []);

  const onClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const onOpen = () => setIsOpen(true);

  const handleSubmit = async () => {
    const formData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}accounts/api/login/`,
        formData
      );
      const userId = response.data.user.id;
      dispatch(fetchUser(userId));
      console.log("User login success:", response.data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("User login failed from Login modal");
      setTimeout(() => {
        setError("");
      }, 18000);
    }
  };

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", lg: "2xl" }}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            direction={{ base: "column", lg: "row" }}
            display={{ base: "block", lg: "flex" }}
            flexWrap="wrap"
          >
            <Image
              src="src\images\login.jpg"
              alt="Login Image"
              mt={{ base: 0, lg: 100 }}
              boxSize={{ base: "100%", lg: "50%" }}
              objectFit="cover"
            />
            <Flex
              direction="column"
              p={5}
              bg="#848CEF"
              w={{ base: "100%", lg: "50%" }}
            >
              <ModalHeader fontSize="2xl" textAlign="center" color="white">
                Login
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody color="white">
                {error && (
                  <Text color="white" mt={2} textAlign="center">
                    {error}
                  </Text>
                )}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <FormControl mt={5}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    bg="white"
                    color="black"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  w={{ base: "100%", lg: "100%" }}
                  mt={{ base: 5, lg: 0 }}
                  bg="#BACEF5"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </ModalFooter>
              <Center>
                <Text color={"white"}>OR</Text>
              </Center>

              <Center p={2}>
                <Button
                  w={{ base: "100%", lg: "100%" }}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Center>
              <Text
                onClick={() => navigate("/signup")}
                mt={{ base: 3, lg: 0 }}
                textAlign={{ base: "center", lg: "left" }}
                fontSize="10px"
                fontFamily="cursive"
              >
                Not a user? Signup
              </Text>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;
