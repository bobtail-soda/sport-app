import { Router as expressRouter } from "express";

const router = expressRouter();

// auth routes
import authRouter from "./authRoutes.mjs";

router.use("/auth", authRouter);

export default router;