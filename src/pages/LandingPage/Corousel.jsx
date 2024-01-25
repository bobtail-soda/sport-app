import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Corousel(props) {
  let picUrl = [
    "./images/landingPage1.jpg",
    "./images/landingPage2.jpg",
    "./images/landingPage3.jpg",
    "./images/landingPage4.jpg",
    "./images/landingPage5.jpg",
  ];

  return (
    <Carousel sx={{height: "25%"}}>
      {picUrl.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item({ key, item }) {
  return <img src={item} className="w-full h-1/4 object-cover"/>;
}

export default Corousel;
