import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from "../shared/Navbar";
import Toolbar from '@mui/material/Toolbar';



const ExerciseActivityLayout = () => {
  return (
    
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* content */}
        <Outlet />
      </Box>
    </Box>
    </>
  )
}

export default ExerciseActivityLayout