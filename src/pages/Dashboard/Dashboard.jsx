import React from 'react'
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';
import CardSummary from '../../components/CardSummary/CardSummary';

import { 
  Grid,
  Box
} from '@mui/material';


const Dashboard = () => {
  
  return (
    <>
    <div className="ml-5 mb-5">
       <h1 className="text-lg font-semibold mr-5 inline w-fit">Statistics</h1> 
        <select className="outline-0 w-fit p-2.5 text-grey text-sm">
          <option value="today">Today</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
    </div>
    <Grid sx={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)'}}>
      <CardSummary />
      <PieChart />
    </Grid>
    <Box sx={{m: 10}}>
      <LineChart />
    </Box>
    </>
  )
}

export default Dashboard