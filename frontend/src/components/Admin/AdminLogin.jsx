import React, { useState, useEffect } from "react";
import axios from "axios";
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
  FormLabel,
  Input,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../Redux/userActions";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/adminlogin") {
      onOpen();
    }
  }, []);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const handleSubmit = async () => {
    console.log("Login modal", import.meta.env.VITE_APP_BASE_URL);
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
      localStorage.setItem("access:", response.data.access);
      localStorage.setItem("refresh:", response.data.refresh);
      onClose();
      navigate("/admin");
    } catch (error) {
      console.error("User login failed from admin Login modal");
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <Flex>
            <Image
              src="src\images\login.jpg"
              alt="Login Image"
              boxSize="50%"
              objectFit="cover"
            />
            <Flex direction="column" p={5} bg="#848CEF" w="100%">
              <ModalHeader fontSize="2xl" textAlign="center" color="white">
                Admin Login
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody color="white">
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
                  w="130px"
                  style={{ marginRight: "60px" }}
                  bg="#BACEF5"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </ModalFooter>
              <Text
                style={{
                  marginLeft: "100px",
                  fontSize: "10px",
                  fontFamily: "cursive",
                }}
              >
                Not a user? Signup
              </Text>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminLogin;
