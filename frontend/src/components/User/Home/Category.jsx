import * as React from "react";
import { Container, Text, SimpleGrid, Box, Image, useSafeLayoutEffect, Center } from "@chakra-ui/react";
import api from "../../../Services/api";
import axios from "axios";

const Category = () => {
const [categories,setCategories]=React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}admins/api/category-list/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
    <br />
      <Text textAlign="center" fontSize="4xl" fontWeight="bold" mt="4">
        Explore the Categories
      </Text>
      {/* <Text textAlign="center" fontSize="2xl" fontWeight="bold">
        our service available.
      </Text> */}
      <Container maxW="7xl" p={{ base: 5, md: 10 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 5 }}
          spacing={5}
          mt={12}
          mb={4}
        >
          {categories.map((data) => (
            <Box
              key={data.id}
              p={5}
              boxShadow="md"
              rounded="md"
              borderWidth={1}
            >
              <Text fontSize="x-large">
                {data.name}
              </Text>
              <Image src={data.icon} alt={`Icon for ${data.name}`} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Category;
