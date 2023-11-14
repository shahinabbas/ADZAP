import React, { useState } from "react";
import emailjs from 'emailjs-com';
import Navbar from "./Navbar";
import {
  Image,
  Flex,
  Text,
  Button,
  Spacer,
  Input,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import Footer from "./Footer";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");


  // function sendEmail(e) {
  //   e.preventDefault();    

  //   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
  //     .then((result) => {
  //         window.location.reload()  
  //     }, (error) => {
  //         console.log(error.text);
  //     });
  // }

  return (
    <div>
      <Navbar />
      <Text fontSize="35px" fontWeight="bold" mt="8" textAlign="center" marginTop='65px' >
        Are You Looking For More About Us
      </Text>
      <Flex>
        <Image
          src="src\images\contact.jpg"
          alt="Image Alt Text"
          boxSize="500px"
          marginTop="55px"
          marginLeft="200px"
        />
        <form
          style={{
            backgroundColor: "#C6EEFF",
            marginLeft: "80px",
            marginTop: "55px",
            width: "530px",
          }}
        >
          <Text fontSize="25px" fontWeight="bold" mt="8" textAlign="center">
            Write To Us
          </Text>
          <Flex direction="column">
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="390px"
              bgColor="white"
              alignSelf="center"
              mt={5}
            >
              <Input type="text" placeholder="Enter your Name" />
            </FormControl>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              width="390px"
              bgColor="white"
              alignSelf="center"
              mt={5}
            >
              <Input type="email" placeholder="Enter your Email id" />
            </FormControl>
            <FormControl
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              width="390px"
              bgColor="white"
              alignSelf="center"
              mt={5}
            >
              <Input type="text" placeholder="Enter your Contact number" />
            </FormControl>
            <FormControl
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              width="390px"
              bgColor="white"
              alignSelf="center"
              mt={5}
            >
              <Input type="text" placeholder="Enter your Location" />
            </FormControl>
            <FormControl
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              width="390px"
              bgColor="white"
              alignSelf="center"
              mt={5}
            >
              <Textarea placeholder="Enter your message" />
            </FormControl>
            <Button
              width="250px"
              alignSelf="center"
              mt={5}
              type="submit"
              colorScheme="blue"
            >
              Send Message
            </Button>
          </Flex>
        </form>
      </Flex>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Contact;
