const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");
const {
  validateStudentCreation,
} = require("../../middleware/validation.middleware");

const {
  httpCreateStudent,
  httpCreateMultipleStudents,
} = require("./students.controller");

const studentsRouter = express.Router();

studentsRouter.post(
  "/",
  authz("admin"),
  validateStudentCreation,
  asyncHandler(httpCreateStudent)
);

studentsRouter.post(
  "/multiple",
  authz("admin"),
  expressFileUpload(),
  asyncHandler(httpCreateMultipleStudents)
);

module.exports = studentsRouter;
