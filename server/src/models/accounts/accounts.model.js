const Account = require("./accounts.mongo");
const { hashPassword } = require("../../utils/auth.utils");

/**
 * Create a new account
 *
 * @param {JSON} accountData    - the data needed to create a new account
 */
async function createAccount(accountData) {
  //TODO: Move the password generation in the controller
  const encryptedPass = await hashPassword(accountData.password);
  accountData.password = encryptedPass;

  const account = new Account(accountData);
  await account.save();
  return account;
}

/**
 * Retrieve the account associated with an id
 *
 * @param {ObjectId} accountId  - the id corresponding to the account
 *
 * @returns {JSON}              - the retrieved account
 */
async function getOneAccount(accountId) {
  return await Account.findById(accountId);
}

/**
 * Get all the accounts
 *
 * @returns {Array}             - the retrieved accounts
 */
async function getAllAccounts() {
  return await Account.find({});
}

/**
 * Update an account
 *
 * @param {ObjectId} accountId      - the id of the account to be updated
 * @param {JSON}     accountData    - new data to update the account
 */
async function updateOneAccount(accountId, accountData) {
  await Account.findByIdAndUpdate(accountId, accountData, {
    runValidators: true,
  });
}

/**
 * Query the accounts collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryAccounts(query, options) {
  return await Account.find(query, options);
}

/**
 * Delete the account associated with an id
 *
 * @param {ObjectId} accountId  - the id corresponding to the account
 */
async function deleteOneAccount(accountId) {
  await Account.findByIdAndDelete(accountId);
}

/**
 * Update the password of one account
 *
 * @param {ObjectId} accountId  - the id corresponding to the account
 * @param {String}   password   - the new password
 */
async function updateAccountPassword(accountId, password) {
  const encryptedPass = await hashPassword(password);
  await updateOneAccount(accountId, {
    password: encryptedPass,
    activated: true,
  });
}

/**
 * Update the refresh token of an account
 *
 * @param {ObjectId} accountId      - the id corresponding to the account
 * @param {String}   refreshToken   - the refresh token
 */
async function updateAccountRefreshToken(accountId, refreshToken) {
  if (!refreshToken) {
    const error = new Error("No refresh token provided!");
    throw error;
  }
  await updateOneAccount(accountId, {
    refreshToken: refreshToken,
  });
}

/**
 * Delete the refresh token of an account
 *
 * @param {ObjectId} accountId      - the id corresponding to the account
 */
async function deleteRefreshToken(accountId) {
  await updateOneAccount(accountId, {
    refresh_token: null,
  });
}

module.exports = {
  createAccount,
  getOneAccount,
  getAllAccounts,
  updateOneAccount,
  queryAccounts,
  deleteOneAccount,
  updateAccountPassword,
  updateAccountRefreshToken,
  deleteRefreshToken,
};
