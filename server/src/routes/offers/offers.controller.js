const logger = require("../../services/logger");

const {
  createOffer,
  getAllOffers,
  getOneOffer,
} = require("../../models/offers/offers.model");

/**
 *
 * @api {POST} /offers/
 * @apiDescription Create a new offer
 *
 * @apiBody     {Object}                The data needed to create a new offer
 * @apiSuccess  {Object}                The new object (created offer)
 */
async function httpCreateOffer(req, res) {
  const offerData = req.body;
  const offer = await createOffer(offerData);
  if (!offer) {
    const err = new Error("Unable to create an offer");
    throw err;
  }

  return res.status(201).json(offer);
}

module.exports = { httpCreateOffer, httpGetAllOffers, httpGetOffer };
