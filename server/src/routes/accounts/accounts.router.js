const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  httpPatchPassword,
  httpGetPasswordConfirmation,
} = require("./accounts.controller");

const {
  validatePasswordReset,
} = require("../../middleware/validation.middleware");

const accountsRouter = express.Router();

accountsRouter.get(
  "/password/confirmation/:token",
  asyncHandler(httpGetPasswordConfirmation)
);
accountsRouter.patch(
  "/password",
  validatePasswordReset,
  asyncHandler(httpPatchPassword)
);

module.exports = accountsRouter;
