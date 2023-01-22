const {
  getOneAccount,
  queryAccounts,
  updateAccountPassword,
} = require("../../models/accounts/accounts.model");

const { generatePassword } = require("../../utils/auth.utils");

const {
  sendPasswordResetMail,
  sendPasswordResetSuccessMail,
} = require("../../utils/mailer.utils");

const {
  generateResetPasswordToken,
  validateResetPasswordToken,
} = require("../../utils/jwt.utils");

/**
 *
 * @api {PATCH} /accounts/password
 * @apiDescription Reset the password of an account
 *
 * @apiBody email - required;
 *          accountId - optional;
 *          newPassword - optional;
 *
 */
async function httpPatchPassword(req, res) {
  const accountEmail = req.body.email;
  const accountId = req.body.accountId;
  const newPassword = req.body.newPassword;

  if (!accountId && !newPassword) {
    const account = await queryAccounts({ email: accountEmail });
    if (!account.length) {
      const err = new Error("Account not found!");
      err.statusCode = 404;
      throw err;
    }

    const emailToken = generateResetPasswordToken(account[0]._id.toHexString());
    const confirmationURL = `http://localhost:8000/v1/accounts/password/confirmation/${emailToken}`;
    sendPasswordResetMail(accountEmail, confirmationURL);

    return res.status(202).send();
  }
}

/**
 *
 * @api {GET} /accounts/password/confirmation/:token
 * @apiDescription Reset the password of an account after the user clicked
 * the confirmation link sent to his email
 *
 * @apiParam    {String}    token       Token associated with the request
 */
async function httpGetPasswordConfirmation(req, res) {
  const confirmationToken = req.params.token;
  const accountId = validateResetPasswordToken(confirmationToken);

  const password = generatePassword();
  await updateAccountPassword(accountId, password);
  const account = await getOneAccount(accountId);

  sendPasswordResetSuccessMail(account.email, password);
  return res.status(200).send();
}

module.exports = {
  httpPatchPassword,
  httpGetPasswordConfirmation,
};
