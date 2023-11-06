import React,{useState} from "react";
import Navbar from "./Navbar";
import {
  Image,
  Flex,
  Text,
  Button,
  Spacer,
  Input,
  FormControl,
} from "@chakra-ui/react";

function Contact() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [number,setNumber]=useState('')
  const [location,setLocation]=useState('')
  const [message,setMessage]=useState('')
  
  return (
    <div>
      <Navbar />
      <Text fontSize="25px" mt="8" textAlign="center">
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
        <form style={{ backgroundColor: "#C6EEFF", marginLeft: "80px", marginTop:'55px',width:'530px'}}>
          <Text fontSize="25px" fontWeight='bold' mt="8" textAlign="center">Write To Us</Text>
          <Flex direction="column" >
            <FormControl width='390px' bgColor='white' alignSelf='center' mt={5}>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormControl width='390px' bgColor='white' alignSelf='center' mt={5}>
              <Input type="text" placeholder="Enter your name" />
            </FormControl>
            <FormControl width='390px' bgColor='white' alignSelf='center' mt={5}>
              <Input type="text" placeholder="Enter your message" />
            </FormControl>
            <Button  width='250px' alignSelf='center' mt={5} type="submit" colorScheme="blue">
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </div>
  );
}

export default Contact;
