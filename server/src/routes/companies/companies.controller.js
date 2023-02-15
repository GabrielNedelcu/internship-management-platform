const logger = require("../../config/logger.config");

const { createAccount } = require("../../models/accounts/accounts.model");
const {
  createCompany,
  getOneCompany,
  queryCompanies,
  updateOneCompany,
} = require("../../models/companies/companies.model");
const { createOffer } = require("../../models/offers/offers.model");

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
    const offerData = { companyID: account._id, ...offer };
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

  console.log(userRole);

  if (userRole !== "admin" && validated === false) {
    return res
      .status(403)
      .send({ err: "You are not permitted to access this resource!" });
  }

  let companies;
  if (userRole === "admin")
    companies = await queryCompanies(
      { validated },
      {
        _id: 1,
        name: 1,
        email: 1,
        fieldOfWork: 1,
        numOffers: 1,
        numPositions: 1,
        createdAt: 1,
      }
    );

  if (!companies.length) return res.status(204).send();

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

  await updateOneCompany(companyId, newData);
  return res.status(204).send();
}

module.exports = { httpCreateCompany, httpGetAllCompanies, httpPatchCompany };
