import React from "react";
import Navbar from "./Nav";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Corousel from "./Corousel";
import { Height } from "@mui/icons-material";

export const LayoutDesk = ({ children }) => {
  return (
    <Box className="container h-screen bg-red-400 text-white">
      <Navbar />
      <Box className="header h-2/5">
        <Box
          className="header-top mr-4"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Box className="w-6/12">
            <img
              src="images/logoFitness.jpg"
              className="size-28 pl-6 object-cover"
            />
          </Box>
          <Box className="flex w-6/12 place-content-end gap-x-8 items-center">
            {/* Profile and Signin register and seach bar */}

            <a href="#">Register</a>
            <a href="#">Sign in</a>

            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              className="text-white"
            />
            <img src="./images/landingPage1.jpg" className="size-28 " />
          </Box>
        </Box>
        <Box className="header-bottom h-auto flex items-center ">
          <Stack spacing={2} direction="row" className="p-6 ml-9">
           {/* <button className="bg-white hover:bg-red-400 text-black p-4 rounded-lg shadow-lg text-sm 

"> Weight Training</button> */}
            <Button variant="contained">Weight Training</Button>
            <Button variant="contained">Yoga</Button>
            <Button variant="contained">Running</Button>
          </Stack>
        </Box>
      </Box>
      <div className="">
        <Corousel />
      </div>
      

    </Box>
  );
};

export default LayoutDesk;
