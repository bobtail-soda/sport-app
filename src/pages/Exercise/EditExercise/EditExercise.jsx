import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme"
import { Box, Container, Typography, ThemeProvider, } from "@mui/material"
import ActivityTypeAPI from '../../../api/services/activityType';

const EditExercise = ({update, summaryData, handleClose}) => {
  const navigate = useNavigate();
  const [activitiesTypeList, setActivitiesTypeList] = useState([]);
  const [selectedActivityType, setSelectedActivityType] = useState()
  const [activitiesTypeData, setActivitiesTypeData] = useState([]);
  // const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({
    id: summaryData._id,
    activity_type_id: selectedActivityType,
    caption: summaryData.caption,
    description: summaryData.description,
    hour: summaryData.hour,
    minute: summaryData.minute,
    date: summaryData.date,
    image: summaryData.image
  });

  const [formErrors, setFormErrors] = useState({
    id: "",
    activity_type_id: "",
    caption: "",
    description: "",
    hour: "",
    minute: "",
    date: "",
    image: ""
  });

  // For get Type Activity
  useEffect(() => {
    getActivityTypeById();
    getActivitiesTypeList()
  }, [selectedActivityType]);

    
  // Get Activity Type List
  const getActivitiesTypeList  = async () => {
    const response = await ActivityTypeAPI.getActivitiesTypeList();
    if (response.status === 200 && response.data.data) {
      setActivitiesTypeList([...response.data.data]);
    }
  };

  const getActivityTypeById = async () => {

    const id = summaryData.activity_type_id;
    const response = await ActivityTypeAPI.getActivityTypeById(id)
    if (response.success === true && response.data) {
      setActivitiesTypeData(response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'activity_type_id') {
      setSelectedActivityType(value);
    }
  };

  // Link to History
  // const BackToHistory = async (id) => {
  //       navigate("/history");        
  // };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.activity_type_id === null) {
      errors.activity_type_id = "Activity Type is required";
      isValid = false;
    }
    if (!formData.caption === null) {
      errors.caption = "Caption is required";
      isValid = false;
    }

    if (!formData.description === null) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.hour === null) {
      errors.hour = "Hour is required";
      isValid = false;
    }

    if (!formData.minute === null) {
      errors.minute = "Minute is required";
      isValid = false;
    }
    if (!formData.date === null) {
      errors.date = "Date is required";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      update(formData);
      console.log("Form data submitted:", formData);
    } else {
      console.log(formErrors)
      console.log("Form submission failed due to validation errors.");
    }
  }
    
  return (
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
          <input type="hidden" id="id" name="id" value={formData.id} />
          <input type="hidden" id="id" name="id" value={activitiesTypeData.id} />
          <form onSubmit={handleSubmit}>
            <select onChange={handleInputChange} name="activity_type_id" value={formData.activity_type_id} className="focus:ring-none mb-10 border-none block w-full p-2.5 rounded-4xl bg-blue text-white pl-5 pr-5 text-sm">
              <option value="select">Select</option>
              {activitiesTypeList.map((activitiesType) => (
                <option key={activitiesType._id} value={activitiesType._id}>
                  {activitiesType.name}
                </option>
              ))}
            </select>
            <span className="error text-red">{activitiesTypeData.name}</span>
            <div className="flex flex-col w-full bg-white border border-grey rounded-main">
              <div className="text-pink font-semibold bold p-5 flex justify-start">
                <label htmlFor="caption">Your caption</label>
              </div>
              <textarea
                id="caption"
                rows="1"
                name="caption"
                className="resize-none placeholder-grey outline-0 block p-5 w-full text-sm rounded-card border-b border-grey"
                placeholder="Type some caption here..."
                value={formData.caption} onChange={handleInputChange}
              ></textarea>
              <span className="error text-red">{formErrors.caption}</span>
              <div className="flex justify-center">
                <img className="w-80 h-full object-cover" src={formData.image} alt="The group of women are running" /> 
                {/* <img className="w-80 h-full object-cover" src={createExercise} alt="The group of women are running" /> */}
              </div>
              <div className="text-pink font-semibold bold p-5 flex justify-start">
                <label htmlFor="description">Description</label>
              </div>
              <textarea
                id="description"
                rows="5"
                name="description"
                className="resize-none placeholder-grey-dark outline-0 block p-5 w-full text-sm border-grey rounded-main"
                placeholder="Type some description here..."
                value={formData.description} onChange={handleInputChange}
              ></textarea>
              <span className="error text-red">{formErrors.description}</span>
            </div>

            <div className="gap-2 mt-5 mb-5 flex justify-center">
              <label htmlFor="duration">Duration: </label>
              <input type="number" name="hour" placeholder="Hour" className="border" 
              value={formData.hour} onChange={handleInputChange}/>
              <span className="error text-red">{formErrors.hour}</span>

              <input type="number" name="minute" placeholder="Minute" className="border" 
              value={formData.minute} onChange={handleInputChange}/>
              <span className="error text-red">{formErrors.minute}</span>
            </div>
            <div className="gap-2 mb-5 flex justify-center">
              <label htmlFor="date">Date: </label>
              <input type="date" name="date" className="border" 
                      value={formData.date} onChange={handleInputChange} />
              <span className="error text-red">{formErrors.date}</span>
            </div>

            <button type="submit"className="mb-6 text-white rounded-4xl bg-pink text-lg w-full py-1 text-center">
              Update
            </button>
            {/* <button onClick={() => BackToHistory(id)} type="submit" 
            className="mb-6 text-white rounded-4xl bg-pink text-lg w-full py-1 text-center"
            >              
                Update
            </button> */}
            <button onClick={handleClose}>Close</button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EditExercise