const Student = require("./students.mongo");

/**
 * Create a new student
 *
 * @param {JSON} studentData    - the data needed to create a new student
 */
async function createStudent(studentData) {
  const student = new Student(studentData);
  await student.save();
  return student;
}

/**
 * Retrieve the student associated with an id
 * Be aware that the id of the student is the same as the
 * associated account's id
 *
 * @param {ObjectId} studentId  - the id corresponding to the student
 * @param {Object} projection - projection for the query
 * @returns {JSON}              - the retrieved student
 */
async function getOneStudent(studentId, projection = {}) {
  return await Student.findById(studentId, projection);
}

/**
 * Get all the students
 *
 * @returns {Array}             - the retrieved students
 */
async function getAllStudents(
  query,
  projection,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Student.countDocuments(query);

  const data = await Student.find(query, projection)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

/**
 * Update a student
 * Be aware that the id of the student is the same as the
 * associated account's id
 *
 * @param {ObjectId} studentId      - the id of the student to be updated
 * @param {JSON}     studentData    - new data to update the student
 */
async function updateOneStudent(studentId, studentData) {
  return await Student.findByIdAndUpdate(studentId, studentData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query the students collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryStudents(query, options) {
  return await Student.find(query, options);
}

module.exports = {
  createStudent,
  getOneStudent,
  queryStudents,
  getAllStudents,
  updateOneStudent,
};
