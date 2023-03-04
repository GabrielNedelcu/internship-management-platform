const { getOneCompany } = require("../../models/companies/companies.model");

const {
  createOffer,
  queryOffers,
  getOneOffer,
  getValidatedOffers,
} = require("../../models/offers/offers.model");
const {
  queryApplications,
} = require("../../models/applications/applications.model");
const {
  getSort,
  getPagination,
  getProjection,
} = require("../../utils/query.utils");

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
  const companyID = req.query.company;
  const searchFor = req.query.search;

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  let offers;
  if (userRole === "admin")
    offers = await queryOffers(companyID && { companyID }, {
      _id: 1,
      companyID: 1,
      companyName: 1,
      title: 1,
      departament: 1,
      availablePos: 1,
      remainingAvailablePos: 1,
      applications: 1,
    });
  else {
    const resp = await getValidatedOffers(
      searchFor,
      projection,
      sortBy,
      sortOrder,
      skipCount,
      pageSize
    );

    if (!resp.totalOffers) return res.status(204).send();

    return res.status(200).json(resp);
  }

  const validatedOffers = [];
  for await (const offer of offers) {
    const company = await getOneCompany(offer.companyID, { validated: 1 });
    if (company.validated) validatedOffers.push(offer);
  }

  if (!validatedOffers.length) return res.status(204).send();

  return res.status(200).json(validatedOffers);
}

/**
 *
 * @api {GET} /offers/:offerId
 * @apiDescription Get one offer
 *
 * @apiParam    {String}    offerId       id of the offer to be fetched
 */
async function httpGetOneOffer(req, res) {
  const offerId = req.params.offerId;
  const projection = getProjection(req.query);
  const userId = req.userId;
  const userRole = req.userRole;

  const offer = await getOneOffer(offerId, projection);

  if (!offer) {
    const err = new Error("Offer not found");
    err.statusCode = 404;
    throw err;
  }

  // for students, also retrieve his application
  if (userRole === "student") {
    const application = await queryApplications(
      { offer: offerId, student: userId },
      { _id: 1 }
    );

    offer._doc.application = application[0]?._id;
    return res.status(200).json(offer);
  }

  return res.status(200).json(offer);
}

module.exports = { httpCreateOffer, httpGetAllOffers, httpGetOneOffer };
