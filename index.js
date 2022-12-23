const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./src/config/db");
connect();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use("/api/user", require("./src/routes/auth"));
app.use("/api/message", require("./src/routes/message"));
const server = http.createServer(app);
const io = new Server(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket) => {
  socket.on("add-user", (userId) => {
    addUser(userId, socket.id);
    console.log(`User with id : ${socket.id} joined room: ${userId}`);
  });
  socket.on("send-message", (data) => {
    const user = getUser(data.to);
    if (user) {
      io.to(user?.socketId).emit("receive-msg", {
        fromSelf: false,
        message: data.message,
      });
    }
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User disconnected", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *: ${process.env.PORT}`);
});
