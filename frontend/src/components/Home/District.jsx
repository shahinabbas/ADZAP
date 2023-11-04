import React from 'react'
import { Box, SimpleGrid, Image, Text } from "@chakra-ui/react";

function District() {
  const cardData = [
    {
      imageSrc: "src/images/download.png",
      title: "Card 1",
    },
    {
      imageSrc: "src/images/aaa.png",
      title: "Card 2",
    },
    {
      imageSrc: "src/images/oip.png",
      title: "Card 3",
    },
    {
      imageSrc: "src/images/download.png",
      title: "Card 4",
    },
    
  ];

  return (
    <SimpleGrid columns={4} spacing={4}>
      {cardData.map((card, index) => (
        <Box
          key={index}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          position="relative" // Make the parent box a positioned container
          overflow="hidden" // Hide any overflow content
        >
          <Image
            src={card.imageSrc}
            alt={`Image for ${card.title}`}
            boxSize="100%" // Set the size of the image
            objectFit="cover" // Maintain aspect ratio and cover the box
            borderTopRadius="lg" // Add border radius to the top corners
          />
          <Text
            position="absolute" // Position the title absolutely within the parent
            top="50%" // Position it at the vertical center
            left="50%" // Position it at the horizontal center
            transform="translate(-50%, -50%)" // Center it both horizontally and vertically
            textAlign="center" // Center-align the title
            fontSize="lg"
            fontWeight="bold"
            p="2" 
            color='white'
            borderBottomRadius="lg" // Add border radius to the bottom corners
          >
            {card.title}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default District;
