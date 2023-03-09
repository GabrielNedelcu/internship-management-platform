const {
  createApplication,
  getAllApplications,
  getOneApplication,
  queryApplications,
} = require("../../models/applications/applications.model");
const { getOneCompany } = require("../../models/companies/companies.model");
const {
  getOneOffer,
  updateOneOffer,
} = require("../../models/offers/offers.model");
const {
  getSort,
  getPagination,
  getProjection,
} = require("../../utils/query.utils");

/**
 *
 * @api {POST} /applications/
 * @apiDescription Create a new application for an user to an offer
 * oly if the user had not already applied to that offer
 *
 * @apiBody     {Object}                The data needed to create a new application
 * @apiSuccess  {Object}                The new object (created application)
 */
async function httpCreateApplication(req, res) {
  const applicationData = req.body;
  const student = req.userId;

  const alreadyExistingApplication = await queryApplications(
    {
      student: student,
      offer: applicationData.offer,
      company: applicationData.company,
    },
    { _id: 1 }
  );

  if (alreadyExistingApplication.totalCount) {
    const err = new Error("Student has already applied to this offer");
    err.statusCode = 409;
    throw err;
  }

  const offer = await getOneOffer(applicationData.offer, {
    title: 1,
    applications: 1,
  });
  const company = await getOneCompany(applicationData.company, { name: 1 });

  const application = await createApplication({
    ...applicationData,
    student,
    companyName: company.name,
    offerTitle: offer.title,
  });
  if (!application) {
    const err = new Error("Unable to create an application");
    throw err;
  }

  await updateOneOffer(applicationData.offer, {
    applications: ++offer.applications,
  });

  return res.status(201).json(application);
}

/**
 *
 * @api {GET} /applications
 * @apiDescription Get the applications
 *
 * @apiSuccess  {Object[]}  All the existing applications
 */
async function httpGetAllApplications(req, res) {
  const userId = req.userId;
  const userRole = req.userRole;
  const searchFor = req.query.search;

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  const regex = new RegExp(searchFor, "i");

  let query = {
    $or: [
      { offerTitle: { $regex: regex } },
      { companyName: { $regex: regex } },
    ],
  };

  if (userRole === "student") query = { ...query, student: userId };

  const resp = await queryApplications(
    query,
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
 * @api {GET} /applications/:applicationId
 * @apiDescription Get the data of an application
 *
 * @apiParam    {String}    companyId   Application's unique ObjectId
 * @apiSuccess  {Object}                The data of the Application
 */
async function httpGetApplication(req, res) {
  const applicationId = req.params.applicationId;

  const application = await getOneApplication(applicationId);
  if (!application) {
    const err = new Error("Application not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(application);
}

module.exports = {
  httpCreateApplication,
  httpGetAllApplications,
  httpGetApplication,
};