const express = require("express");
const asyncHandler = require("express-async-handler");

const authz = require("../../middleware/authz.middleware");
const {
  validateInternshipPatch,
} = require("../../middleware/validation.middleware");

const {
  httpGetInternships,
  httpPatchInternship,
} = require("./internships.controller");

const internshipsRouter = express.Router();

internshipsRouter.get("/", authz(["admin"]), asyncHandler(httpGetInternships));
internshipsRouter.patch(
  "/:internshipId",
  authz(["admin"]),
  validateInternshipPatch,
  asyncHandler(httpPatchInternship)
);

module.exports = internshipsRouter;
