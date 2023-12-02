import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Services/api";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  chakra,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../Redux/userActions";

export default function Payment() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState([]);
  const userId = user.user.id;

  useEffect(() => {
    const values = location.search;
    fetchPlans();
    if (window.location.href.includes("?success=true")) {
      try {
        dispatch(fetchUser(userId));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  }, [location.search]);

  const handlePayment = async (planId) => {
    try {
      setLoading(true);
      const response = await api.post(
        `${
          import.meta.env.VITE_APP_BASE_URL
        }payment/create-checkout-session/${planId}`
      );
      if (response.data && response.data.redirect_url) {
        const redirectUrl = response.data.redirect_url;
        window.location.href = redirectUrl;
      } else {
        Swal.fire({
          title: "Unable To Initiate Payment",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Unable To Purchase Now! Please Try Later",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/`
      );
      setPlan(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="6xl" mt={10} p={{ base: 5, md: 10 }}>
        {loading && (
          <Flex
            justify="center"
            align="center"
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="rgba(255, 255, 255, 0.8)"
            zIndex={999}
          >
            <Spinner size="xl" />
          </Flex>
        )}

        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
          Everything your app needs and more
        </chakra.h3>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} mb={4}>
          {plan.map((item) => (
            <Box
              key={item.id}
              bg={useColorModeValue("gray.100", "gray.700")}
              p={6}
              rounded="lg"
              textAlign="center"
              pos="relative"
            >
              <Flex
                p={2}
                w="max-content"
                color="white"
                bgGradient="linear(to-br, #228be6, #15aabf)"
                rounded="md"
                marginInline="auto"
                pos="absolute"
                left={0}
                right={0}
                top="-1.5rem"
                boxShadow="lg"
              >
                <svg
                  width={36}
                  height={36}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
              </Flex>

              <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
                {item.title}
              </chakra.h3>
              <Text fontSize="md" mt={4}>
                {item.description}
              </Text>

              <Text
                color={"purple"}
                fontWeight={"bold"}
                fontFamily="monospace"
                fontSize="30px"
                mt={4}
              >
                Offer Price: {item.price}
              </Text>
              <Text
                fontSize="20px"
                style={{ textDecoration: "line-through" }}
                mt={4}
              >
                MRP: {item.mrp}
              </Text>
              <Text fontSize="30px" mt={4}>
                Coins: {item.coins}
              </Text>
              <Button
                mt={5}
                color={"white"}
                bgGradient="linear(to-br, #228be6, #15aabf)"
                onClick={() => handlePayment(item.id)}
              >
                Buy Now
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
