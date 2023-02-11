const { createStudent } = require("../../models/students/students.model");
const {
  createAccount,
  deleteOneAccount,
} = require("../../models/accounts/accounts.model");

const { generatePassword } = require("../../utils/auth.utils");
const { getStudentMajor } = require("../../utils/models.utils");
const { uploadFilesFromRequest } = require("../../utils/files.utils");
const { parseExcel, studentSchema } = require("../../utils/excel.utils");

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

/**
 * @api {POST} /students/multiple
 * @apiDescription Upload the xlsx file send in the request body to the server.
 * Read all the students and create correspoding accounts.
 * The operation is not "all or nothing" - in case the creation of
 * one user fails, skip to the next one
 *
 * @apiBody     {File}                  The excel file containing all the students
 * @apiSuccess  {Object[]}  data        Array of the created students
 * @apiSuccess  {String[]}  messages    Array of messages corresponding to the
 *                                      success of the operations
 */
async function httpCreateMultipleStudents(req, res) {
  const filePath = await uploadFilesFromRequest(
    req,
    "excel",
    "studentsList.xlsx"
  );

  const students = await parseExcel(filePath, studentSchema);
  if (!students.length) {
    logger.warn("No users were retrieved from the parsed file");
    return res.status(204).send({ messages: "No students were created!" });
  }

  const result = [];
  const success = [];
  const fails = [];

  for await (const studentData of students) {
    const accountData = {
      email: studentData.email,
      role: "student",
      password: generatePassword(),
    };

    try {
      const account = await createAccount(accountData);
      if (!account) {
        const err = new Error("Unable to create a student account");
        throw err;
      }

      const dataForStudentCreation = {
        name: studentData.name,
        group: studentData.group,
        major: getStudentMajor(studentData.group),
        cnp: studentData.cnp,
        passport: studentData.passport,
      };

      try {
        result.push(
          await createStudent({ _id: account._id, ...dataForStudentCreation })
        );

        success.push(`${accountData.email}`);
        logger.info(`Created student ${accountData.email}`);
      } catch (err) {
        console.log(err);
        logger.warn(`Unable to create student ${accountData.email}`);
        fails.push(`${accountData.email}`);

        await deleteOneAccount(account._id);
        continue;
      }
    } catch (err) {
      console.log(err);
      logger.warn(`Unable to create student ${accountData.email}`);
      fails.push(`${accountData.email}`);

      continue;
    }
  }

  return res
    .status(201)
    .json({ data: result, detected: students.length, success, fails });
}

module.exports = {
  httpCreateStudent,
  httpCreateMultipleStudents,
};
