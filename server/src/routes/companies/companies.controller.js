const logger = require("../../config/logger.config");

const {
  createAccount,
  deleteOneAccount,
} = require("../../models/accounts/accounts.model");
const {
  queryApplications,
  deleteOneApplication,
} = require("../../models/applications/applications.model");
const {
  createCompany,
  getOneCompany,
  queryCompanies,
  updateOneCompany,
  countCompanies,
  deleteOneCompany,
} = require("../../models/companies/companies.model");
const {
  getAllInternships,
  queryInternships,
} = require("../../models/internships/internships.model");
const {
  createOffer,
  queryOffers,
  deleteOneOffer,
} = require("../../models/offers/offers.model");
const {
  uploadFilesFromRequest,
  downloadUploadedFile,
  deleteUploadedFile,
} = require("../../utils/files.utils");
const {
  getSort,
  getPagination,
  getProjection,
} = require("../../utils/query.utils");

/**
 *
 * @api {POST} /companies/
 * @apiDescription Create a new company based on the request's body
 *
 * @apiBody     {Object}                The data needed to create a new company
 * @apiSuccess  {Object}                The new object (created company)
 */
async function httpCreateCompany(req, res) {
  const companyData = req.body;

  // Created the associated account first
  const accountData = {
    email: companyData.accountEmail,
    password: companyData.accountPassword,
    role: "company",
    password_changed: true,
  };

  const account = await createAccount(accountData);
  if (!account) {
    const err = new Error("Unable to create an account");
    throw err;
  }

  logger.info(`Created account with id ${account._id}`);

  // remove account data and offer data from company data
  delete companyData.accountEmail;
  delete companyData.accountPassword;
  delete companyData.accountPassword_confirmation;

  const offers = companyData.offers;
  delete companyData.offers;

  let numPositions = 0;
  offers.forEach((offer) => {
    numPositions += offer.availablePos;
  });

  // create the company
  const company = await createCompany({
    _id: account._id,
    ...companyData,
    numOffers: offers.length,
    numPositions,
    email: accountData.email,
  });
  logger.info(`Created company with id ${account._id}`);

  // create the associated offers
  let createdOffers = [];
  for await (const offer of offers) {
    const offerData = {
      companyID: account._id,
      ...offer,
      companyName: companyData.name,
    };
    const createdOffer = await createOffer(offerData);

    createdOffers.push(createdOffer);
    logger.info(`Created offer with id ${createdOffer._id}`);
  }

  //TODO: send mail to all admin users to notify the new company sign up request

  return res.status(201).json({ ...company._doc, offers: createdOffers });
}

/**
 * @api {GET} /companies/
 * @apiDescription Get all the companies
 * @apiParam validated - if the company has been validated or not
 * parameter available only for ADMIN
 *
 *
 * @apiSuccess array with the requested data or 204 if no company was found
 */
async function httpGetAllCompanies(req, res) {
  const userRole = req.userRole;
  const validated = req.query.validated || true;
  const companyName = req.query.company || "";
  const searchFor = req.query.search;
  const fieldOfWork = req.query.fieldOfWork;

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  if (userRole !== "admin" && validated === false) {
    return res
      .status(403)
      .send({ err: "You are not permitted to access this resource!" });
  }

  const regex = new RegExp(companyName, "i");
  const searchRegex = new RegExp(searchFor, "i");

  let query = searchFor
    ? {
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      }
    : { name: { $regex: regex } };

  if (fieldOfWork) query = { ...query, fieldOfWork };

  const companies = await queryCompanies(
    { ...query, validated },
    projection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  // if (!companies.totalCount) return res.status(204).send();

  return res.status(200).json(companies);
}

/**
 *
 * @api {PATCH} /companies/:companyID
 * @apiDescription Update a company. Available only for ADMIN
 *
 * @apiParam    {String}    companyID       id of the company to be updated
 */
async function httpPatchCompany(req, res) {
  const companyId = req.params.companyId;
  const newData = req.body;

  const company = await getOneCompany(companyId);
  if (!company) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  let data = newData;
  if (req.files) {
    const fileName = `${companyId}.pdf`;
    await uploadFilesFromRequest(req, "company_contracts", fileName);
    data = { ...newData, annex: fileName };
  }

  await updateOneCompany(companyId, data);

  //TODO: if "validated" field has changed, send email

  return res.status(204).send();
}

/**
 *
 * @api {GET} /companies/:companyID
 * @apiDescription Get one company
 *
 * @apiParam    {String}    companyID       id of the company to be fetched
 */
async function httpGetOneCompany(req, res) {
  const companyId = req.params.companyId;
  const userRole = req.userRole;
  const projection = getProjection(req.query);

  if (companyId === "count") return httpGetCompaniesCount(req, res);

  if (userRole === "company" && companyId !== req.userId) {
    const err = new Error("You are not allowed to access this resource");
    err.statusCode = 403;
    throw err;
  }

  const company = await getOneCompany(companyId, projection);

  if (!company) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  if (company.validated === false && userRole === "student") {
    const err = new Error("You are not allowed to access this resource");
    err.statusCode = 403;
    throw err;
  }

  return res.status(200).json(company);
}

/**
 *
 * @api {DELETE} /companies/:companyID
 * @apiDescription Delete one company
 *
 * @apiParam    {String}    companyID       id of the company to be deleted
 * @apiSuccess  200 OK
 */
async function httpDeleteCompany(req, res) {
  const companyId = req.params.companyId;

  const company = await getOneCompany(companyId, { _id: 1, annex: 1 });
  if (!company) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  const internships = await queryInternships({ company: companyId });
  if (internships.totalCount) {
    const err = new Error(
      "Cannot delete company! There are already internships created based on this company!"
    );
    err.statusCode = 400;
    throw err;
  }

  // delete all the company offers
  const offers = await queryOffers({ companyID: companyId }, { _id: 1 });
  for await (const offer of offers) {
    await deleteOneOffer(offer._id);
  }

  // delete all the applications to this company
  const applications = await queryApplications(
    { company: companyId },
    { _id: 1 }
  );
  if (applications.totalCount)
    for await (const application of applications.data) {
      await deleteOneApplication(application._id);
    }

  //delete the company contract
  if (company.annex)
    await deleteUploadedFile("company_contracts", company.annex);

  // delete the account
  await deleteOneAccount(companyId);

  //finally delete company
  await deleteOneCompany(companyId);

  return res.status(200).send();
}

/**
 *
 * @api {GET} /companies/count
 * @apiDescription Get the applications count
 *
 * @apiSuccess  {Object}     count of all documents
 */
async function httpGetCompaniesCount(req, res) {
  const userRole = req.userRole;

  if (userRole !== "admin") {
    const err = new Error("Unathorized");
    err.statusCode = 403;
    throw err;
  }

  const count = await countCompanies();

  return res.status(200).json({ count });
}

/**
 * @api {GET} /company/:companyId/contract
 * @apiDescription Get the contract of a company
 *
 * @apiSuccess 204
 */
async function httpGetCompanyContract(req, res) {
  const companyId = req.params.companyId;

  const companyData = await getOneCompany(companyId, { annex: 1 });

  if (!companyData) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  return downloadUploadedFile(res, "company_contracts", companyData.annex);
}

module.exports = {
  httpCreateCompany,
  httpPatchCompany,
  httpDeleteCompany,
  httpGetOneCompany,
  httpGetAllCompanies,
  httpGetCompanyContract,
};
