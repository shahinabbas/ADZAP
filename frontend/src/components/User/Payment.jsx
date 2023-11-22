import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../Services/api";
import {
  Container,
  Box,
  chakra,
  Text,
  SimpleGrid,
  Flex,
  Link,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function Payment() {
  const [plan, setPlan] = useState([]);
  const location = useLocation();
  const fetchPlans = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/plan/`
      );
      setPlan(response.data);
      console.log(response.data, "planssssssssssssss");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment=(planId)=>{

  }
  useEffect(() => {
    fetchPlans();
    // const query = new URLSearchParams(window.location.search);
    const values = location.search;
    console.log(values);

    // if (query.get("success")) {
    //   console.log("Order placed! You will receive an email confirmation.");
    // }

    // if (query.get("canceled")) {
    //   console.log(
    //     "Order canceled -- continue to shop around and checkout when you're ready."
    //   );
    // }
  }, []);

  return (
    <>
      <section>
        <div className="product">
          <img
            src="src\images\pay.jpg"
            alt="The cover of Stubborn Attachments"
            width="500px"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
        <form
          action="http://127.0.0.1:8000/payment/create-checkout-session"
          method="POST"
        >
          <button type="submit">Checkout</button>
        </form>
      </section>

      <Container maxW="6xl" p={{ base: 5, md: 10 }}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
          Everything your app needs and more
        </chakra.h3>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} mb={4}>
          {plan.map((item) => (
            <Box
              bg={useColorModeValue("gray.100", "gray.700")}
              p={6}
              rounded="lg"
              textAlign="center"
              pos="relative"
            >
              {console.log(item, "5848452595959595899")}
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
                onClick={()=>handlePayment(item.id)}
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
