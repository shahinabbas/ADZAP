import React, { useState } from "react";
import {
  Heading,
  Avatar,
  Box,
  Flex,
  chakra,
  Text,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  Container,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Center,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import api from "../../Services/api";
import { fetchUser } from "../../Redux/userActions";
const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(user.user.image);
  const [selectedImages, setSelectedImages] = useState(user.user.image);
  const [name, setName] = useState(user.user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.user.contact_number);
  const [email, setEmail] = useState(user.user.email);
  const Edit = async () => {
    try {
      if (
        name === user.user.name &&
        phoneNumber === user.user.contact_number &&
        email === user.user.email &&
        selectedImage === user.user.profile_pic
      ) {
        onClose();
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact_number", phoneNumber);
      formData.append("profile_pic", selectedImage);

      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/edit/${user.user.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Profile edited successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch(fetchUser(user.user.id));
      console.log(response.data, "success");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    await Edit();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Button
        w={"full"}
        bg={useColorModeValue("#151f21", "gray.900")}
        color={"white"}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <Box
                mt={10}
                maxW={{ base: "100%", md: "270px" }}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                rounded={"md"}
                overflow={"hidden"}
                mb={{ base: 4, md: 0 }}
                ml={{ base: 0, md: 4 }}
              >
                <Flex justify={"center"} mt={5}>
                  <label htmlFor="profile-image">
                    <Avatar
                      size={"xl"}
                      src={
                        selectedImages ||
                        selectedImage ||
                        user.user.profile_pic ||
                        "https://avatars2.githubusercontent.com/u/37842853?v=4"
                      }
                      css={{
                        border: "2px solid white",
                      }}
                    />
                  </label>
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={"center"} mb={5}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={name}
                        type="text"
                        onChange={handleNameChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        value={email}
                        type="email"
                        onChange={handleEmailChange}
                      />
                    </FormControl>
                  </Stack>
                </Box>
              </Box>
            </Center>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfile;
