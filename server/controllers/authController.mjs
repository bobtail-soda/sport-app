import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

import { User } from "../models/user.js";
import { auth } from "../middlewares/auth.js";

const signup = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user already exists
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: { message: "user already exists" } });
    }
  
    // Hash password
    const saltRounds = 12;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
  
    // Store new user in database with hashed password
    const user = new User({ email, password: hashedPassword });
    user.save();
  
    res.json({
      data: {
        email: user.email,
      },
    });
  }


const login = (req, res) => {
  const { email, password } = req.body;

  // Fetch user from database
  const user = User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .send({ error: { message: "Invalid email or password" } });
  }

  // Check password
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .send({ error: { message: "Invalid email or password" } });
  }

  res.send({ token: createJwt(email) });
}

function createJwt(email) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ id: email }, jwtSecretKey, {
    expiresIn: "1h",
  });

  return token;
}



export default {
    login,
    signup
}