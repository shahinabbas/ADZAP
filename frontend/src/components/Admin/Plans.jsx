import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import api from "../../Services/api";
import Swal from "sweetalert2";
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

function Plans() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mrp, setMrp] = useState();
  const [price, setPrice] = useState();
  const [coins, setCoins] = useState();
  const [formError, setFormError] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setPlanEdit(null);
    setTitle("");
    setDescription("");
    setMrp();
    setPrice();
    setCoins();
  };
  const onOpen = () => setIsOpen(true);
  const [plan, setPlan] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [planEdit, setPlanEdit] = useState(null);

  const fetchPlan = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/`
      );
      setPlan(response.data);
      console.log("plannnn", response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const handleSubmit = async () => {
    setFormError([]);

    if (!title || !description || !mrp || !price || !coins) {
      setFormError(["Please fill in all required fields."]);
      setTimeout(() => setFormError([]), 1000);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("mrp", mrp);
    formData.append("price", price);
    formData.append("coins", coins);

    try {
      if (isEditMode) {
        const response = await api.patch(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/${planEdit.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("plan updated successfully");
      } else {
        const response = await api.post(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Plan added successfully");
      }

      onClose();
      fetchPlan();
      setTitle("");
      setDescription("");
      setMrp();
      setPrice();
      setCoins();

      Swal.fire({
        icon: "success",
        title: isEditMode
          ? "Plan updated successfully"
          : "New Plan added successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (planId) => {
    setIsOpen(true);
    setIsEditMode(true);
    const PlanEdit = plan.find((plan) => plan.id === planId);
    setPlanEdit(PlanEdit);
    setTitle(PlanEdit.title);
    setDescription(PlanEdit.description);
    setMrp(PlanEdit.mrp);
    setPrice(PlanEdit.price);
    setCoins(PlanEdit.coins);
    console.log(PlanEdit, "categoryToEdit");
  };

  const handleDelete = async (planId) => {
    Swal.fire({
      title: `Are you sure want to delete the plan with id ${planId} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(
            `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/${planId}/`
          );
          fetchPlan();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <div>
      <AdminNavbar />
      <Text ml={8} mt={5} textAlign="center" fontSize="xl" fontWeight="bold">
        Plan Management
      </Text>
      <Center>
        <Box m={4} w="75%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>MRP</Th>
                <Th>Price</Th>
                <Th>Coins</Th>
                <Th>Actions</Th>
                <Th>
                  <Button bgColor="white" onClick={onOpen}>
                    Add plan
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {plan.map((pln) => (
                <Tr key={pln.id}>
                  <Td>{pln.id}</Td>

                  <Td>{pln.title}</Td>
                  <Td>{pln.description}</Td>
                  <Td>{pln.mrp}</Td>
                  <Td>{pln.price}</Td>
                  <Td>{pln.coins}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(pln.id)}
                      mr={5}
                      bgColor="#33FFD7"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(pln.id)}
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
          {formError.length > 0 && (
            <Box mt={4} color="red.500">
              <ul>
                {formError.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Box>
          )}

          <ModalHeader>Add Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new Plan title"
              />
              <Input
                type="text"
                mt={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              />
              <Input
                type="number"
                mt={5}
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="Enter MRP"
              />
              <Input
                type="number"
                mt={5}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
              />
              <Input
                type="number"
                mt={5}
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                placeholder="Enter Coins count"
              />
            </FormControl>
            <Center>
              <Button
                bgColor={"purple"}
                color={"white"}
                mt={5}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Plans;
