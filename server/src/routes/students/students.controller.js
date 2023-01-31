const { createStudent } = require("../../models/students/students.model");
const { createAccount } = require("../../models/accounts/accounts.model");

const { generatePassword } = require("../../utils/auth.utils");
const { getStudentMajor } = require("../../utils/models.utils");

const logger = require("../../config/logger.config");

/**
 *
 * @api {POST} /students/
 * @apiDescription Create a new student
 *
 * @apiBody     {Object}                The data needed to create a new company
 * @apiSuccess  {Object}                The new object (created company)
 */
async function httpCreateStudent(req, res) {
  const studentData = req.body;

  // Created the associated account first
  const accountData = {
    email: studentData.email,
    password: generatePassword(),
    role: "student",
  };

  const account = await createAccount(accountData);
  if (!account) {
    const err = new Error("Unable to create the associated account");
    throw err;
  }

  logger.info(`Created account with id ${account._id}`);

  // remove the email from the student data
  delete studentData.email;

  // create the student
  const student = await createStudent({
    _id: account._id,
    ...studentData,
    major: getStudentMajor(studentData.group),
  });
  logger.info(`Created student with id ${account._id}`);

  return res.status(201).json({ ...student._doc });
}

module.exports = {
  httpCreateStudent,
};
