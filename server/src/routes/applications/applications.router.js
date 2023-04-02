const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");

const {
  httpGetApplication,
  httpPatchApplication,
  httpCreateApplication,
  httpDeleteApplication,
  httpGetAllApplications,
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

applicationsRouter.delete(
  "/:applicationId",
  asyncHandler(httpDeleteApplication)
);

module.exports = applicationsRouter;
