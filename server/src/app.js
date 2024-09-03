import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Router/routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// router declaration
app.use("/api/v1/battledore", userRouter);
export { app };
