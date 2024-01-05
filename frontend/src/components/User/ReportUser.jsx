import React from "react";
import {
  Image,
  Flex,
  Text,
  Button,
  Box,
  Stack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { useState } from "react";

const ReportUser = (id) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState();
  const handleSubmit = async () => {
    try {
      const reportedUserId = id.id;
      const userId = user.user.id;
      console.log(reportedUserId, userId, reason);
      const response = await api.post(
        `${import.meta.env.VITE_APP_BASE_URL}admin/api/reportuser/`,
        {
          user: userId,
          reportedUser: reportedUserId,
          reason: reason,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Report submitted successfully!",
        showConfirmButton: false,
        timer: 1800,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button color={"white"} bgColor={"red"} w={40} onClick={onOpen}>
        Report User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Report User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <>
              <FormControl mt={4}>
                <FormLabel>Reason</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Reason for reporting"
                  onChange={(e) => setReason(e.target.value)}
                />
                <br />
                <br />
                <li>After verification user will be suspended.</li>
              </FormControl>
            </>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReportUser;
