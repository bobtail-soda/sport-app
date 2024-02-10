import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import { Box, Container, Typography, ThemeProvider, Modal } from "@mui/material"
import { theme } from "../../../theme"
import API from '../../../api/axios';

//Component
import EditExercise from '../EditExercise/EditExercise.jsx'

//Image
import createExercise from "/images/createExercise.jpg"

const SummaryExercise = () => {

  const navigate = useNavigate();

  const [summaryData, setSummaryData] = useState({});
  const [reload, setReload] = useState(false);

  //Modal popup
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setReload(!reload);
  };

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  }
  const exerciseActivityRoute = "api/exercise-activities";

  //Modal popup style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getExerciseActivitiesByUserId();
  }, [reload]);

  //get Exercise Activities data
  const getExerciseActivitiesByUserId  = async () => {
      
    // const id = '65b9cf92703abf9fed197cb6';
    const id = localStorage.getItem('exercise_activity_id');
    
    if(localStorage.getItem('exercise_activity_id') === null){

    }

    const response = await API.get(`${exerciseActivityRoute}/${id}`, {headers: headers}); // [GET] https://localhost:5000/api/:user_id
    console.log("response: ", response.data.data)
    // set Exercise Activities here
    if (response.data.data) {
      setSummaryData(response.data.data);
      localStorage.removeItem('exercise_activity_id');
    }

  };

   // Update Tracking Exercise Activity to api
   const updateExerciseActivity = async ({id, activity_type_id, caption, description, hour, minute, date, image}) => {
    // const id = '65b9fced5cfcc8eb551496b6';
    const requestData = {
      id: id,
      activity_type_id: activity_type_id,
      caption: caption,
      description: description,
      hour: hour,
      minute: minute,
      date: date,
      image: image,
    };
    console.log(requestData);
    const response = await API.put(`${exerciseActivityRoute}/${id}`, requestData, {headers: headers});// [PUT] https://localhost:5000/api/users , requestData

    if (response.statusText === "OK") {
    localStorage.setItem('exercise_activity_id', response.data.data._id);
    console.log("id from update: ",response.data.data._id);
    setReload(!reload);
    navigate("/exercise-activity/summary");
    }
    console.log(response);
  };

    // Delete data
    const removeData = async (id) => {
console.log("id: ", id)
      const response = await API.delete(`${exerciseActivityRoute}/${id}`, {headers: headers})
  
      if (response.status === 200) {
        navigate("/dashboard");        
        console.log(response);
      }
    };


  return (
<>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
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
              Summary your activity
            </Typography>
            
            <div className="mb-5 flex flex-col w-full bg-white border-2 border-pink rounded-main">
              <input type="hidden" id="id" value={summaryData._id} />
              <div className="flex justify-between">
                <div className="text-pink font-semibold bold p-5 flex justify-start">
                  <label htmlFor="caption">Your caption</label>
                </div>
                
                <button onClick={() => removeData(summaryData._id)} className="text-grey pr-5 flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M9 2H7a.5.5 0 0 0-.5.5V3h3v-.5A.5.5 0 0 0 9 2m2 1v-.5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2V3H2.251a.75.75 0 0 0 0 1.5h.312l.317 7.625A3 3 0 0 0 5.878 15h4.245a3 3 0 0 0 2.997-2.875l.318-7.625h.312a.75.75 0 0 0 0-1.5zm.936 1.5H4.064l.315 7.562A1.5 1.5 0 0 0 5.878 13.5h4.245a1.5 1.5 0 0 0 1.498-1.438zm-6.186 2v5a.75.75 0 0 0 1.5 0v-5a.75.75 0 0 0-1.5 0m3.75-.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>                </button>
                <button onClick={handleOpen} className="text-grey pr-5 flex justify-start items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1m-15 .76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71m10.76-8.35l2.83 2.83l-1.42 1.42l-2.83-2.83ZM8 13.17l5.93-5.93l2.83 2.83L10.83 16H8Z"/></svg>
                </button>
                
              </div>
              <textarea
                id="caption"
                rows="1"
                className="resize-none disabled:bg-white placeholder-grey outline-0 block p-5 w-full text-sm rounded-card border-grey"
                placeholder="Type some caption here..."
                value={summaryData.caption}
                disabled
              />
              
              <div className="flex justify-center">
                <img className="w-80 h-full object-cover" src={summaryData.image} alt="The group of women are running" />
              </div>
              <div className="text-pink font-semibold bold p-5 flex justify-start">
                <label htmlFor="description">Description</label>
              </div>
              <textarea
                id="description"
                rows="5"
                className="resize-none disabled:bg-white placeholder-grey-dark outline-0 block p-5 w-full text-sm border-grey"
                placeholder="Type some caption here..."
                value={summaryData.description}
                disabled
              />
              <div className="text-white rounded-summary bg-pink text-sm text-grey-dark p-5">
                <p>Type: {summaryData.activity_type_id}</p>
                <p>Duration: {`${summaryData.hour} hour ${summaryData.minute} minute`}</p>
                <p>Calories: xxx</p>
                <p>Date: {summaryData.date}</p>
              </div>
            </div>

            <button type="submit" 
              className="mb-6 text-white rounded-4xl bg-blue text-lg w-full py-1 text-center"
              >
              <Link href="/create-new-password" color='primary.white' underline="none">
                Share
              </Link>
            </button>

            <button type="submit" 
              className="mb-6 text-white rounded-4xl bg-pink text-lg w-full py-1 text-center"
              >
              <Link href="/create-new-password" color='primary.white' underline="none">
                Back to Dashboard
              </Link>
            </button>

            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
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
                      Update Tracking Exercise Activity
                    </Typography>
                    <EditExercise update={updateExerciseActivity} summaryData={summaryData} handleClose={handleClose}/>
                  </Box>
                </Container>
            </Modal>
          </Box>
        </Container>
      </ThemeProvider>
    </>
      )
}

export default SummaryExercise