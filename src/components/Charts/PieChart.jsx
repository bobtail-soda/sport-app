import React from 'react'
import Chart from "react-apexcharts";
import 'apexcharts/dist/apexcharts.css';

const PieChart = () => {
    const chartData = {
        series: [1, 2, 1, 1, 0],
        options: {
          chart: {
            type: 'donut',
          },
          labels: ['Running', 'Yoga', 'Weight training', 'Walking', 'Hiking'],
          legend: {
              position: 'right'
            }
        },
      };
  return (
    <Chart
         options={chartData.options}
         series={chartData.series}
         type="donut"
         width="480"

        //  sx={{width: 'auto'}}
      />
  )
}

export default PieChart