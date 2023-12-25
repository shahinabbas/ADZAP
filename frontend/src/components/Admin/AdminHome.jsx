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
import { Box, Heading, Container, Flex } from "@chakra-ui/react";
import api from "../../Services/api";

const AdminHome = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_APP_BASE_URL}admins/api/chart-data/`
        );
        console.log(response.data);
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formattedChartData = chartData.map((item) => {
    const date = new Date(item.month);
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    return {
      awsMonth: monthName,
      money: item.total_price,
    };
  });

  return (
    <>
      <AdminNavbar />
      <Container mt={5}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Box width={{ base: "100%", md: "48%" }} mb={4}>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
              <Heading mb={4} textAlign="center" size="xl">
                Payment Graph 1
              </Heading>
              <ResponsiveContainer>
                <LineChart data={formattedChartData}>
                  <Line type="monotone" dataKey="money" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="awsMonth" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box width={{ base: "100%", md: "48%" }}>
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
              <Heading mb={4} textAlign="center" size="xl">
                Payment Graph 2
              </Heading>
              <ResponsiveContainer>
                <LineChart data={formattedChartData}>
                  <Line type="monotone" dataKey="money" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="awsMonth" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default AdminHome;
