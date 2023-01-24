const logger = require("../../config/logger.config");

const { createAccount } = require("../../models/accounts/accounts.model");
const { createCompany } = require("../../models/companies/companies.model");
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

  // create the company
  const company = await createCompany({ _id: account._id, ...companyData });
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

module.exports = { httpCreateCompany };
