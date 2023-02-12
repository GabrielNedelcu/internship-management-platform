const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");
const {
  validateProfessorCreation,
} = require("../../middleware/validation.middleware");

const {
  httpCreateProfessor,
  httpGetAllProfessors,
  httpCreateMultipleProfessors,
} = require("./professors.controller");

const professorsRouter = express.Router();

professorsRouter.post(
  "/",
  authz("admin"),
  validateProfessorCreation,
  asyncHandler(httpCreateProfessor)
);

professorsRouter.post(
  "/multiple",
  authz("admin"),
  expressFileUpload(),
  asyncHandler(httpCreateMultipleProfessors)
);

professorsRouter.get("/", authz(["admin"]), asyncHandler(httpGetAllProfessors));

module.exports = professorsRouter;
