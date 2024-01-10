import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
// import DashboardCard from '/images/DashboardCard.jpg'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TimerIcon from '@mui/icons-material/Timer';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const CardSummary = () => {
  const theme = useTheme();
  return (
    <>
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>

          <Typography component="div" variant="p">
          <LocalFireDepartmentIcon />
          Calories
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          1,000 Kcal
          </Typography>
          <Typography component="div" variant="p">
          <TimerIcon />
          Time
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          1 h 22 min
          </Typography>
          <Typography component="div" variant="p">
            <DirectionsRunIcon />
          Distance
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          4.21 km
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/images/dashboard-card.jpg"
        alt="Your avatar"
      />
    </Card>
    </>

    
  )
}

export default CardSummary