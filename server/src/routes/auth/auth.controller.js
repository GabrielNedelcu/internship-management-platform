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
const { getOneStudent } = require("../../models/students/students.model");
const { getOneCompany } = require("../../models/companies/companies.model");

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

    res.cookie("etti-internships-auth-jwt", refreshToken, {
      httpOnly: true,
      samesite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const resData = {
      accountId: account._id,
      accountRole: account.role,
      accountLanguage: account.language,
      accessToken: accessToken,
    };

    if (account.role === "student") {
      //get the profileCompleted field from the student account
      const studentData = await getOneStudent(account._id, {
        profileCompleted: 1,
      });

      resData["profileCompleted"] = studentData.profileCompleted;
    }

    if (account.role === "company") {
      const companyData = await getOneCompany(account._id, {
        validated: 1,
        contractSigned: 1,
      });

      resData["validated"] = companyData.validated;
      resData["contractSigned"] = companyData.contractSigned;
    }

    return res.status(200).json(resData);
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
 * @apiBody     {NULL}
 */
async function httpPostTokens(req, res) {
  const cookies = req.cookies;
  const refreshToken = cookies["etti-internships-auth-jwt"];
  if (!refreshToken) {
    const error = new Error("No refresh token provided as cookie!");
    error.statusCode = 400;
    throw error;
  }

  const queryRes = await queryAccounts({ refresh_token: refreshToken });
  if (!queryRes.length) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
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
  const cookies = req.cookies;
  const refreshToken = cookies["etti-internships-auth-jwt"];

  const queryRes = await queryAccounts({ refreshToken: refreshToken });
  if (!queryRes.length) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 403;
    throw error;
  }

  const account = queryRes[0];
  deleteRefreshToken(account._id);
  res.clearCookie("etti-internships-auth-jwt");
  return res.status(204).send();
}

module.exports = {
  httpPostLogin,
  httpPostTokens,
  httpDeleteLogout,
};
