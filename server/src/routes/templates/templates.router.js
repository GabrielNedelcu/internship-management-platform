const express = require("express");
const asyncHandler = require("express-async-handler");
const expressFileUpload = require("express-fileupload");

const authz = require("../../middleware/authz.middleware");

const {
  httpGetAnnex1,
  httpGetTripartit,
  httpGetAnnex7,
  httpGetAnnex2,
  httpGetAnnex3,
} = require("./templates.controller");

const templatesRouter = express.Router();

templatesRouter.get(
  "/annex_1",
  authz(["admin", "company"]),
  asyncHandler(httpGetAnnex1)
);

templatesRouter.get(
  "/tripartit",
  authz(["admin", "student"]),
  asyncHandler(httpGetTripartit)
);

templatesRouter.get(
  "/annex_7",
  authz(["admin", "student"]),
  asyncHandler(httpGetAnnex7)
);

templatesRouter.get(
  "/annex_2",
  authz(["admin", "student"]),
  asyncHandler(httpGetAnnex2)
);

templatesRouter.get(
  "/annex_3",
  authz(["admin", "student"]),
  asyncHandler(httpGetAnnex3)
);

module.exports = templatesRouter;
