const logger = require("../../config/logger.config");

const { getOneCompany } = require("../../models/companies/companies.model");

const {
  createOffer,
  queryOffers,
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

async function httpGetAllOffers(req, res) {
  const userRole = req.userRole;

  let offers;
  if (userRole === "admin")
    offers = await queryOffers(
      {},
      {
        _id: 1,
        companyID: 1,
        companyName: 1,
        title: 1,
        departament: 1,
        availablePos: 1,
        remainingAvailablePos: 1,
        applications: 1,
      }
    );

  const validatedOffers = [];

  for await (const offer of offers) {
    const company = await getOneCompany(offer.companyID);
    if (company.validated) validatedOffers.push(offer);
  }

  if (!validatedOffers.length) return res.status(204).send();

  return res.status(200).json(validatedOffers);
}

module.exports = { httpCreateOffer, httpGetAllOffers };
