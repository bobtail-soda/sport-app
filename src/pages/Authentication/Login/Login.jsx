import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import API from '../../../api/axios';


import { 
    Box,
    Container,
    Grid,
    Typography,
    ThemeProvider,
  } from "@mui/material"
  
import LoginImg from "/images/login.jpg"
import { theme } from "../../../theme"
import { Link } from "react-router-dom"
    
  const Login = () => {
    const navigate = useNavigate();
    const authRoute = "login";
    
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const [formErrors, setFormErrors] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        //call api login
        loginApi(formData);
        console.log("Form data submitted:", formData);
      } else {
        console.log("Form submission failed due to validation errors.");
      }
    }

    const validateForm = () => {
      let errors = {};
      let isValid = true;
  
      if (!formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
      }
  
      if (!formData.password.trim()) {
        errors.password = "Password is required";
        isValid = false;
      }
  
      setFormErrors(errors);
      return isValid;
    };


    const loginApi = async ({email, password}) => {
      const requestData = {
        email : email,
        password : password
      }
      const response = await API.post(`${authRoute}`, requestData);// [POST] https://localhost:5000/login , requestData

      if (response.status === 200) {
        const { token } = response.data;
        // Store the tokens in localStorage or secure cookie for later use
        localStorage.setItem('token', token);
        navigate("/dashboard");
      }
  };
  
    return (
      <>
      <ThemeProvider theme={ theme }>
        <Container
          sx={{
            height: '100vh',          
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Box
            sx={{
              width: 760,
              height: 480,
              borderRadius: '20px',
              bgcolor: 'primary.white',
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
            >
  
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${LoginImg})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: 380,
                height: 480,
                borderRadius: '18px 0 0 18px',
              }}
            />

            <Grid item xs={false} sm={4} md={7} 
              sx={{
                fontFamily: 'Inter',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                border: 2,
                borderLeft: 0,
                borderColor: 'primary.main',
                borderRadius: '0 18px 18px 0',
                p: 4,
                
              }}>
                <Box sx={{
                  width: '100%',
                }}>
                  <Typography variant="h5" component="h1" sx={{fontWeight: 'medium'}}>
                    Login
                  </Typography>
                  <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                      <label htmlFor="email" 
                            className="text-left block mb-3 mt-6 text-sm"
                      >
                            Username or email
                      </label>
                      <input type="text" id="email" name="email"
                            className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5" 
                            placeholder="Username or email" 
                            value={formData.email}
                            onChange={handleInputChange}
                             />
                      <span className="mt-1 text-sm block text-left error text-red">{formErrors.email}</span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" 
                            className="text-left block mb-3 text-sm"
                      >
                        Password
                      </label>
                      <input type="password" id="password" name="password"
                            className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-sm block w-full p-2.5" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={handleInputChange}
                             />
                      <span className="mt-1 text-sm block text-left error text-red">{formErrors.password}</span>
                    </div>
                    <div className="flex items-start mb-8">
                      <p className="text-pink text-sm">
                        <Link to="/forgot-password">Forgot password?</Link>
                      </p>
                    </div>
                    <div className="mb-5">
                        <button type="submit" 
                                className="rounded-4xl text-white bg-pink text-sm w-full px-5 py-2.5 text-center"
                                >
                                {/* <Link to="/dashboard"> */}
                                  Login
                                {/* </Link> */}
                        </button>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-300">Don’t have an account ? <Link to="/signup" className="text-pink">Sign up</Link></p>
                  </form>
              </Box>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
      </>
    )
  }
  
  export default Login
  