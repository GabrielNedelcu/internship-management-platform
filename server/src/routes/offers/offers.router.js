const express = require("express");
const asyncHandler = require("express-async-handler");

const { httpCreateOffer } = require("./offers.controller");

const {
  validateOfferCreation,
} = require("../../middleware/validation.middleware");

const offersRouter = express.Router();

offersRouter.post(
  "/",
  authz("admin"),
  validateOfferCreation,
  asyncHandler(httpCreateOffer)
);

module.exports = offersRouter;
