import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useColorModeValue,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../Services/api";
import Swal from "sweetalert2";

const ResetPassword = ({ userId }) => {
  const [disable, setDisable] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleValidation = async () => {
    try {
      const res = await api.put(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }admins/api/reset-password/${userId}/`,
        {
          current_password: inputValue,
        }
      );
      if (res.data && res.data.success) {
        setDisable(false);
        console.log("okokokokok");
      } else {
        console.log("Password update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    if (inputValue1 === inputValue2) {
      try {
        const response = await api.put(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }admins/api/reset-password/${userId}/`,
          {
            current_password: inputValue,
            new_password: inputValue1,
          }
        );
        console.log(response, "Password changed successfully");
        Swal.fire({
          icon: "success",
          title: "Password changed successfully!",
          showConfirmButton: false,
          timer: 1800,
        });
        onClose();
      } catch (error) {
        console.log("Error changing password", error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div>
      <Button
        w={"full"}
        mt={3}
        bg={useColorModeValue("#151f21", "gray.900")}
        color={"white"}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        onClick={onOpen}
      >
        Reset Password
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {disable ? (
              <Box maxW="md" m="auto" mt={2}>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    placeholder="Enter Current password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="2.5rem"
                      bgColor={"purple"}
                      color={"white"}
                      size="sm"
                      onClick={handleValidation}
                    >
                      Validate
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            ) : (
              <>
                <FormControl mt={4}>
                  <FormLabel>New password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter new Password"
                    value={inputValue1}
                    onChange={(e) => setInputValue1(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Renter new password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Renter new Password"
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {!disable && (
              <>
                {!passwordsMatch && (
                  <Box color="red.500" fontSize="sm" mb={2}>
                    Passwords do not match. Please try again.
                  </Box>
                )}
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleChangePassword}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResetPassword;
