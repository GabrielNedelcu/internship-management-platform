const { getOffersStats } = require("../../models/companies/companies.model");

const {
  createOffer,
  getOneOffer,
  getCompanyOffers,
  getValidatedOffers,
  deleteOneOffer,
} = require("../../models/offers/offers.model");
const {
  queryApplications,
} = require("../../models/applications/applications.model");
const {
  getSort,
  getPagination,
  getProjection,
} = require("../../utils/query.utils");
const {
  queryInternships,
} = require("../../models/internships/internships.model");

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

/**
 *
 * @api {DELETE} /offers/:offerId
 * @apiDescription Delete an offer
 */
async function httpDeleteOffer(req, res) {
  const offerId = req.params.offerId;

  const offer = await getOneOffer(offerId);
  if (!offer) {
    const err = new Error("Offer not found");
    err.statusCode = 404;
    throw err;
  }

  const internships = await queryInternships({ offer: offerId });
  if (internships.totalCount) {
    const err = new Error(
      "Cannot delete the offer. There are already internships based on this offer"
    );
    err.statusCode = 400;
    throw err;
  }

  // delete all the applications to the offer
  const applications = await queryApplications({ offer: offerId }, { _id: 1 });
  if (applications.totalCount)
    for await (const application of applications.data) {
      await deleteOneApplication(application._id);
    }

  await deleteOneOffer(offerId);

  return res.status(200).send();
}

async function httpGetAllOffers(req, res) {
  const userRole = req.userRole;
  const userId = req.userId;

  const companyID = req.query.company;
  const searchFor = req.query.search;

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  if (companyID) {
    if (userRole === "company" && userId !== companyID) {
      const err = new Error("Unauthorized");
      err.statusCode = 404;
      throw err;
    }

    const regex = new RegExp(searchFor, "i");
    const resp = await getCompanyOffers(
      { companyID, title: { $regex: regex } },
      projection,
      sortBy,
      sortOrder,
      skipCount,
      pageSize
    );

    if (!resp.totalCount) return res.status(204).send();

    return res.status(200).json(resp);
  }

  const resp = await getValidatedOffers(
    searchFor,
    projection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  if (!resp.totalCount) return res.status(204).send();

  return res.status(200).json(resp);
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

  if (offerId === "stats") return httpGetOffersStats(req, res);

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

    offer._doc.application = application.data[0]?._id;
    return res.status(200).json(offer);
  }

  return res.status(200).json(offer);
}

/**
 *
 * @api {GET} /offers/stats
 * @apiDescription Get statistics about the offers
 *
 * @apiSuccess  {Object}     stats about the offers
 */
async function httpGetOffersStats(req, res) {
  const userRole = req.userRole;

  if (userRole !== "admin") {
    const err = new Error("Unathorized");
    err.statusCode = 403;
    throw err;
  }

  const stats = await getOffersStats();

  return res.status(200).json(stats[0]);
}

/**
 *
 * @api {GET} /offers/:offerId/stats
 * @apiDescription Get the statistics of one offer
 *
 * @apiParam    {String}    offerId       id of the offer to be fetched
 */
async function httpGetOneOfferStats(req, res) {
  const offerId = req.params.offerId;
  const projection = getProjection(req.query);
  const userId = req.userId;

  const offer = await getOneOffer(offerId, projection);

  if (!offer) {
    const err = new Error("Offer not found");
    err.statusCode = 404;
    throw err;
  }

  const response = {
    available: offer.remainingAvailablePos,
    offered: offer.availablePos,
    applications: offer.applications,
  };

  const rejectedApplications = await queryApplications(
    { offer: offerId, company: userId, status: "companyDeclined" },
    { _id: 1 }
  );

  const acceptedApplications = await queryApplications(
    { offer: offerId, company: userId, status: "companyAccepted" },
    { _id: 1 }
  );

  return res.status(200).json({
    ...response,
    rejected: rejectedApplications.totalCount,
    accepted: acceptedApplications.totalCount,
  });
}

module.exports = {
  httpCreateOffer,
  httpGetOneOffer,
  httpDeleteOffer,
  httpGetAllOffers,
  httpGetOneOfferStats,
};
