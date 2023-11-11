import React from "react";
import { Box, SimpleGrid, Text, Center } from "@chakra-ui/react";

function Category() {
  // Sample categories data
  const categories = [
    {title:"Category 1" ,src:''},
    {title:"Category 1" ,src:''},
    {title:"Category 1" ,src:''},
    {title:"Category 1" ,src:''},
    {title:"Category 1" ,src:''},
    {title:"Category 1" ,src:''},
    
  ];

  return (
    <Center h="30vh">
      <div>
      <Text textAlign="center" fontSize="4xl" fontWeight="bold" mt="4">
      Explore More Categories
      </Text>
        <SimpleGrid columns={7} spacing={9} mt={7} ml={9}> 
          {categories.map((category, index) => (
            <Box
              key={index}
              bg="#BBE7ED"
              height="100px"
              width="130px"  
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              fontWeight="bold"
              color="white"
            >
              {category.title}
            </Box>
          ))}
        </SimpleGrid>
      </div>
    </Center>
  );
}

export default Category;
