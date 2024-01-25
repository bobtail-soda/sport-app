import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import { 
  Box,
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material"

import { sizing } from '@mui/system';



import AvatarImg from "/images/avatar.jpg"
import Forgotpassword from "/images/forgotpassword.jpg"
import { theme } from "./../../theme"


const drawerWidth = 310;

const Rightbar = () => {
  return (
    <>
      <ThemeProvider theme={ theme }>
        <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                height: '100%',
                boxSizing: 'border-box',
                bgcolor: 'primary.main',
              },
            }}
            variant="permanent"
            anchor="right"
          >
            <Divider />
            <div class="max-w-full">
              <img src={AvatarImg} class="object-cover h-auto max-w-full" />
            </div>
            {/* <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: `url(${AvatarImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                      t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: 'auto',
                    height: '100%',
                  }}
                /> */}
                <Box sx={{height: '100%', m: 4, color: 'primary.black'}}>
                  <Typography variant="h5" component="h2" 
                    sx={{
                      fontWeight: 'medium',
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      
                    }}>
                    Bobtail Soda
                  </Typography>

                  <Typography variant="p" component="h2" 
                    >
                    Email: bobtailsoda@gmail.com
                  </Typography>
                  <Typography variant="p" component="h2" 
                    >
                    Date of Birth: 12/12/2000
                  </Typography>
                  <Typography variant="p" component="h2" 
                    >
                    Sex: Female
                  </Typography>
                  <Typography variant="p" component="h2" 
                    >
                    Height: 170 cm
                  </Typography>
                  <Typography variant="p" component="h2" 
                    >
                    Weight: 50 kg
                  </Typography>
              </Box>
              <div className="mb-5 flex justify-center items-center">
                <button className="font-semibold rounded-4xl p-2 text-center w-fit h-10 bg-white text-pink">Edit profile</button>
              </div>
            <Divider />
            <Box sx={{height: '100%', m: 4, color: 'primary.black'}}>
              <Typography variant="p" component="h2" sx={{mb: 2}}>
                Favorite Activity
              </Typography>
            
            <div className="flex-wrap gap-6 mb-3 flex text-black h-10 w-full">
              <div className="whitespace-nowrap p-2 rounded-4xl bg-white">
                Weight training
              </div>
              <div className="whitespace-nowrap p-2 rounded-4xl bg-white">
                Yoga
              </div>
              <div className="whitespace-nowrap p-2 rounded-4xl bg-white">
                Running
              </div>
              <div className="whitespace-nowrap p-2 rounded-4xl bg-white">
                Walking
              </div>
            </div>
            </Box>
        </Drawer>
      </ThemeProvider>
    </>
  )
}

export default Rightbar