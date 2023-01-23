const { validateAccessToken } = require("../utils/jwt.utils");

/**
 * Authentication middleware
 *
 * @param {*} req       http request
 * @param {*} res       http response
 * @param {*} next      next middleware in the chain
 */
async function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res
      .status(401)
      .json({ err: "A token is required for authentication" });

  const token = authHeader.split(" ")[1];
  try {
    const user = validateAccessToken(token);

    req.userId = user.accountId;
    req.userRole = user.accountRole;
  } catch (err) {
    return res.status(err.statusCode).json({ err: err.message });
  }

  next();
}

module.exports = auth;
