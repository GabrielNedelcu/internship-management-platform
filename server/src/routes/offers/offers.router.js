const express = require("express");
const asyncHandler = require("express-async-handler");
const authz = require("../../middleware/authz.middleware");

const {
  httpCreateOffer,
  httpGetOneOffer,
  httpDeleteOffer,
  httpGetAllOffers,
  httpGetOneOfferStats,
} = require("./offers.controller");

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
  authz(["admin", "student", "company"]),
  asyncHandler(httpGetAllOffers)
);

offersRouter.get(
  "/:offerId",
  authz(["admin", "student", "company"]),
  asyncHandler(httpGetOneOffer)
);

offersRouter.get(
  "/:offerId/stats",
  authz(["company"]),
  asyncHandler(httpGetOneOfferStats)
);

offersRouter.delete(
  "/:offerId",
  authz(["admin"]),
  asyncHandler(httpDeleteOffer)
);

module.exports = offersRouter;
