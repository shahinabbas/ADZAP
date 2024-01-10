import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

import api from "../../services/api";
import { useSelector } from "react-redux";

const ReportUser = ({ id }) => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleSubmit = async () => {
    try {
      const reportedUserId = id;
      const userId = user.user.id;

      const formData = new FormData();
      formData.append("user", userId);
      formData.append("reportedUser", reportedUserId);
      formData.append("reason", reason);

      const response = await api.post(
        `${import.meta.env.VITE_APP_BASE_URL}admin/api/reportuser/`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Report submitted successfully!",
        showConfirmButton: false,
        timer: 1800,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button color="white" bgColor="red" w={40} onClick={onOpen}>
        Report User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Reason</FormLabel>
              <Input
                type="text"
                placeholder="Enter Reason for reporting"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <br />
              <br />
              <p>After verification, the user will be suspended.</p>
            </FormControl>
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
