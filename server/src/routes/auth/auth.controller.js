const { comparePasswords } = require("../../utils/auth.utils");

const {
  queryAccounts,
  updateAccountRefreshToken,
  deleteRefreshToken,
} = require("../../models/accounts/accounts.model");

const {
  generateAccessToken,
  generateRefreshToken,
  generateAccessTokenFromRefresh,
} = require("../../utils/jwt.utils");

/**
 *
 * @api {POST} /auth/login
 * @apiDescription Login endpoint
 *
 * @apiBody     {Object}                "email", "password"

 * @apiSuccess  {Object}                The access token and the refresh token generated
 */
async function httpPostLogin(req, res) {
  const accountEmail = req.body.email;
  const accountPassword = req.body.password;

  const queryResult = await queryAccounts({ email: accountEmail });
  if (!queryResult) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const account = queryResult[0];
  if (await comparePasswords(accountPassword, account.password)) {
    const accessToken = generateAccessToken(
      account._id.toHexString(),
      account.role
    );
    const refreshToken = generateRefreshToken(
      account._id.toHexString(),
      account.role
    );

    await updateAccountRefreshToken(account._id, refreshToken);

    return res.status(200).json({
      accountId: account._id,
      accountEmail: account.email,
      accountRole: account.role,
      accountLanguage: account.language,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }
}

/**
 *
 * @api {POST} /auth/tokens
 * @apiDescription Generate a new access token based on the refresh token
 *
 * @apiBody     {Object}                "token"
 */
async function httpPostTokens(req, res) {
  const refreshToken = req.body.token;

  const queryRes = await queryAccounts({ refresh_token: refreshToken });
  if (!queryRes.length) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  const accessToken = generateAccessTokenFromRefresh(refreshToken);
  return res.status(200).json({ accessToken: accessToken });
}

/**
 *
 * @api {DELETE} /auth/logout
 * @apiDescription Lougout user (delete refresh token)
 *
 * @apiBody     {Object}                "token"
 */
async function httpDeleteLogout(req, res) {
  const refreshToken = req.body.token;

  const queryRes = await queryAccounts({ refresh_token: refreshToken });
  if (!queryRes.length) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  const account = queryRes[0];
  deleteRefreshToken(account._id);
  return res.status(204).send();
}

module.exports = {
  httpPostLogin,
  httpPostTokens,
  httpDeleteLogout,
};
