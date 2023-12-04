import React, { useRef, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import AdminNavbar from "./AdminNavbar";

function AdminHome() {
  const chartRef = useRef(); // Reference to the chart instance
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56],
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  });

  useEffect(() => {
    // Destroy the existing chart before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance
    const newChartInstance = new Chart(chartRef.current, {
      type: "line",
      data: chartData,
      options: {
        scales: {
          x: {
            type: "category",
            labels: ["January", "February", "March", "April", "May"],
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Update the chart reference
    chartRef.current = newChartInstance;

    // Cleanup the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <AdminNavbar />
      <div>
        <h2>Monthly Sales Chart</h2>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default AdminHome;
