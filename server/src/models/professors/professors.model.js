const Professor = require("./professors.mongo");

/**
 * Create a new professor
 *
 * @param {JSON} professorData    - the data needed to create a new professor
 */
async function createProfessor(professorData) {
  const professor = new Professor(professorData);
  await professor.save();
  return professor;
}

/**
 * Retrieve the professor associated with an id
 * Be aware that the id of the professor is the same as the
 * associated account's id
 *
 * @param {ObjectId} professorId  - the id corresponding to the professor
 *
 * @returns {JSON}              - the retrieved professor
 */
async function getOneProfessor(professorId) {
  return await Professor.findById(professorId);
}

/**
 * Get all the professors
 *
 * @returns {Array}             - the retrieved professors
 */
async function getAllProfessors() {
  return await Professor.find({});
}

/**
 * Update a professor
 * Be aware that the id of the professor is the same as the
 * associated account's id
 *
 * @param {ObjectId} professorId      - the id of the professor to be updated
 * @param {JSON}     professorData    - new data to update the professor
 */
async function updateOneProfessor(professorId, professorData) {
  return await Professor.findByIdAndUpdate(professorId, professorData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query the professors collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryProfessors(query, options) {
  return await Professor.find(query, options);
}

module.exports = {
  createProfessor,
  getOneProfessor,
  getAllProfessors,
  updateOneProfessor,
  queryProfessors,
};
