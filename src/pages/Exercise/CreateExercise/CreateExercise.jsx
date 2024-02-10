import React from "react"
import { Box, Container, Typography, ThemeProvider } from "@mui/material"

import createExercise from "/images/createExercise.jpg"
import { theme } from "../../../theme"
import { Link } from "react-router-dom"

const CreateExercise = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "872px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: "medium",
                    m:5,
            }}
            >
              Create Exercise Activity
            </Typography>
            <select className="mb-10 outline-0 block w-full p-2.5 px-0.5 rounded-4xl bg-blue text-white pl-5 text-sm">
              <option value="Running" className="">Running</option>
              <option value="Weight training">Weight training</option>
              <option value="Hike">Hike</option>
              <option value="Yoga">Yoga</option>
              <option value="Swimming">Swimming</option>
              <option value="Bicycle ride">Bicycle ride</option>
              <option value="Walking">Walking</option>
            </select>
            <div className="flex flex-col w-full bg-white border border-grey rounded-main">
              <div className="text-pink font-semibold bold p-5 flex justify-start">
              <label htmlFor="caption">Your caption</label>
              </div>
              <textarea
                id="caption"
                rows="1"
                className="resize-none placeholder-grey outline-0 block p-5 w-full text-sm rounded-card border-b border-grey"
                placeholder="Type some caption here..."
              ></textarea>
              <div className="flex justify-center">
                <img className="w-80 h-full object-cover" src={createExercise} alt="The group of women are running" />
              </div>
              <div className="text-pink font-semibold bold p-5 flex justify-start">
                <label htmlFor="description">Description</label>
              </div>
              <textarea
                id="description"
                rows="5"
                className="resize-none placeholder-grey-dark outline-0 block p-5 w-full text-sm border-grey"
                placeholder="Type some description here..."
              ></textarea>
              <div className="text-sm text-grey-dark p-5 flex justify-end">
                <p>2/2/2023</p>
              </div>
            </div>

            <div className="flex justify-center">
              <select className="mt-5 mb-5 outline-0 block w-fit p-2.5 px-0.5 rounded-4xl bg-blue text-white pl-5 text-sm">
                <option value="Running" className="">Suggest duration: 30 min</option>
                <option value="Weight training">Weight training</option>
                <option value="Hike">Hike</option>
                <option value="Yoga">Yoga</option>
                <option value="Swimming">Swimming</option>
                <option value="Bicycle ride">Bicycle ride</option>
                <option value="Walking">Walking</option>
              </select>
            </div>

            <button type="submit" 
              className="mb-6 text-white rounded-4xl bg-pink text-lg w-full py-1 text-center"
              >
              <Link to="/exercise-activity/run-time" color='primary.white' underline="none">
                Start
              </Link>
            </button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default CreateExercise
