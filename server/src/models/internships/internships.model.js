const Internship = require("./internships.mongo");

/**
 * Create a new internship
 *
 * @param {JSON} internshipData    - the data needed to create a new internship
 */
async function createInternship(internshipData) {
  const internship = new Internship(internshipData);
  await internship.save();
  return internship;
}

/**
 * Retrieve the internship associated with an id
 *
 * @param {ObjectId} internshipId  - the id corresponding to the internship
 * @param {Object} projection      -projection
 * @returns {JSON}                 - the retrieved internship
 */
async function getOneInternship(internshipId, projection = {}) {
  return await Internship.findById(internshipId, projection);
}

/**
 * Get all the internships
 *
 * @returns {Array}             - the retrieved internships
 */
async function getAllInternships() {
  return await Internship.find({});
}

/**
 * Update a internship
 *
 * @param {ObjectId} internshipId      - the id of the internship to be updated
 * @param {JSON}     internshipData    - new data to update the internship
 */
async function updateOneInternship(internshipId, internshipData) {
  return await Internship.findByIdAndUpdate(internshipId, internshipData, {
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
async function queryInternships(
  query,
  options,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Internship.countDocuments(query);
  const data = await Internship.find(query, options)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

module.exports = {
  createInternship,
  getOneInternship,
  getAllInternships,
  updateOneInternship,
  queryInternships,
};
