require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const http = require("http").Server(app);
const cors = require("cors");
let tasks = require("./data");
const {
  createTask,
  taskDragged,
  addComment,
  fetchComments,
} = require("./socket");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createTask", (data) => {
    createTask(socketIO, data, tasks);
  });

  socket.on("taskDragged", (data) => {
    taskDragged(socketIO, data, tasks);
  });

  socket.on("addComment", (data) => {
    addComment(socket, data, tasks);
  });

  socket.on("fetchComments", (data) => {
    fetchComments(socket, data, tasks);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

// host the tasks object via the /api route
app.get("/api", (req, res) => {
  res.json(tasks);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
