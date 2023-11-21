import {
  AbsoluteCenter,
  Center,
  Flex,
  Box,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { EncryptedIcon, GeneralIcon } from "../../../images/icons";
export function RightPanel(props) {
  return (
    <Center
      bg="#f0f2f5"
      borderBottom="6px solid #43c960"
      position="relative"
      {...props}
      w="70%"
    >
      <Flex
        direction="column"
        textAlign="center"
        color="#41525d"
        align="center"
      >
          <Box pt="8">
            <Heading fontWeight="light">ADZAP</Heading>
            <Text fontSize="sm" mt="4">
              Chat with the seller and make the better negotiations.
              <br />
            </Text>
          </Box>
        <AbsoluteCenter axis="horizontal" bottom="10" flex="1" mt="10">
          <HStack justifyItems="baseline" color="#8696a0"></HStack>
        </AbsoluteCenter>
      </Flex>
    </Center>
  );
}
