import React from "react";
import Navbar from "./Navbar";
import {
  Image,
  Flex,
  Text,
  Button,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import Footer from "./Footer";

function About() {
  const data = [
    { count: "1 million", title: "Monthly Users" },
    { count: "2 million", title: "Monthly Posts" },
    { count: "1 million", title: "Monthly Users" },
    { count: "3 million", title: "Monthly Sales" },
  ];
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <Text
        mt={10}
        fontSize="35px"
        fontWeight="bold"
        color="#37AADB"
        textAlign="center"
      >
        Get To Know About Us
      </Text>
      <Text mt={5} textAlign="center" fontWeight="bold">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore etdolore magna aliqua. Maecenas accumsan
        <br />
        lacus vel facilisis volutpat est velit egestas. Cursus turpis massa
        tincidunt dui. Neque volutpat ac tincidunt vitae semper quis lectus
        nulla at.
        <br /> Viverra orci sagittis eu volutpat odio facilisis mauris sit amet.
        Blandit massa enim nec dui nunc mattis.
      </Text>
      <Image mt={50} src="src\images\about.jpg" alt="image" boxSize="100%" />
      <Flex
        direction="column"
        mt="59"
        bgImage="url(https://www.freepikcompany.com/img/forms/team-benefits.svg)"
        bgSize="fit"
        bgPosition="center"
        height="1500px" // Set an appropriate height for the background image
      >
        <Text
          fontSize="35px"
          fontWeight="bold"
          textAlign="center"
          color={"#5D686E"}
        >
          ADZAP Family
        </Text>

        <Text fontWeight="bold" fontSize="20px" textAlign="center">
          One of Fastest Growing Wold Advertisement Platform{" "}
        </Text>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          ml={159}
          spacing={8}
          mt={250}
        >
          {data.map((card, index) => (
            <div>
              <Text fontWeight="bold" fontSize="35px" color="white">
                {card.count}
              </Text>
              <Text fontWeight="bold" ml={1} fontSize="21px" color="gray.400">
                {card.title}
              </Text>
            </div>
          ))}
        </SimpleGrid>

        <Text
          mt={20}
          fontWeight="bold"
          fontSize="35px"
          color="white"
          textAlign="center"
        >
          Companies Using ADZAP
        </Text>
      </Flex>
      <Footer mt={10} />
    </div>
  );
}

export default About;
