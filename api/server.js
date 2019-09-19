const express = require("express");
const authRouter = require("../auth/authRouter");
const userRouter = require("../user/userRouter");
const server = express();

server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

module.exports = server;
