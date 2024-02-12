import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Navmenu from "./Navmenu";

const Navbar = ({ drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
    >
      <Toolbar className="flex justify-evenly">
        <Typography variant="h6" noWrap component="div">
          Permanent drawer
        </Typography>
        <Navmenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
