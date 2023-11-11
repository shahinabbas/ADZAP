import React from "react";
import { Image, Flex, Text, Button, Spacer } from "@chakra-ui/react";

function Banner(props) {
  return (
    <div
      style={{
        marginTop: "35px",
        backgroundColor: "#1B90E4",
        width: "1300px",
        height: "300px",
        marginLeft: "110px",
        borderRadius: "12px",
      }}
    >
      <Flex color="white">
        <h1
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
          {props.title}
        </h1>
        <Image
          mt={5}
          mr={5}
          src={props.src}
          alt="Image"
          width="380px"
          borderRadius={10}
        />
      </Flex>
    </div>
  );
}

export default Banner;
