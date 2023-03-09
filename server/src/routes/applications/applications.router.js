const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");

const {
  httpCreateApplication,
  httpGetAllApplications,
  httpGetApplication,
} = require("./applications.controller");

const {
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

module.exports = applicationsRouter;
