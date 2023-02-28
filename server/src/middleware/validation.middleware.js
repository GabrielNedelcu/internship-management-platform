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

  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key)) {
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

/**
 * Validate the request body in order to create a student
 * Endpoint in scope: {POST} /students/
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateStudentCreation(req, res, next) {
  const validationRule = {
    email: "required|email",
    name: "required|string",
    group: "required|string",
    cnp: "required|string|size:13",
    passport: "string",
  };

  // verify user sends only accepted fields
  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key)) {
      return res.status(412).send({
        message: "Validation failed",
      });
    }
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

/**
 * Validate the request body in order to self patch student
 * Endpoint in scope: {PATCH} /students/self
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateStudentSelfPatch(req, res, next) {
  const validationRule = {
    legalAddress: "string",
    address: "string",
    birthPlace: "string",
    birthDay: "date",
    phone: "string",
    citizenship: "string",
  };

  // verify user sends only accepted fields
  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key) && key !== "cv") {
      return res.status(412).send({
        message: "Validation failed",
      });
    }
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

/**
 * Validate the request body in order to create a professor
 * Endpoint in scope: {POST} /professors/
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateProfessorCreation(req, res, next) {
  const validationRule = {
    name: "required|string",
    email: "required|email",
    title: "required|string",
    privatePhone: "required|string",
    publicPhone: "required|string",
    departament: "required|string",
    numPositions: "required|integer|min:1",
  };

  // verify user sends only accepted fields
  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key)) {
      return res.status(412).send({
        message: "Validation failed",
      });
    }
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

/**
 * Validate the request body in order to patch a company
 * Endpoint in scope: {PATCH} /companies/:companyId
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validatePatchCompany(req, res, next) {
  const validationRule = {
    name: "string",
    address: "string",
    contactNumber: "string|size: 9",
    description: "string",
    fieldOfWork: "string|in:telecom,softwareDev,electronics,other",
    legalRep: {
      name: "string",
      jobTitle: "string",
      phoneNumber: "string|size: 9",
      email: "email",
    },
    handler: {
      name: "string",
      jobTitle: "string",
      phoneNumber: "string|size: 9",
      email: "email",
    },

    internshipCompensation: "boolean",
    internshipContract: "boolean",
    internshipMainAddress: "string",
    internshipOtherAddresses: "string",
    internshipOtherAdvantages: "string",

    validated: "boolean",
  };

  // verify user sends only accepted fields
  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key)) {
      return res.status(412).send({
        message: "Validation failed",
      });
    }
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

/**
 * Validate the request body in order to patch a professor
 * Endpoint in scope: {PATCH} /professors/:professorId
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validatePatchProfessor(req, res, next) {
  const validationRule = {
    name: "string",
    email: "email",
    title: "string",
    privatePhone: "string",
    publicPhone: "string",
    departament: "string",
    numPositions: "integer|min:1",
    admin: "boolean",
  };

  // verify user sends only accepted fields
  const reqFields = Object.keys(req.body);
  for (key of reqFields) {
    if (!Object.keys(validationRule).includes(key)) {
      return res.status(412).send({
        message: "Validation failed",
      });
    }
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

module.exports = {
  validateLogin,
  validatePatchCompany,
  validatePasswordReset,
  validatePatchProfessor,
  validateCompanyCreation,
  validateStudentCreation,
  validateStudentSelfPatch,
  validatePatchSelfAccount,
  validateProfessorCreation,
};
