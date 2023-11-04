import React from "react";
import { Image, Flex, Text, Button, Spacer } from "@chakra-ui/react";

function First() {
  return (
    <div>
      <Flex>
        <Image
          src="src/images/flipped.png"
          alt="Image Alt Text"
          boxSize="800px"
          objectFit="contain"
          style={{ paddingLeft: "140px" }}
        />
        <Flex direction="column" style={{ marginLeft: "20px" }}>
          <Text as="h1" paddingTop="180px">
            Advertise anywhere in the world with us.
          </Text>
          <Flex alignItems="center" style={{ paddingTop: "80px" }}>
            <Button
              variant="outline"
              borderColor="gray.400"
              marginTop="10px"
              backgroundColor="#3745d2"
              color="white"
              _hover={{
                backgroundColor: "transparent",
                borderColor: "gray.400",
                color: "black",
              }}
              style={{ marginRight: "35px" }}
              size="lg"
            >
              Enquire Now
            </Button>
            <Button
              variant="outline"
              marginTop="10px"
              size="lg"
              _hover={{ backgroundColor: "#3745d2", color: "white" }}
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
