import { Box } from "@mui/material";

import Switche from "./Switche";
import Swipers from "./Swipers";
import "./LandingPage.css";

export const LayoutDesk = ({ children }) => {
  return (
    <Box className="bg-blue pl-20 pt-20">
      <div className="bg-pink h-full text-white rounded-lg">
        <div className="flex h-[200px]  justify-between">
          <Box className="ml-2 w-1/3 ">
            {/* picture */}
            <img src="images/logoRemoveBg.png" className=" pl-6 object-cover" />
          </Box>

          {/* Intro nav menu */}
          {/* <Box className="flex gap-x-20 items-center pr-5 w-1/3">
            <a href="#">
              <strong>Service</strong>
            </a>
            <a href="#">Why us</a>
            <a href="#">Pricing</a>
            <a href="#">Review</a>
          </Box> */}

          {/* Register and Sign in button */}
          <Box className="flex gap-x-10 items-center justify-center p-10 w-1/3">
            <a href="/signup">
              <button
                type="submit"
                className="shadow-lg outline-0 w-fullborder-transparent rounded-4xl text-white block w-full p-2.5 bg-blue hover:opacity-70"
              >
                Register
              </button>
            </a>

            <a href="/login">
              <button
                type="submit"
                className="shadow-lg outline-0 w-full border-transparent rounded-4xl bg-blue bg-gray-50 text-white block w-full p-2.5 hover:opacity-70"
              >
                Sign in
              </button>
            </a>
          </Box>
        </div>
        {/* ปลุกใจในตัวคุณ */}
        <Box className="flex mx-50 h-97 justify-center">
          <div className="flex flex-col  mt-10 gap-10">
            <span className="text-7xl Font-second">BE READY</span>
            <span className="text-7xl Font-second">
              <Switche className="size-20 h-20" /> AND GO
            </span>
            <span className="text-7xl Font-second">FOR YOUR LIFE</span>
          </div>
          <img
            src="public\images\landing_woman-removebg.png"
            className="object-cover"
          />
        </Box>

        {/* Swiper */}
        <Box>
          <Swipers />
        </Box>
      </div>
    </Box>
  );
};

export default LayoutDesk;
