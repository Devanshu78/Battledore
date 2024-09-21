import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Router/routes.js";
import http from "http";
import { Server } from "socket.io";

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);
  socket.on("update_score", (data) => {
    console.log(data);
    io.emit("score_updated", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
  });
});

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

export { server };
