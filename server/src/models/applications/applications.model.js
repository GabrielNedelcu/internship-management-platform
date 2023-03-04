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
 * Query the applications collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} projection         - projection for the query
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryApplications(query, projection = {}) {
  return await Application.find(query, projection);
}

module.exports = {
  createApplication,
  getOneApplication,
  queryApplications,
  getAllApplications,
  updateOneApplication,
};
