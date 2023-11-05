import React from "react";
import { Box, SimpleGrid, Image, Text, Container } from "@chakra-ui/react";

function District() {
  const cardData = [
    {
      imageSrc: "src/images/download.png",
      title: "Kollam",
      count: "180 + Spots",
    },
    {
      imageSrc: "src/images/aaa.png",
      title: "Kollam",
      count: "190 + SPots",
    },
    {
      imageSrc: "src/images/oip.png",
      title: "Alappuzha",
      count: "250 + Spots",
    },
    {
      imageSrc: "src/images/download.png",
      title: "Ernakulam",
      count: "150 + Spots",
    },
    {
      imageSrc: "src/images/download.png",
      title: "Kollam",
      count: "180 + Spots",
    },
    {
      imageSrc: "src/images/aaa.png",
      title: "Kollam",
      count: "190 + SPots",
    },
    {
      imageSrc: "src/images/oip.png",
      title: "Alappuzha",
      count: "250 + Spots",
    },
    {
      imageSrc: "src/images/download.png",
      title: "Ernakulam",
      count: "150 + Spots",
    },
  ];

  return (
    <Container maxW="container.xl">
      <Text textAlign="center" fontSize="4xl" fontWeight="bold" mt="4">
        Explore the districts
      </Text>
      <Text textAlign="center" fontSize="2xl" fontWeight="bold">
        our service available.
      </Text>
      <br />
      <br />
      <SimpleGrid columns={4} spacing={8}>
        {cardData.map((card, index) => (
          <Box
            key={index}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            position="relative"
            overflow="hidden"
          >
            <Image
              src={card.imageSrc}
              alt={`Image for ${card.title}`}
              boxSize="100%"
              objectFit="cover"
              borderTopRadius="lg"
            />
            <Text
              position="absolute"
              top="80%"
              left="25%"
              transform="translate(-50%, -50%)"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              p="2"
              color="white"
              borderBottomRadius="lg"
            >
              {card.title}
              <br />
              {card.count}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default District;
