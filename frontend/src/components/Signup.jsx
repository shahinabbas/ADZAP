import React, { useState } from "react";
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
  Spacer,
  Text,
} from "@chakra-ui/react";

function Signup() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    onClose();
  };

  return (
    <div>
      <Button onClick={onOpen}>Signup</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
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
                    placeholder="Enter Confirm password"
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
                  Signup
                </Button>
              </ModalFooter>
              <Text
                style={{
                  marginLeft: "80px",
                  fontSize: "10px",
                  fontFamily: "cursive",
                }}
              >
                Already have an account? Login{" "}
              </Text>
            </Flex>
            <Image
              src="src\images\signup.jpg"
              alt="Login Image"
              boxSize="50%"
              objectFit="cover"
              marginTop="75"
            />
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Signup;
