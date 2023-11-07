import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [contact, setContact] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    cnfpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    contact: Yup.string().required("Contact number is required"),
  });
  

  const handleSubmit = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    onClose();
  };

  return (
    <div>
      <Text style={{ cursor: "pointer" }} onClick={onOpen}>
        Signup
      </Text>
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  w="130px"
                  style={{ marginRight: "60px" }}
                  bg="#BACEF5"
                  // onClick={() => {
                  //   validateForm();
                  // }}
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
                Already have an account?
                {/* <Link to="/login">Login</Link>  */}
              </Text>
            </Flex>
            <Image
              src="src\images\signup.jpg"
              alt="Login Image"
              boxSize="50%"
              objectFit="cover"
              marginTop="89"
            />
          </Flex>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Signup;

