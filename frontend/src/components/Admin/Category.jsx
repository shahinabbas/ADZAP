import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import api from "../../Services/api";
import Swal from "sweetalert2";
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
  const onClose = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setEditingCategory(null);
    setName("");
    setIcon(null);
  };
  const onOpen = () => setIsOpen(true);
  const [category, setCategory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`
      );
      setCategory(response.data);
    } catch (error) {
      console.log(response.error.data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async () => {
    SetFormError([]);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("icon", icon);

    try {
      if (isEditMode) {
        if (name === editingCategory.name && icon === null) {
          // No changes, close the modal
          onClose();
          Swal.fire({
            icon: "No Change",
            title: "No changes",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
        if (icon === null) {
          const response = await api.patch(
            `${import.meta.env.VITE_APP_BASE_URL}admins/api/category/${
              editingCategory.id
            }/`,
            { name }
          );
          console.log("Category name updated successfully");
        } else {
          const response = await api.put(
            `${import.meta.env.VITE_APP_BASE_URL}admins/api/category/${
              editingCategory.id
            }/`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Category updated successfully");
        }
      } else {
        const response = await api.post(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/category/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Category added successfully");
      }

      onClose();
      fetchCategory();
      setName("");
      setIcon(null);

      Swal.fire({
        icon: "success",
        title: isEditMode
          ? "Category updated successfully"
          : "New category added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
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
    setIsOpen(true);
    setIsEditMode(true);

    const categoryToEdit = category.find((catg) => catg.id === categoryId);
    setEditingCategory(categoryToEdit);
    setName(categoryToEdit.name);
    setIcon(categoryToEdit.icon ? null : categoryToEdit.icon);
    console.log(categoryToEdit, "categoryToEdit");
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
                  <Button bgColor="purple" color={'white'} onClick={onOpen}>
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
            {isEditMode && editingCategory && (
              <Center>
                <Image
                  src={editingCategory.icon}
                  alt={editingCategory.name}
                  boxSize="50px"
                />
                {console.log(editingCategory.icon)}
              </Center>
            )}

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
