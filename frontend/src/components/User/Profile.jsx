import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import {
  Heading,
  Avatar,
  Box,
  Flex,
  chakra,
  Text,
  Stack,
  Button,
  useColorModeValue,
  VStack,
  Container,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Post from "./Post";

function Profile() {
  const user = useSelector((state) => state.user);
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/`
      );
      setProductsList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    fetchCategory();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const handleDelete = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(
            `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${productId}/`
          );
          Swal.fire({
            icon: "success",
            title: "Post deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchData();
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    });
  };

  const handleEdit = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };
  return (
    <>
      <Navbar />
      <Flex
        direction={{ base: "column", md: "row" }}
        p={8}
        align={{ base: "center", md: "flex-start" }}
      >
        <Box
          mt={10}
          maxW={{ base: "100%", md: "270px" }}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
          mb={{ base: 4, md: 0 }}
          ml={{ base: 0, md: 4 }}
        >
          <Flex justify={"center"} mt={5}>
            <Avatar
              size={"xl"}
              src={"https://avatars2.githubusercontent.com/u/37842853?v=4"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {user.user.name}
              </Heading>
              <Text color={"gray.500"}>{user.user.email}</Text>
              <Text>Post Count</Text>
            </Stack>

            <Button
              w={"full"}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
        {productsList.length === 0 ? (
          <Image
            src="src\images\2953962.jpg"
            alt="img"
            boxSize={{ base: "100%", md: "50%" }}
            objectFit="cover"
            ml={{ base: 0, md: 60 }}
          />
        ) : (
          <Container maxW="7xl" p={{ base: 5, md: 12 }} margin="0 auto">
            <VStack spacing={4}>
              {productsList.map((product) => (
                <Stack
                  key={product.id}
                  spacing={{ base: 0, md: 4 }}
                  direction={{ base: "column", md: "row" }}
                  border="1px solid"
                  borderColor="gray.400"
                  p={2}
                  rounded="md"
                  w={{ base: "100%", md: "2xl" }}
                  overflow="hidden"
                  pos="relative"
                >
                  <Flex ml="0 !important">
                    <Image
                      rounded="md"
                      w={{ base: "100%", md: "18rem" }}
                      h="auto"
                      objectFit="cover"
                      src={product.image}
                      alt="product image"
                    />
                  </Flex>
                  <Stack
                    direction="column"
                    spacing={2}
                    w="100%"
                    mt={{ base: "5px !important", sm: 0 }}
                  >
                    <Flex justify="space-between">
                      <chakra.h3
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                      >
                        {getCategoryNameById(product.category)}
                      </chakra.h3>
                      <chakra.h3
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                      >
                        {product.price}
                      </chakra.h3>
                    </Flex>
                    <Box>
                      <Text fontSize="lg" fontWeight="500">
                        {product.country}
                      </Text>
                    </Box>
                    <Flex alignItems="center" color="gray.500">
                      <Text fontSize={{ base: "sm", sm: "md" }}>
                        {product.state}
                      </Text>

                      <chakra.span mx={2} fontSize={{ base: "sm", sm: "md" }}>
                        |{product.city}
                      </chakra.span>
                    </Flex>
                    <Stack
                      direction={{ base: "column-reverse", sm: "row" }}
                      justify="space-between"
                      alignItems={{ base: "flex-start", sm: "center" }}
                    >
                      <Text fontSize="sm" mt={{ base: 1, sm: 0 }}>
                        {product.landmark}
                      </Text>
                      <Stack direction="row" spacing={1} mb="0 !important">
                        {/* <InitialFocus id={product.id} /> */}
                        <Button onClick={() => handleEdit(product.id)}>
                          Edit
                        </Button>
                        <Button
                          color={"white"}
                          bgColor={"red"}
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </VStack>
          </Container>
        )}
      </Flex>
      {isModalOpen && (
        <InitialFocus
          id={selectedProductId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default Profile;

const InitialFocus = ({ id, onClose }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const fetchData = async () => {
    console.log(id, "log");
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${id}/`
      );
      const postData = response.data;
      // setUser(postData.user);
      setCategory(postData.category);
      setCountry(postData.country);
      setState(postData.state);
      setCity(postData.city);
      setLandmark(postData.landmark);
      setPincode(postData.pincode);
      setDiscription(postData.discription);
      setValidity(postData.validity);
      setSize(postData.size);
      setPrice(postData.price);
      setMediaType(postData.mediaType);
      setImage(postData.image);
      onOpen();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("");
  const [discription, setDiscription] = useState("");
  const [size, setSize] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [image, setImage] = useState("");

  const users = useSelector((state) => state.user);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [isOpen]);

  const fetchCategory = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleEdit = async () => {
  //   // You need to send a PATCH request to update the post with the new data.
  //   try {
  //     const response = await api.patch(
  //       `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${post.id}/`,
  //       {
  //         landmark,
  //         pincode,
  //         discription,
  //         validity,
  //         size,
  //         price,
  //         mediaType,
  //       }
  //     );

  //     console.log("Post updated successfully:", response.data);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error updating post:", error);
  //   }
  // };
  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            {/* <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select country"
                onChange={(e) => handleCountryChange(e)}
              >
                {countries &&
                  countries.map((cntry) => (
                    <option key={cntry.isoCode} value={cntry.isoCode}>
                      {cntry.name}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>State</FormLabel>
              <Select
                placeholder="Select state"
                onChange={(e) => handleStateChange(e)}
                disabled={enable}
              >
                {states &&
                  states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>City</FormLabel>
              <Select
                placeholder="Select City"
                onChange={(e) => handleCityChange(e)}
                disabled={cityEnable}
              >
                {cities &&
                  cities.map((city) => (
                    <option key={city.name} value={city.isoCode}>
                      {city.name}
                    </option>
                  ))}
              </Select>{" "}
            </FormControl>*/}

            <FormControl mt="4">
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((ctgry) => (
                  <option key={ctgry.id} value={ctgry.id}>
                    {ctgry.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Landmark</FormLabel>
              <Input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="Enter landmark"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Pincode</FormLabel>
              <Input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter pincode"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Enter description"
                onChange={(e) => setDiscription(e.target.value)}
                value={discription}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Validity</FormLabel>
              <Input
                type="text"
                onChange={(e) => setValidity(e.target.value)}
                value={validity}
                placeholder="Enter validity"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Size</FormLabel>
              <Input
                type="text"
                onChange={(e) => setSize(e.target.value)}
                value={size}
                placeholder="Enter size"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Media Type</FormLabel>
              <Input
                type="text"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                placeholder="Enter media type"
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
