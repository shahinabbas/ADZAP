import { useNavigate } from "react-router-dom";
import React from "react";
import { Image, Flex, Text, Button } from "@chakra-ui/react";

function First() {
  const navigate = useNavigate();

  return (
    <div>
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Image
          src="src/images/flipped.png"
          alt="Image Alt Text"
          mt={14}
          boxSize={{ base: "100%", md: "700px" }}
          objectFit="contain"
          mb={{ base: "20px", md: "0" }}
        />
        <Flex
          direction="column"
          justify="center"
          align={{ base: "center", md: "start" }}
          ml={{ base: "0", md: "20px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Text
            as="h1"
            fontFamily="cursive"
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            mb={{ base: "10px", md: "0" }}
          >
            Advertise anywhere in the world <br /> with us.
          </Text>
          <Flex direction={{ base: "column", md: "row" }} align="center">
            <Button
              variant="outline"
              borderColor="gray.400"
              bgColor="#3745d2"
              color="white"
              _hover={{
                bgColor: "transparent",
                borderColor: "gray.400",
                color: "black",
              }}
              mr={{ base: "0", md: "4" }}
              mb={{ base: "4", md: "0" }}
              size="lg"
              onClick={() => navigate("contact")}
            >
              Enquire Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              _hover={{ bgColor: "#3745d2", color: "white" }}
              onClick={() => navigate("spots")}
            >
              Buy Spots
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default First;
 