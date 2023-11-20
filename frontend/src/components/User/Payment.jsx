import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const Payment = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };
  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className="form-input"
          id="email"
          name="name"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="form-row">
        <label for="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit Payment
      </button>
    </form>
  );
};
export default Payment;

// import React, { useState, useEffect } from "react";
// import { API_URL } from "../../config";
// import { loadStripe } from "@stripe/stripe-js";
// import api from "../../Services/api";
// import {
//   Container,
//   Box,
//   chakra,
//   Text,
//   SimpleGrid,
//   Flex,
//   Link,
//   useColorModeValue,
//   Button,
// } from "@chakra-ui/react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Stripe from "stripe";

// function Payment() {
//   const features = [
//     {
//       title: "Super 100",
//       heading2: "You get 110 Token",
//       priceId: 100,
//       content:
//         "Choose from Stripe, Paddle, Braintree, or PayPal to launch your product quickly.",
//       icon: (
//         <svg
//           width={36}
//           height={36}
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//           ></path>
//         </svg>
//       ),
//     },
//   ];

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       console.log("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       console.log(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, []);

//   const handlePaymentClick = async (Id) => {
//     try {
//       const response = await api.post(`${import.meta.env.VITE_APP_BASE_URL}payment/create-checkout-session/${Id}`);
//       if (res.status === 200) {
//         console.log('khssssssssss');
//         window.location.replace(res.data.redirect_url);
//       }
//     } catch (error) {
//       console.log();("Unable To Purchase Now ! Please Try Later");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Container maxW="6xl" p={{ base: 5, md: 10 }} mt={10}>
//         <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
//           Premium
//         </chakra.h3>
//         <SimpleGrid
//           columns={{ base: 1, sm: 2, md: 3 }}
//           placeItems="center"
//           spacing={10}
//           mb={4}
//         >
//           {features.map((feature, index) => (
//             <Box
//               key={index}
//               bg={useColorModeValue("gray.100", "gray.700")}
//               p={6}
//               rounded="lg"
//               textAlign="center"
//               pos="relative"
//             >
//               <Flex
//                 p={2}
//                 w="max-content"
//                 color="white"
//                 bgGradient="linear(to-br, #228be6, #15aabf)"
//                 rounded="md"
//                 marginInline="auto"
//                 pos="absolute"
//                 left={0}
//                 right={0}
//                 top="-1.5rem"
//                 boxShadow="lg"
//               >
//                 {feature.icon}
//               </Flex>
//               <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
//                 {feature.title}
//               </chakra.h3>
//               <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={3}>
//                 {feature.heading2}
//               </chakra.h3>
//               <Text fontSize="md" mt={4}>
//                 {feature.content}
//               </Text>
//               <Button
//                 bgColor={"purple"}
//                 color={"white"}
//                 mt={5}
//                 onClick={() => {
//                   handlePaymentClick(feature.priceId);
//                 }}
//               >
//                 Click here
//               </Button>
//             </Box>
//           ))}
//         </SimpleGrid>
//       </Container>
//       <Footer />
//     </>
//   );
// }

// export default Payment;

// // export const  AxiosCreateCheckoutSession = (id) => {
// //   return api.post(`/payment/create-checkout-session/${id}`);
// // };

// // const features = [
// //   {
// //     heading: "100 INR",
// //     heading2: "You get 110 Token",
// //     priceId: 100,
// //     content:
// //       "Choose from Stripe, Paddle, Braintree, or PayPal to launch your product quickly.",
// //     icon: (
// //       <svg
// //         width={36}
// //         height={36}
// //         xmlns="http://www.w3.org/2000/svg"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //       >
// //         <path
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           strokeWidth="2"
// //           d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
// //         ></path>
// //       </svg>
// //     ),
// //   },
// //   {
// //     heading: "300 INR",
// //     heading2: "You get 350 Token",
// //     priceId: 300,
// //     content:
// //       "Webhooks are wired up to automatically email customers PDF receipts and invoices.",
// //     icon: (
// //       <svg
// //         width={36}
// //         height={36}
// //         xmlns="http://www.w3.org/2000/svg"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //         color="purple"
// //       >
// //         <path
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           strokeWidth="2"
// //           d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
// //         ></path>
// //       </svg>
// //     ),
// //   },
// //   {
// //     heading: "500 INR",
// //     priceId: 500,
// //     heading2: "You get 600 Token",
// //     content:
// //       "Webhooks are wired up to automatically email customers PDF receipts and invoices.",
// //     icon: (
// //       <svg
// //         width={36}
// //         height={36}
// //         xmlns="http://www.w3.org/2000/svg"
// //         fill="none"
// //         viewBox="0 0 24 24"
// //         stroke="currentColor"
// //       >
// //         <path
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //           strokeWidth="2"
// //           d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
// //         ></path>
// //       </svg>
// //     ),
// //   },
// // ];

// // const Payment = () => {
// //   const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// //   const handlePaymentClick = async (priceId) => {
// //     try {
// //       const stripe = await stripePromise;

// //       const response = await api.post(
// //         `${
// //           import.meta.env.VITE_APP_BASE_URL
// //         }payment/api/create-checkout-session/`,
// //         {
// //           priceId: priceId,
// //         },
// //       );

// //       const sessionId = response.data.sessionId;

// //       // Redirect the user to the Stripe Checkout page
// //       const { error } = await stripe.redirectToCheckout({
// //         sessionId: sessionId,
// //       });

// //       if (error) {
// //         console.error("Error redirecting to Checkout:", error);
// //       }
// //     } catch (err) {
// //       console.error("Error handling payment:", err);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <Container maxW="6xl" p={{ base: 5, md: 10 }} mt={10}>
// //         <chakra.h3 fontSize="4xl" fontWeight="bold" mb={20} textAlign="center">
// //           Premium
// //         </chakra.h3>
// //         <SimpleGrid
// //           columns={{ base: 1, sm: 2, md: 3 }}
// //           placeItems="center"
// //           spacing={10}
// //           mb={4}
// //         >
// //           {features.map((feature, index) => (
// //             <Box
// //               key={index}
// //               bg={useColorModeValue("gray.100", "gray.700")}
// //               p={6}
// //               rounded="lg"
// //               textAlign="center"
// //               pos="relative"
// //             >
// //               <Flex
// //                 p={2}
// //                 w="max-content"
// //                 color="white"
// //                 bgGradient="linear(to-br, #228be6, #15aabf)"
// //                 rounded="md"
// //                 marginInline="auto"
// //                 pos="absolute"
// //                 left={0}
// //                 right={0}
// //                 top="-1.5rem"
// //                 boxShadow="lg"
// //               >
// //                 {feature.icon}
// //               </Flex>
// //               <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={6}>
// //                 {feature.heading}
// //               </chakra.h3>
// //               <chakra.h3 fontWeight="semibold" fontSize="2xl" mt={3}>
// //                 {feature.heading2}
// //               </chakra.h3>
// //               <Text fontSize="md" mt={4}>
// //                 {feature.content}
// //               </Text>
// //               <Button
// //                 bgColor={"purple"}
// //                 color={"white"}
// //                 mt={5}
// //                 onClick={() => {
// //                   handlePaymentClick(feature.priceId);
// //                 }}
// //               >
// //                 Click here
// //               </Button>
// //             </Box>
// //           ))}
// //         </SimpleGrid>
// //       </Container>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Payment;
