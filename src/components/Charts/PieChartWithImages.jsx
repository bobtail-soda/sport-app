import React from 'react'
import Chart from "react-apexcharts";
import 'apexcharts/dist/apexcharts.css';

const PieChartWithImages = () => {
    const chartData = {
        series: [44, 55, 41, 17, 15],
        options: {
          chart: {
            type: 'donut',
          },
          labels: ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'],
        },
      };
  return (
    <Chart
         options={chartData.options}
         series={chartData.series}
         type="donut"
         width="380"
      />
  )
}

export default PieChartWithImages