import React, { useState } from "react";
import {
  Center,
  Flex,
  Box,
  Text,
  IconButton,
 
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
const Spaces = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const properties = [
    {
      id: 1,
      image: "src/images/spaces1.jpg",
      imageAlt: "111",
      title: "Street Panels",
    },
    {
      id: 2,
      image: "src/images/spaces2.jpg",
      imageAlt: "Image 2",
      title: "Indoor Ads",
    },
    {
      id: 3,
      image: "src/images/spaces3.jpg",
      imageAlt: "Image 3",
      title: "Bill Boards",
    },
    {
      id: 4,
      image: "src/images/8deb02f95c2a1be0e8233bc1b17d8133.jpg",
      imageAlt: "Image 3",
      title: "Bill Boards",
    },
    {
      id: 5,
      image: "src/images/spaces3.jpg",
      imageAlt: "Image 3",
      title: "Bill Boards",
    },
    // Add more properties as needed
  ];

  const displayProperties = properties.slice(currentIndex, currentIndex + 3);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(properties.length - 3, prevIndex + 1)
    );
  };

  return (
    <>
      <Center mt={9}>
        <Text fontSize={40} fontWeight={"Bold"} fontFamily={"monospace"}>
          Explore the Spaces
        </Text>
      </Center>
      <Flex
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {displayProperties.map((property, index) => (
          <Box
            key={index}
            bg="white"
            _dark={{
              bg: "gray.800",
            }}
            w={{
              base: "100%",
              sm: "calc(60% - 2rem)",
              md: "calc(33.33% - 9rem)",
            }}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            m={4}
          >
            <Center>
              <Box
                as={motion.div}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                position="relative"
                overflow="hidden"
                borderRadius="lg"
                h="350px"
              >
                <motion.img
                  src={property.image}
                  alt={property.imageAlt}
                  roundedTop="lg"
                  h="200px"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Box>
            </Center>
            <Box p="6">
              <Box display="flex" alignItems="baseline"></Box>

              <Text
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {property.title}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
      <Flex justifyContent="center" mt={4}>
        <IconButton
          onClick={handlePrevClick}
          icon={<ArrowLeftIcon />}
          aria-label="Previous"
        />
        <IconButton
          onClick={handleNextClick}
          icon={<ArrowRightIcon />}
          aria-label="Next"
        />
      </Flex>
    </>
  );
};

export default Spaces;
