import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import ResetPassword from "./ResetPassword";
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
import { Spinner } from "@chakra-ui/react";
import EditProfile from "./EditProfile";
import Footer from "./Footer";
function Profile() {
  const user = useSelector((state) => state.user);
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post-list-userbased/${
          user.user.id
        }/`
      );
      if (Array.isArray(response.data)) {
        setProductsList(response.data);
      } else {
        console.error("Invalid API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
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
              src={
                user.user.profile_pic ||
                "https://avatars2.githubusercontent.com/u/37842853?v=4"
              }
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

            <EditProfile />
            <ResetPassword userId={user.user.id} />
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
      <Footer />
    </>
  );
}

export default Profile;

const InitialFocus = ({ id, onClose }) => {
  const { isOpen, onOpen } = useDisclosure();
  const users = useSelector((state) => state.user);
  const postId = id;
  useEffect(() => {
    fetchData();
    fetchCategory();
    onOpen();
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${id}/`
      );
      const postData = response.data;
      console.log("Fetched Data:", postData);
      setUser(postData.user);
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
      setMediaType(postData.media_type);
      setImage(postData.image);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [price, setPrice] = useState("");
  const [validity, setValidity] = useState("");
  const [discription, setDiscription] = useState("");
  const [size, setSize] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [image, setImage] = useState("");

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

  const handleEdit = async (postId) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/${postId}/`,
        {
          landmark,
          pincode,
          discription,
          validity,
          size,
          price,
          mediaType,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
      console.error("Error message:", error.message.data);
      console.error("Error response:", error.response);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input value={country} isReadOnly />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>State</FormLabel>
              <Input value={state} isReadOnly />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>City</FormLabel>
              <Input value={city} isReadOnly />
            </FormControl>

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
              {image && (
                <>
                  <Text>Present Image</Text>
                  <Image
                    mt="2"
                    src={image}
                    alt="Selected Image"
                    width="100px"
                    height="100px"
                  />
                </>
              )}
              <br />
              <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => handleEdit(postId)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
