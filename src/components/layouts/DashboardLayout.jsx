import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from "../shared/Navbar";
import Rightbar from "../shared/Rightbar";
import Toolbar from '@mui/material/Toolbar';



const DashboardLayout = () => {

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
      <Rightbar />
    </Box>
    </>
  )
}

export default DashboardLayout