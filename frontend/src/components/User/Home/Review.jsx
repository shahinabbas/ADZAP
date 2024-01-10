import { Fragment, useEffect, useState } from "react";
import {
  Container,
  Text,
  Stack,
  Avatar,
  Icon,
  Image,
  Heading,
  HStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import axios from "axios";
import { fetchSingleUser } from "../../../Services/apiUtils";
const testimonials = [
  {
    name: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image: "https://avatars2.githubusercontent.com/u/37842853?v=4",
    content:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper",
  },
];

const ratingSummary = [
  { id: 1, rating: 5, percentage: "80%" },
  { id: 2, rating: 4, percentage: "65%" },
  { id: 3, rating: 3, percentage: "35%" },
  { id: 4, rating: 2, percentage: "75%" },
  { id: 5, rating: 1, percentage: "55%" },
];

const Review = () => {
  const [reviewData, setReviewData] = useState([]);
  const [ratingSummary, setRatingSummary] = useState([]);
  const [totalRatings, setTotalRatings] = useState([]);

  console.log(reviewData);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/review/`
      );
      const newTotalRatings = response.data.length;

      const updatedReviewData = await Promise.all(
        response.data.slice(-3).map(async (review) => {
          const user = await fetchSingleUser(review.user);
          return { ...review, user };
        })
      );

      setReviewData(updatedReviewData.reverse());

      const ratingsCount = new Array(5).fill(0);
      response.data.forEach((review) => {
        ratingsCount[review.stars - 1]++;
      });

      const dynamicRatingSummary = ratingsCount.map((count, index) => ({
        id: index + 1,
        rating: index + 1,
        percentage: `${((count / newTotalRatings) * 100).toFixed(0)}%`,
      }));

      setTotalRatings(newTotalRatings);
      setRatingSummary(dynamicRatingSummary);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text textAlign={"center"} fontSize={"44px"} fontWeight={"Bold"}>
        Words of customer
      </Text>
      {/* <Container maxW="5xl" p={{ base: 5, md: 8 }}>
        {testimonials.map((obj, index) => (
          <Fragment key={index}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              bgGradient="linear(to-br, #41e14e, blue.300)"
              spacing={{ base: 0, sm: 10 }}
              p={{ base: 4, sm: 10 }}
              rounded="lg"
              justifyContent="center"
            >
              <Box
                width="30rem"
                pos="relative"
                d={{ base: "none", sm: "block" }}
              >
                <Image
                  size="2xl"
                  pos="absolute"
                  rounded="lg"
                  src={obj.image}
                  top="-3.8rem"
                  boxShadow="lg"
                />
              </Box>

              <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
                <Icon as={ImQuotesLeft} w={10} h={10} color="gray.700" />
                <Text fontSize="md" fontWeight="medium">
                  {obj.content}
                </Text>
                <Stack
                  alignItems={{ base: "center", sm: "flex-start" }}
                  spacing={0}
                >
                  <Avatar
                    size="xl"
                    showBorder={true}
                    borderColor="blue.400"
                    name="avatar"
                    src={obj.image}
                    d={{ base: "block", sm: "none" }}
                  />
                  <Text fontWeight="bold" fontSize="lg">
                    {obj.name}
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="gray.600">
                    {obj.position}, {obj.company}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Fragment>
        ))}
      </Container> */}
      <Container maxW="5xl" p={{ base: 5, md: 10 }}>
        <Box mb={8}>
          <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={3}>
            Audience rating summary
          </Heading>
          <Stack spacing={3}>
            <Box>
              <HStack spacing={3}>
                <Flex alignItems="center" justifyContent="start">
                  {Array.from(Array(4).keys()).map((id) => {
                    return <Star key={id} fillColor="#EACA4E" />;
                  })}
                  {Array.from(Array(5 - 4).keys()).map((id) => {
                    return <Star key={id} fillColor="#e2e8f0" />;
                  })}
                </Flex>
                <Text fontWeight="bold" fontSize="lg">
                  4.0
                </Text>
              </HStack>
              <Text fontWeight="bold" fontSize="md">
                {totalRatings} ratings
              </Text>
            </Box>

            <Stack direction="column" spacing={1}>
              {ratingSummary.map((data) => {
                return (
                  <HStack key={data.id} spacing={5}>
                    <Text fontWeight="bold" fontSize="md">
                      {data.rating}
                    </Text>
                    <Box w={{ base: "100%", md: "70%" }}>
                      <Box w="100%" rounded="md">
                        <Box
                          w={data.percentage}
                          h={3}
                          bg="yellow.400"
                          rounded="md"
                        ></Box>
                      </Box>
                    </Box>
                    <Text fontWeight="bold" fontSize="md">
                      {data.percentage}
                    </Text>
                  </HStack>
                );
              })}
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={4}>
            Audience reviews
          </Heading>
          <Stack direction="column" spacing={5}>
            {reviewData.map((review, index) => {
              // fetchUserData(review.user.id);
              return (
                <Box key={index} maxW="2xl">
                  <HStack spacing={3} mb={2}>
                    <Avatar
                      size="md"
                      name={review.user.name}
                      src={review.user.profile_pic}
                    />
                    <Stack direction="column" spacing={2}>
                      <Text fontWeight="bold" fontSize="md">
                        {review.user.name}
                      </Text>
                      <Flex alignItems="center" justifyContent="start">
                        {Array.from(Array(review.stars).keys()).map((id) => {
                          return <Star key={id} fillColor="#EACA4E" />;
                        })}
                        {Array.from(Array(5 - review.stars).keys()).map(
                          (id) => {
                            return <Star key={id} fillColor="#e2e8f0" />;
                          }
                        )}
                      </Flex>
                    </Stack>
                  </HStack>
                  <Text
                    fontSize="0.87rem"
                    textAlign="left"
                    lineHeight="1.375"
                    fontWeight="300"
                  >
                    {review.message}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Review;

const Star = ({ fillColor }) => {
  return (
    <svg
      style={{
        width: "1rem",
        height: "1rem",
        fill: fillColor,
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};
