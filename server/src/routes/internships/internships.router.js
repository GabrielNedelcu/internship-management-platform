const express = require("express");
const asyncHandler = require("express-async-handler");

const authz = require("../../middleware/authz.middleware");
const {
  validateInternshipPatch,
} = require("../../middleware/validation.middleware");

const {
  httpGetInternship,
  httpGetInternships,
  httpPatchInternship,
} = require("./internships.controller");

const internshipsRouter = express.Router();

internshipsRouter.get("/", authz(["admin"]), asyncHandler(httpGetInternships));
internshipsRouter.patch(
  "/:internshipId",
  authz(["admin", "student"]),
  validateInternshipPatch,
  asyncHandler(httpPatchInternship)
);
internshipsRouter.get(
  "/:internshipId",
  authz(["admin", "company", "student"]),
  asyncHandler(httpGetInternship)
);

module.exports = internshipsRouter;
