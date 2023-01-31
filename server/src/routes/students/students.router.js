const express = require("express");
const asyncHandler = require("express-async-handler");

const authz = require("../../middleware/authz.middleware");
const {
  validateStudentCreation,
} = require("../../middleware/validation.middleware");

const { httpCreateStudent } = require("./students.controller");

const studentsRouter = express.Router();

studentsRouter.post(
  "/",
  authz("admin"),
  validateStudentCreation,
  asyncHandler(httpCreateStudent)
);

module.exports = studentsRouter;
