const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");
const {
  validateStudentCreation,
  validateStudentSelfPatch,
} = require("../../middleware/validation.middleware");

const {
  httpGetStudentCV,
  httpCreateStudent,
  httpGetAllStudents,
  httpGetSelfStudent,
  httpPatchSelfStudent,
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

studentsRouter.get(
  "/",
  authz(["admin", "company"]),
  asyncHandler(httpGetAllStudents)
);

studentsRouter.get(
  "/:studentId/cv",
  authz(["admin", "company"]),
  asyncHandler(httpGetStudentCV)
);

studentsRouter.patch(
  "/self",
  authz("student"),
  validateStudentSelfPatch,
  expressFileUpload(),
  asyncHandler(httpPatchSelfStudent)
);

studentsRouter.get("/self", authz("student"), asyncHandler(httpGetSelfStudent));

module.exports = studentsRouter;
