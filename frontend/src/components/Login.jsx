import React, { useState } from 'react';
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
  Text
} from "@chakra-ui/react";

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    onClose();
  };

  return (
    <div>
      <Button onClick={onOpen}>Login</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" >
        <ModalOverlay />
        <ModalContent>
          <Flex>
            <Image
              src="src\images\login.jpg"
              alt="Login Image"
              boxSize="50%"
              objectFit="cover"
            />
            <Flex direction="column" p={5} bg='#848CEF' w='100%'>
              <ModalHeader fontSize='2xl' textAlign='center' color='white'>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody color='white'>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    bg='white'
                    color='black'
                  />
                </FormControl>
                <FormControl mt={5}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    bg='white'
                    color='black'
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button w='130px' style={{marginRight:'60px'}} bg="#BACEF5" onClick={handleSubmit}>
                  Login
                </Button>
              </ModalFooter>
              <Text style={{marginLeft:'100px', fontSize:'10px', fontFamily:'cursive'}}>Not a user? Signup</Text>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Login;
