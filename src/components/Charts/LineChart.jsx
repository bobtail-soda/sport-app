import React from 'react'
import Chart from "react-apexcharts";
import 'apexcharts/dist/apexcharts.css';



const LineChart = () => {
    const options = {
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      }
    };
    const series = [
      {
        name: "Calories",
        data: [130, 80, 50, 90, 100, 60, 70, 51]
      },
      {
        name: "Duration",
        data: [60, 55, 20, 61, 56, 30, 50, 35]
      },
      {
        name: "Distance",
        data: [5, 4.5, 2.5, 4.8, 4.9, 3, 3.5, 2]
      }
    ];
return <Chart options={options} series={series} type="area" />;

}
export default LineChart