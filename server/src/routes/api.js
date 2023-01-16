const express = require("express");

const authRouter = require("./auth/auth.router");

const api = express.Router();

api.use("/auth", authRouter);

module.exports = api;
