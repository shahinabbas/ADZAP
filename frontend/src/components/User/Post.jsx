import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Text,
  Center,
} from "@chakra-ui/react";
function Post() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <Text textAlign="center" fontSize="30px" fontWeight="bold">
        Post Your AD
      </Text>
      <Container maxW="container.md" border="1px" mt={5}>
        <Box mt="4">
          <form>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select placeholder="Select country">
                <option value="country1">Country 1</option>
                <option value="country2">Country 2</option>
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>State</FormLabel>
              <Select placeholder="Select state">
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>District</FormLabel>
              <Input type="text" placeholder="Enter district" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Landmark</FormLabel>
              <Input type="text" placeholder="Enter landmark" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Pincode</FormLabel>
              <Input type="text" placeholder="Enter pincode" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea placeholder="Enter description" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Validity</FormLabel>
              <Input type="text" placeholder="Enter validity" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Size</FormLabel>
              <Input type="text" placeholder="Enter size" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Price</FormLabel>
              <Input type="text" placeholder="Enter price" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Media Type</FormLabel>
              <Input type="text" placeholder="Enter media type" />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <Input type="file" accept="image/*" />
            </FormControl>
            <Center mt="4">
              <Button w="220px" mb={5} colorScheme="blue" type="submit">
                Post Now
              </Button>
            </Center>
          </form>
        </Box>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Post;
