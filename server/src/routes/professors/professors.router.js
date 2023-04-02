const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");
const {
  validateProfessorCreation,
} = require("../../middleware/validation.middleware");

const {
  httpCreateProfessor,
  httpGetOneProfessor,
  httpDeleteProfessor,
  httpGetAllProfessors,
  httpPatchOneProfessor,
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

professorsRouter.get(
  "/:professorId",
  authz(["admin"]),
  asyncHandler(httpGetOneProfessor)
);

professorsRouter.patch(
  "/:professorId",
  authz(["admin"]),
  asyncHandler(httpPatchOneProfessor)
);

professorsRouter.delete(
  "/:professorId",
  authz(["admin"]),
  asyncHandler(httpDeleteProfessor)
);

module.exports = professorsRouter;
