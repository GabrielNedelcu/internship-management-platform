const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");
const {
  validateInternshipPatch,
} = require("../../middleware/validation.middleware");

const {
  httpGetInternship,
  httpGetInternships,
  httpPatchInternship,
  httpDownloadDocument,
} = require("./internships.controller");

const internshipsRouter = express.Router();

internshipsRouter.get(
  "/",
  authz(["admin", "company"]),
  asyncHandler(httpGetInternships)
);

internshipsRouter.patch(
  "/:internshipId",
  authz(["admin", "student"]),
  validateInternshipPatch,
  expressFileUpload(),
  asyncHandler(httpPatchInternship)
);

internshipsRouter.get(
  "/:internshipId",
  authz(["admin", "company", "student"]),
  asyncHandler(httpGetInternship)
);

internshipsRouter.get(
  "/:internshipId/documents",
  authz(["admin", "student"]),
  asyncHandler(httpDownloadDocument)
);

module.exports = internshipsRouter;
