require("dotenv").config();

const jwt = require("jsonwebtoken");

/**
 * Generate token for password reset
 * The token will be valid for 24 hours
 *
 * @param {String}  accountId        - account id of the user to reset the password for
 *
 * @return {String}                  - The generated token
 */
function generateResetPasswordToken(accountId) {
  const resetPasswordToken = jwt.sign(
    {
      accountId: accountId,
    },
    process.env.EMAIL_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return resetPasswordToken;
}

/**
 * Verify a generated token used for the password reset confirmation
 *
 * @param {String}  token    - token under verification
 *
 * @return {String}          - the account id contained in the payload
 */
function validateResetPasswordToken(token) {
  return jwt.verify(token, process.env.EMAIL_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error("Invalid token!");
      error.statusCode = 403;
      throw error;
    }
    return decoded.accountId;
  });
}

/**
 * Generate access token for a logged in account
 * The token will be valid for 30 mins
 *
 * @param {String}    accountId        - account id of the user
 * @param {String}    accountRole      - the role of the user
 *
 * @return {String}                    - the generated access token
 */
function generateAccessToken(accountId, accountRole) {
  const accessToken = jwt.sign(
    {
      accountId: accountId,
      role: accountRole,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );

  return accessToken;
}

/**
 * Generate refresh token for a logged in account
 * The token will be valid for 24 hours
 *
 * @param {String}    accountId        - account id of the user
 * @param {String}    accountRole      - the role of the user
 *
 * @return {String}                    - the generated refresh token
 */
function generateRefreshToken(accountId, accountRole) {
  const refreshToken = jwt.sign(
    {
      accountId: accountId,
      role: accountRole,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return refreshToken;
}

/**
 * Generate access token from a refresh token
 *
 * @param {String}    refreshToken     - refresh token
 *
 * @return {String}                    - the generated access token
 */
function generateAccessTokenFromRefresh(refreshToken) {
  return jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        const error = new Error("Invalid token!");
        error.statusCode = 401;
        throw error;
      }

      return generateAccessToken(decoded.accountId, decoded.role);
    }
  );
}

/**
 * Validate an access token
 *
 * @param {String}    token            - the access token
 *
 * @return {Object}                    - the account id and the user role
 */
function validateAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      const error = new Error("Invalid token!");
      error.statusCode = 401;
      throw error;
    }

    return { accountId: decoded.accountId, accountRole: decoded.role };
  });
}

module.exports = {
  generateResetPasswordToken,
  validateResetPasswordToken,
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenFromRefresh,
  validateAccessToken,
};
