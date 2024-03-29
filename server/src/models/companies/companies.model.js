const Company = require("./companies.mongo");

/**
 * Create a new company
 *
 * @param {JSON} companyData    - the data needed to create a new student
 */
async function createCompany(companyData) {
  const company = new Company(companyData);
  await company.save();
  return company;
}

/**
 * Delete one company
 *
 * @param {ObjectId} companyId  - the id corresponding to the company
 */
async function deleteOneCompany(companyId) {
  await Company.findByIdAndDelete(companyId);
}

/**
 * Retrieve the company associated with an id
 * Be aware that the id of the company is the same as the
 * associated account's id
 *
 * @param {ObjectId} companyId  - the id corresponding to the company
 * @param {Object} projection -projection
 * @returns {JSON}              - the retrieved company
 */
async function getOneCompany(companyId, projection = {}) {
  return await Company.findById(companyId, projection);
}

/**
 * Get all the companies
 *
 * @returns {Array}             - the retrieved companies
 */
async function getAllCompanies() {
  return await Company.find({});
}

/**
 * Update a company
 * Be aware that the id of the company is the same as the
 * associated account's id
 *
 * @param {ObjectId} companyId      - the id of the company to be updated
 * @param {JSON}     companyData    - new data to update the company
 */
async function updateOneCompany(companyId, companyData) {
  return await Company.findByIdAndUpdate(companyId, companyData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query the companies collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryCompanies(
  query,
  options,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Company.countDocuments(query);
  const data = await Company.find(query, options)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

/**
 * Count the number of results for a query
 * @param {*} query     query
 * @returns the count of the documents for the specific query
 */
async function countCompanies(query) {
  return await Company.countDocuments(query);
}

async function getOffersStats() {
  return await Company.aggregate([
    { $match: { validated: true } },
    {
      $group: {
        _id: null,
        totalNumOffers: { $sum: "$numOffers" },
        totalNumPositions: { $sum: "$numPositions" },
        validatedCompanyCount: { $sum: 1 },
      },
    },
    { $project: { _id: 0 } },
  ]);
}

module.exports = {
  createCompany,
  getOneCompany,
  queryCompanies,
  countCompanies,
  getOffersStats,
  getAllCompanies,
  updateOneCompany,
  deleteOneCompany,
};
