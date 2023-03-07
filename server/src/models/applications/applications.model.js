const Application = require("./applications.mongo");

/**
 * Create a new application
 *
 * @param {JSON} applicationData    - the data needed to create a new student
 */
async function createApplication(applicationData) {
  const application = new Application(applicationData);
  await application.save();
  return application;
}

/**
 * Retrieve the application associated with an id
 *
 * @param {ObjectId} applicationId  - the id corresponding to the application
 * @param {Object}   projection     - projection for the query - OPTIONAL
 * @returns {JSON}                  - the retrieved application
 */
async function getOneApplication(applicationId, projection = {}) {
  return await Application.findById(applicationId, projection);
}

/**
 * Get all the applications
 * @param {Object} projection   - projection for the query - OPTIONAL
 * @returns {Array}             - the retrieved applications
 */
async function getAllApplications(projection = {}) {
  return await Application.find({}, projection);
}

/**
 * Update an application
 * Be aware that the id of the application is the same as the
 * associated account's id
 *
 * @param {ObjectId} applicationId      - the id of the application to be updated
 * @param {JSON}     applicationData    - new data to update the application
 */
async function updateOneApplication(applicationId, applicationData) {
  return await Application.findByIdAndUpdate(applicationId, applicationData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query applications
 * @param {*} query     query
 * @param {*} projection query projection
 * @param {*} sortBy field to sort by
 * @param {*} sortOrder sort order
 * @param {*} skipCount number of documents to skip
 * @param {*} pageSize number of documents to retrieve
 * @returns object containing the total documents and the requested number of documents
 */
async function queryApplications(
  query,
  projection = {},
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalApplications = await Application.countDocuments(query);
  const applications = await Application.find(query, projection)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalApplications, applications };
}

module.exports = {
  createApplication,
  getOneApplication,
  queryApplications,
  getAllApplications,
  updateOneApplication,
};
