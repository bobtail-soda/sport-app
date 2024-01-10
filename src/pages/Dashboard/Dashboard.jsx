import React from 'react'
import LoginImg from "/images/login.jpg"
import PieChartWithImages from '../../components/Charts/PieChartWithImages';
import LineChart from '../../components/Charts/LineChart';
import CardSummary from '../../components/CardSummary/CardSummary';
import { Box } from '@mui/material';


const Dashboard = () => {

  // Image URL
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardSummary />
      <PieChartWithImages />
      <LineChart />
    </Box>
  )
}

export default Dashboard