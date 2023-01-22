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
    newPassword: "string",
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
};
