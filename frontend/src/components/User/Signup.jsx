import React, { useState, useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Flex,
  Image,
  Text,
  Link,
  Center,
  Box,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const onClose = () => setIsOpen(false);
  const onClose = () => {
    setIsOpen(false);
    navigate("/");
  };
  const onOpen = () => setIsOpen(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [contact, setContact] = useState("");
  const [formError, setFormError] = useState([]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/signup") {
      onOpen();
    }
  }, []);

  const handleSubmit = async () => {
    setFormError([]);
    const formData = {
      name: name,
      email: email,
      password: password,
      contact_number: contact,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}accounts/api/register/`,
        formData
      );
      console.log("User registered successfully.");
      onClose();
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        console.log("Backend error:", errorMessage);

        setFormError([errorMessage]);
      } else {
        console.error("Unexpected error occurred:", error);
        console.log("Full error response from backend:", error.response.data);

        setFormError([error.response.data]);
      }
    }
  };

  return (
    <Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", lg: "2xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <Flex>
            <Flex direction="column" p={5} bg="#848CEF" w="100%">
              <ModalHeader fontSize="2xl" textAlign="center" color="white">
                Signup
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody color="white">
                <FormControl>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <FormControl mt={5}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <FormControl mt={5}>
                  <Input
                    type="Phone"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter your Contact Number"
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <FormControl mt={5}>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    bg="white"
                    color="black"
                  />
                </FormControl>
                <FormControl mt={5}>
                  <Input
                    type="password"
                    value={cnfpassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                    placeholder="Confirm password"
                    bg="white"
                    color="black"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button w={"full"} bg="#BACEF5" onClick={handleSubmit}>
                  Signup
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
                style={{
                  marginLeft: "80px",
                  fontSize: "10px",
                  fontFamily: "cursive",
                }}
              >
                Already have an account?
                <Link onClick={() => navigate("/login")}>Login</Link>
              </Text>
            </Flex>
            <Flex
              direction={{ base: "column", lg: "row" }}
              p={5}
              bg="#848CEF"
              w="100%"
            >
              <Image
                src="src\images\signup.jpg"
                alt="Login Image"
                boxSize="50%"
                objectFit="cover"
                marginTop="89"
              />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Signup;
