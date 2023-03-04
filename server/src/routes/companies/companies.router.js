const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");
const auth = require("../../middleware/auth.middleware");

const {
  httpPatchCompany,
  httpCreateCompany,
  httpGetOneCompany,
  httpGetAllCompanies,
} = require("./companies.controller");
const {
  validatePatchCompany,
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

companiesRouter.patch(
  "/:companyId",
  auth,
  authz(["admin"]),
  validatePatchCompany,
  asyncHandler(httpPatchCompany)
);

companiesRouter.get(
  "/:companyId",
  auth,
  authz(["admin", "student"]),
  asyncHandler(httpGetOneCompany)
);

module.exports = companiesRouter;
