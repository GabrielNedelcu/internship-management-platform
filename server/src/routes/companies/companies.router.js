const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");
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
  authz(["admin", "company"]),
  validatePatchCompany,
  expressFileUpload(),
  asyncHandler(httpPatchCompany)
);

companiesRouter.get(
  "/:companyId",
  auth,
  authz(["admin", "student", "company"]),
  asyncHandler(httpGetOneCompany)
);

module.exports = companiesRouter;
