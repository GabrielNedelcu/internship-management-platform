const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  httpPatchSelf,
  httpPatchPassword,
  httpHeadCheckEmailUnique,
  httpGetPasswordConfirmation,
} = require("./accounts.controller");

const {
  validatePasswordReset,
  validatePatchSelfAccount,
} = require("../../middleware/validation.middleware");

const auth = require("../../middleware/auth.middleware");

const accountsRouter = express.Router();

accountsRouter.head("/:accountEmail", asyncHandler(httpHeadCheckEmailUnique));

accountsRouter.get(
  "/password/confirmation/:token",
  asyncHandler(httpGetPasswordConfirmation)
);
accountsRouter.patch(
  "/password",
  validatePasswordReset,
  asyncHandler(httpPatchPassword)
);
accountsRouter.patch(
  "/self",
  auth,
  validatePatchSelfAccount,
  asyncHandler(httpPatchSelf)
);
module.exports = accountsRouter;
