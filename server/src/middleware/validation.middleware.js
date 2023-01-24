const validator = require("../config/validator.config");

/**
 * Validate the request body in order to login a user
 * Endpoint in scope: {POST} /auth/login
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateLogin(req, res, next) {
  const validationRule = {
    email: "required|email",
    password: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, success) => {
    if (success) {
      next();
    } else {
      res.status(412).send({
        message: "Validation failed",
        data: err,
      });
    }
  });
}

/**
 * Validate the request body in order to reset an account's password
 * Endpoint in scope: {PATCH} /accounts/password
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validatePasswordReset(req, res, next) {
  const validationRule = {
    email: "required|email",
    accountID: "string",
    newPassword: "string|required_with:accountID",
  };

  await validator(req.body, validationRule, {}, (err, success) => {
    if (success) {
      next();
    } else {
      res.status(412).send({
        message: "Validation failed",
        data: err,
      });
    }
  });
}

/**
 * Validate the request body in order to reset an account's password
 * Endpoint in scope: {PATCH} /accounts/password
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validatePatchSelfAccount(req, res, next) {
  const validationRule = {
    password: "string",
    language: "string|in:en,ro",
  };

  const allowedFields = ["password", "language"];
  const reqFields = Object.keys(req.body);

  for (key of reqFields) {
    if (!allowedFields.includes(key)) {
      return res.status(412).send({
        message: "Validation failed",
      });
    }

    await validator(req.body, validationRule, {}, (err, success) => {
      if (success) {
        next();
      } else {
        res.status(412).send({
          message: "Validation failed",
          data: err,
        });
      }
    });
  }
}

/**
 * Validate the request body in order to create a company
 * Endpoint in scope: {POST} /companies/
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateCompanyCreation(req, res, next) {
  console.log(req.body);
  const validationRule = {
    accountEmail: "required|email",
    accountPassword: "required|confirmed",
    accountPassword_confirmation: "required",

    name: "required|string",
    address: "required|string",
    contactNumber: "required|string|size: 9",
    description: "required|string",
    fieldOfWork: "required|string|in:telecom,softwareDev,electronics,other",
    legalRep: {
      name: "required|string",
      jobTitle: "required|string",
      phoneNumber: "required|string|size: 9",
      email: "required|email",
    },
    handler: {
      name: "required|string",
      jobTitle: "required|string",
      phoneNumber: "required|string|size: 9",
      email: "required|email",
    },

    internshipCompensation: "required|boolean",
    internshipContract: "required|boolean",
    internshipMainAddress: "required|string",
    internshipOtherAddresses: "string",
    internshipOtherAdvantages: "string",

    offers: "required|array",
    "offers.*.title": "required|string",
    "offers.*.availablePos": "required|min:1",
    "offers.*.departament": "required|string",
    "offers.*.description": "required|string",
    "offers.*.mentions": "string",
    "offers.*.requirements": "string",
    "offers.*.supervisor": {
      name: "required|string",
      jobTitle: "required|string",
      phoneNumber: "required|string|size:9",
      email: "required|email",
    },
  };

  await validator(req.body, validationRule, {}, (err, success) => {
    if (success) {
      next();
    } else {
      res.status(412).send({
        message: "Validation failed",
        data: err,
      });
    }
  });
}

module.exports = {
  validateLogin,
  validatePasswordReset,
  validatePatchSelfAccount,
  validateCompanyCreation,
};
