const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");
const auth = require("../../middleware/auth.middleware");

const {
  httpCreateCompany,
  httpGetAllCompanies,
} = require("./companies.controller");
const {
  validateCompanyCreation,
} = require("../../middleware/validation.middleware");

const companiesRouter = express.Router();

companiesRouter.post(
  "/",
  validateCompanyCreation,
  asyncHandler(httpCreateCompany)
);

companiesRouter.get(
  "/",
  auth,
  authz(["admin", "student"]),
  asyncHandler(httpGetAllCompanies)
);

module.exports = companiesRouter;
