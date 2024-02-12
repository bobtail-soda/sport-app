import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";
import API from '../../api/axios';

import 'apexcharts/dist/apexcharts.css';

const DonutChart = ({selectedRange, userId, reload}) => {

  const [activitiesTypeData, setActivitiesTypeData] = useState([]);
  
  const dashboardRoute = "api/dashboard";

  const token = localStorage.getItem('token');

  const headers = {
      'Authorization': `Bearer ${token}`
    }

  useEffect(() => {
    getActivitiesTypeByUserId();
  }, []);

  //get activities Type Data By User Id
  const getActivitiesTypeByUserId  = async () => {

    const response = await API.get(`${dashboardRoute}/activities-type/${userId}`,
                                    { params: { date_range: selectedRange } },
                                    {headers: headers}
                                  ); // [GET] https://localhost:5000/api/dashboard/summary-card/:id
    // set User data here
    if (response.data.data) {
      setActivitiesTypeData([...response.data.data.chart_datas]);
    }

  };

  const seriesArray = [];
  const labelsArray = [];

  activitiesTypeData.map((activity) => (
    seriesArray.push(activity.count),
    labelsArray.push(activity.activity_type)
  ))
  
    const chartData = {
        series: seriesArray,
        options: {
          chart: {
            type: 'donut',
          },
          labels: labelsArray,
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

export default DonutChart