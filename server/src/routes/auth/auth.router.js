const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  validateLogin,
  validateToken,
} = require("../../middleware/validation.middleware");

const {
  httpPostLogin,
  httpPostTokens,
  httpDeleteLogout,
} = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/login", validateLogin, asyncHandler(httpPostLogin));
authRouter.post("/tokens", asyncHandler(httpPostTokens));
// TODO: protect logout rout to only logged in users
authRouter.delete("/logout", asyncHandler(httpDeleteLogout));

module.exports = authRouter;
