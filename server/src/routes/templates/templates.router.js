const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");

const { httpGetAnnex1 } = require("./templates.controller");

const templatesRouter = express.Router();

templatesRouter.get(
  "/annex_1",
  authz(["admin", "company"]),
  asyncHandler(httpGetAnnex1)
);

module.exports = templatesRouter;
