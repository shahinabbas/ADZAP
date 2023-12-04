import React,{useState,useEffect} from "react";
import AdminNavbar from './AdminNavbar';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { Box, Heading, Container ,Tooltip} from "@chakra-ui/react";
const data = [
  { name: "Page A", uv: 200 },
  { name: "Page A", uv: 400 },
  { name: "Page A", uv: 300 },
  { name: "Page A", uv: 900 },
];

const AdminHome = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    // Fetch or generate your data dynamically here
    const fetchData = async () => {
      // Replace this with your actual data fetching or generation logic
      const dynamicData = [
        { awsMonth: "January", money: 200 },
        { awsMonth: "February", money: 400 },
        { awsMonth: "March", money: 300 },
        { awsMonth: "April", money: 900 },
      ];
      setChartData(dynamicData);
    };

    fetchData();
  }, []);
  return (
    <>
      <AdminNavbar />
      <Container maxW="49%" mt={5}>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="lg">
          <Heading mb={4} textAlign="center" size="xl">
            Line Chart
          </Heading>
          <LineChart width={600} height={300} data={chartData}>
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

