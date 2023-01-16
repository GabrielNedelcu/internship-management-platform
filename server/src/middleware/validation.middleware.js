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
 * Validate the request body in order to generate an access token from
 * a refresh token
 * Endpoint in scope: {POST} /auth/token
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function validateToken(req, res, next) {
  const validationRule = {
    token: "required|string",
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
  validateToken,
};
