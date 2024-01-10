import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";
import api from "../../services/api";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_APP_BASE_URL}admins/api/report/`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "User Id", "Date", "Amount"]],
      body: data.map((item) => [item.id, item.user, item.date, item.price]),
    });
    doc.save("report.pdf");
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <Center mt={5}>
          <Text fontWeight={"bold"} fontSize="xl">
            Payment Report
          </Text>
        </Center>
        <Button
          onClick={downloadPDF}
          colorScheme="teal"
          mt={4}
          _hover={{ bg: "teal.500" }}
          _active={{ bg: "teal.700" }}
        >
          Download PDF
        </Button>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="paymentTable"
          filename="payment_report"
          sheet="tablexls"
          buttonText="Download Excel"
          variant="outline"
          colorScheme="teal"
          ml={4}
          _hover={{ bg: "teal.500", color: "white" }}
          _active={{ bg: "teal.700", color: "white" }}
        />
        <TableContainer mt={4}>
          <Table
            variant="striped"
            colorScheme="teal"
            size="lg"
            id="paymentTable"
          >
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>User Id</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.user}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Report;
