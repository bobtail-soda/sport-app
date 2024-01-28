import React from "react"
import { Box, Container, Typography, ThemeProvider } from "@mui/material"

import createExercise from "/images/createExercise.jpg"
import { theme } from "../../../theme"
import { Link } from "react-router-dom"

const TrackingExerciseForm = () => {
  return (
<>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            // height: "100vh",
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
              Tracking Exercise Activity
            </Typography>
            <select className="mb-10 outline-0 block w-full p-2.5 px-0.5 rounded-4xl bg-blue text-white pl-5 text-sm">
              <option value="Running">Running</option>
              <option value="Weight training">Weight training</option>
              <option value="Hike">Hike</option>
              <option value="Yoga">Yoga</option>
              <option value="Swimming">Swimming</option>
              <option value="Bicycle ride">Bicycle ride</option>
              <option value="Walking">Walking</option>
            </select>
            <div className="flex flex-col w-full bg-white border border-grey rounded-card">
              <textarea
                id="message"
                rows="1"
                className="placeholder-black outline-0 block p-5 w-full text-sm rounded-text-top border-b border-grey"
                placeholder="Type some caption here..."
              ></textarea>
              <div className="flex justify-center">
                <img className="w-80 h-full object-cover" src={createExercise} alt="The group of women are running" />
              </div>
              <textarea
                id="message"
                rows="5"
                className="placeholder-grey-dark outline-0 block p-5 w-full text-sm border-grey"
                placeholder="Type some caption here..."
              ></textarea>
            </div>

            <div className="gap-2 mt-5 mb-5 flex justify-center">
              <label htmlFor="duration">Duration: </label>
              <input type="number" name="hour" placeholder="Hour" className="border" />
              <input type="number" name="minute" placeholder="Minute" className="border" />
            </div>
            <div className="gap-2 mb-5 flex justify-center">
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" className="border" />

            </div>

            <button type="submit" 
              className="mb-6 text-white rounded-4xl bg-pink text-lg w-full py-1 text-center"
              >
              <Link href="/create-new-password" color='primary.white' underline="none">
                Save
              </Link>
            </button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
      )
}

export default TrackingExerciseForm