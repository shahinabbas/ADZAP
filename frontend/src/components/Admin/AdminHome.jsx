import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Box, Heading, Container, Tooltip } from "@chakra-ui/react";
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
      <Container maxW="49%" mt={5}>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
          <Heading mb={4} textAlign="center" size="xl">
            Payment Graph{" "}
          </Heading>
          <LineChart width={600} height={300} data={formattedChartData}>
            <Line type="monotone" dataKey="money" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="awsMonth" />
            <YAxis />
          </LineChart>
        </Box>
      </Container>
    </>
  );
};

export default AdminHome;
