const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");

const {
  httpGetApplication,
  httpCreateApplication,
  httpGetAllApplications,
  httpPatchApplication,
} = require("./applications.controller");

const {
  validateApplicationPatch,
  validateApplicationCreation,
} = require("../../middleware/validation.middleware");

const applicationsRouter = express.Router();

applicationsRouter.post(
  "/",
  authz(["student"]),
  validateApplicationCreation,
  asyncHandler(httpCreateApplication)
);

applicationsRouter.get(
  "/",
  authz(["admin", "student", "company"]),
  asyncHandler(httpGetAllApplications)
);

applicationsRouter.get("/:applicationId", asyncHandler(httpGetApplication));

applicationsRouter.patch(
  "/:applicationId",
  validateApplicationPatch,
  asyncHandler(httpPatchApplication)
);

module.exports = applicationsRouter;
