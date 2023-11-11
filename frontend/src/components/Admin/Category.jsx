import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Center,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalHeader,
} from "@chakra-ui/react";

const Category = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [formError, SetFormError] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const [category, setCategory] = useState([]);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/admins/api/category-list/"
        );
        setCategory(response.data);
      } catch (error) {
        console.log(response.error.data);
      }
    };
    fetchCategory();
  }, []);
  
  const handleSubmit = async () => {
    SetFormError([]);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/admins/api/category/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("category added successfully");
      onClose();
    } catch (error) {
      SetFormError([error.response.data]);
      console.log(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
    }
  };

  const handleEdit = (categoryId) => {
    console.log(`Edit category with ID: ${categoryId}`);
  };

  const handleDelete = (userId) => {
    console.log(`Delete category with ID: ${categoryId}`);
  };

  return (
    <div>
      <AdminNavbar />
      <Text ml={8} mt={5} textAlign="center" fontSize="xl" fontWeight="bold">
        Category Management
      </Text>
      <Center>
        <Box m={4} w="75%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Icon</Th>
                <Th>Category</Th>
                <Th>Actions</Th>
                <Th>
                  <Button bgColor="white" onClick={onOpen}>
                    Add category
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {category.map((catg) => (
                <Tr key={catg.id}>
                  <Td>{catg.id}</Td>
                  <Td>
                    <Image src={catg.icon} alt={catg.name} boxSize="50px" />
                  </Td>
                  <Td>{catg.name}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(catg.id)}
                      mr={5}
                      bgColor="#33FFD7"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(catg.id)}
                      color="white"
                      bgColor="#FF3336"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new Category"
              />
            </FormControl>
            <FormControl mt={4}>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
            <br />
            <Center>
              <Button onClick={handleSubmit}>Submit</Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Category;
