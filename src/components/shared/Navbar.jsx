import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';


const Navbar = ({drawerWidth}) => {
  return (
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
        >
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
            Permanent drawer
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar