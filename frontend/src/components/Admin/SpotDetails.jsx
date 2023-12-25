import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import {
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
  Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchPostDetails } from "../../Services/apiUtils";
import api from "../../Services/api";
const SpotDetails = () => {
  const [spotDetails, setSpotDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(spotDetails, "111111111111111111111111111111");

  const fetchDetails = async () => {
    try {
      const response = await fetchPostDetails(id);
      setSpotDetails(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleToggleStatus = async (adId) => {
    try {
      console.log("toggle start");
      const response = await api.patch(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post/action/${adId}/`
      );
      console.log("toggle DONE");
      await fetchDetails();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // or some loading indicator
  }

  if (error) {
    return <p>Error: {error.message}</p>; // or handle error in a way suitable for your app
  }

  if (!spotDetails) {
    return <p>Spot details not found.</p>; // or handle the case where details are not available
  }

  return (
    <>
      <AdminNavbar />
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={14} mt={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Box mr={{ base: 0, md: 5 }} pos="relative">
            <DottedBox />
            <Image
              boxShadow="lg"
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              maxH="20rem"
              objectFit="cover"
              src={spotDetails.image}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
          <Stack direction="column" spacing={6} justifyContent="center">
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              {spotDetails.country}
            </chakra.h1>
            <Box>
              <Text>
                {spotDetails.city}, {spotDetails.state}
              </Text>
              <Text fontWeight="bold" fontSize={25}>
                Landmark: {spotDetails.landmark}
              </Text>
              <Text fontWeight="bold" fontSize={25}>
                Pincode: {spotDetails.pincode}
              </Text>
              <Text fontWeight="bold" fontSize={25}>
                Validity: {spotDetails.validity} Months
              </Text>
              <Text fontWeight="bold" fontSize={25}>
                Size: {spotDetails.size} Sqft
              </Text>
              <Text fontWeight="bold" fontSize={25}>
                Price: {spotDetails.price} Rs
              </Text>
              <Button
              mt={5}
                colorScheme={spotDetails.is_active ? "red" : "green"}
                size="lg"
                onClick={() => handleToggleStatus(spotDetails.id)}
              >
                {spotDetails.is_active ? "Decline" : "Accept"}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
const Content = () => {
  return (
    <Text
      fontSize="md"
      textAlign="left"
      lineHeight="1.375"
      fontWeight="400"
      color="gray.500"
    ></Text>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default SpotDetails;
