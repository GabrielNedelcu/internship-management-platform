const express = require("express");
const asyncHandler = require("express-async-handler");

const { httpCreateCompany } = require("./companies.controller");
const {
  validateCompanyCreation,
} = require("../../middleware/validation.middleware");

const companiesRouter = express.Router();

companiesRouter.post(
  "/",
  validateCompanyCreation,
  asyncHandler(httpCreateCompany)
);

module.exports = companiesRouter;
