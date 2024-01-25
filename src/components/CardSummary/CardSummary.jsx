import React from 'react'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TimerIcon from '@mui/icons-material/Timer';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import { 
  ThemeProvider,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import { theme } from "./../../theme"


const CardSummary = () => {
  return (
    <>
    <ThemeProvider theme={theme}>
      {/* TODO: change to justify-between for responsive lg*/}
    <div className="flex content-center items-center justify-center p-6 rounded-main m-5 bg-pink-light flex w-10/12">
        <CardContent sx={{color: 'primary.main'}}>
          <Typography component="div" variant="p" sx={{color: 'black'}}>
          <LocalFireDepartmentIcon sx={{color: 'orange', mr: 1}} />
            Calories
          </Typography>
          <p className="text-lg mb-3">
            1,000 Kcal
          </p>
          <Typography component="div" variant="p" sx={{color: 'black'}}>
          <TimerIcon sx={{mr: 1}} />
            Time
          </Typography>
          <p className="text-lg mb-3">
            1 h 22 min
          </p>
          <Typography component="div" variant="p" sx={{color: 'black'}}>
            <DirectionsRunIcon sx={{color: 'primary.main', mr: 1}} />
            Distance
          </Typography>
          <p className="text-lg">
            4.21 km
          </p>
        </CardContent>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="/images/dashboard-card.png"
        alt="The strong women doing workout"
      />
      </div>
      </ThemeProvider>
    </>

    
  )
}

export default CardSummary