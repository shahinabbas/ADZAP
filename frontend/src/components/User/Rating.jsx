import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useDisclosure,
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
  Flex,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import api from "../../services/api";
import { useSelector } from "react-redux";
const Rating = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [message, setMessage] = useState("");

  const handleStarClick = (index) => {
    const rating = index + 1;

    setSelectedRating(rating);

    if (rating === 1) {
      setRatingText("Bad");
    } else if (rating === 2) {
      setRatingText("Average");
    } else if (rating === 3) {
      setRatingText("Good");
    } else if (rating === 4) {
      setRatingText("Like");
    } else if (rating === 5) {
      setRatingText("Excellent");
    }
  };
  const handlesave = async () => {
    try {
      const formData = new FormData();
      formData.append("user", user.user.id);
      formData.append("stars", selectedRating);
      formData.append("message", message);

      const response = await api.post(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/review/`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Review added successfully!",
        showConfirmButton: false,
        timer: 1800,
      });
      onClose();
      setMessage("")
      setSelectedRating(0)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        ml={{ base: 2, md: 290 }}
        onClick={onOpen}
        bgColor={"purple"}
        color={"white"}
      >
        Add yours
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Rating</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <>
              <FormControl mt={4}>
                <FormLabel>Add message</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>

              <Flex alignItems="center" justifyContent="start" mt={5}>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    fillColor={index < selectedRating ? "#EACA4E" : "#e2e8f0"}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </Flex>

              <Box mt={3}>{ratingText}</Box>
            </>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlesave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Rating;

const Star = ({ fillColor, onClick }) => {
  return (
    <svg
      style={{
        width: "1.5rem",
        height: "1.5rem",
        fill: fillColor,
        marginRight: "0.25rem",
        cursor: "pointer",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};
