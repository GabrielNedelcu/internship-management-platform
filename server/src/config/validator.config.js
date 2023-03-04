const Validator = require("validatorjs");
const { getOneCompany } = require("../models/companies/companies.model");
const { getOneOffer } = require("../models/offers/offers.model");
const { getOneStudent } = require("../models/students/students.model");
const { getOneProfessor } = require("../models/professors/professors.model");

/**
 * Custom validation function used to validate http requests
 *
 * @param {JSON} body           - request body to be validated
 * @param {*} rules             - validation rules
 * @param {*} customMessages    - error messages to be display in case of fail
 * @param {*} callback          - callback function to call after validation passes
 */
async function validator(body, rules, customMessages, callback) {
  const validation = new Validator(body, rules, customMessages);

  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
}

/**
 * Validate a company id points to an existing company
 *
 * @param {String}   companyId    - the id to check
 * @param {String}   attribute    - additional validation options
 * @param {Object}   req          - req body
 * @param {Callback} passes       - callback function to call when appropiate
 */
async function companyExists(companyId, attribute, req, passes) {
  const company = await getOneCompany(companyId, { _id: 1 });

  if (!company) {
    passes(false, "Compnay does not exist");
  }

  passes();
}

/**
 * Validate an offer id points to an existing offer
 *
 * @param {String}   offerId      - the id to check
 * @param {String}   attribute    - additional validation options
 * @param {Object}   req          - req body
 * @param {Callback} passes       - callback function to call when appropiate
 */
async function offerExists(offerId, attribute, req, passes) {
  const offer = await getOneOffer(offerId, { _id: 1 });

  if (!offer) {
    passes(false, "Offer does not exist");
  }

  passes();
}

/**
 * Validate a student id points to an existing student
 *
 * @param {String}   studentId    - the id to check
 * @param {String}   attribute    - additional validation options
 * @param {Object}   req          - req body
 * @param {Callback} passes       - callback function to call when appropiate
 */
async function studentExists(studentId, attribute, req, passes) {
  const student = await getOneStudent(studentId, { _id: 1 });

  if (!student) {
    passes(false, "Student does not exist");
  }

  passes();
}

/**
 * Validate a professor id points to an existing professor
 *
 * @param {String}   professorId  - the id to check
 * @param {String}   attribute    - additional validation options
 * @param {Object}   req          - req body
 * @param {Callback} passes       - callback function to call when appropiate
 */
async function professorExists(professorId, attribute, req, passes) {
  const professor = await getOneProfessor(professorId);

  if (!professor) {
    passes(false, "Professor does not exist");
  }

  passes();
}

Validator.registerAsync("company_exists", companyExists);
Validator.registerAsync("student_exists", studentExists);
Validator.registerAsync("offer_exists", offerExists);
Validator.registerAsync("professor_exists", professorExists);

module.exports = validator;
