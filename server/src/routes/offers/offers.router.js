const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");

const { httpCreateOffer, httpGetAllOffers } = require("./offers.controller");

const {
  validateOfferCreation,
} = require("../../middleware/validation.middleware");

const offersRouter = express.Router();

offersRouter.post(
  "/",
  authz("admin"),
  // validateOfferCreation,
  asyncHandler(httpCreateOffer)
);

offersRouter.get(
  "/",
  authz(["admin", "student"]),
  asyncHandler(httpGetAllOffers)
);

module.exports = offersRouter;
