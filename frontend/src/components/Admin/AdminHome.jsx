import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
  Heading,
  Container,
  Flex,
} from "@chakra-ui/react";
import api from "../../Services/api";

const AdminHome = () => {
  const [chartData, setChartData] = useState([]);
  const [postChartData, setPostChartData] = useState([]);
  useEffect(() => {
    fetchData();
    fetchPostData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/chart-data/`
      );

      const formattedChartData = response.data.map((item) => {
        const date = new Date(item.month);
        const formattedMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;

        return {
          awsMonth: formattedMonth,
          money: item.total_price,
        };
      });

      setChartData(formattedChartData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPostData = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/post-chart-data/`
      );

      const formattedChartData = response.data.map((item) => {
        const date = new Date(item.month);
        const formattedMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;

        return {
          awsMonth: formattedMonth,
          count: item.count,
        };
      });

      setPostChartData(formattedChartData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <Container mt={5}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box
            width={{ base: "100%", md: "148%" }}
            mb={4}
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="lg"
          >
            <Heading mb={4} textAlign="center" size="xl">
              Payment
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="money" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="awsMonth" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box
            width={{ base: "100%", md: "148%" }}
            mb={4}
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="lg"
          >
            <Heading mb={4} textAlign="center" size="xl">
              Post
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={postChartData}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="awsMonth" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Flex>
      </Container>
      <StatGroup>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </>
  );
};

export default AdminHome;
