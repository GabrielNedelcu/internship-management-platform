/**
 * Authorization middleware
 *
 * @param {String[]} acceptedRoles  List of roles that have access permission
 *
 * @return {void}
 */
function authz(acceptedRoles) {
  return async (req, res, next) => {
    const userRole = req.userRole;
    if (acceptedRoles.includes(userRole)) next();
    else
      return res
        .status(403)
        .json({ err: "You are not permitted to access this resource!" });
  };
}

module.exports = authz;
