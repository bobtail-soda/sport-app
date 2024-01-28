import express from "express";
import authController from "../controllers/authController.mjs";
const authRouter = express.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/signup").post(authController.signup);

//TODO: Do not yet handle
// Protecting a route
// app.get("/profile", auth, (req, res) => {
//   console.log(req.user);
//   res.json({ data: { email: req.user.id } });
// });

// app.get("/secret", auth, (req, res) => {
//   res.json({ data: { message: "Welcome to the secret area." } });
// });

// app.get("/public", (req, res) => {
//   res.json({ data: { message: "Welcome to the public area." } });
// });

export default authRouter;

