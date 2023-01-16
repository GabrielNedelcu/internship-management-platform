const Validator = require("validatorjs");

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

module.exports = validator;
