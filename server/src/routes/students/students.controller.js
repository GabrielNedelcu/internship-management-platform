const {
  createStudent,
  getAllStudents,
  getOneStudent,
  queryStudents,
  updateOneStudent,
} = require("../../models/students/students.model");
const {
  createAccount,
  deleteOneAccount,
} = require("../../models/accounts/accounts.model");

const { generatePassword } = require("../../utils/auth.utils");
const { getStudentMajor } = require("../../utils/models.utils");
const {
  uploadFilesFromRequest,
  deleteUploadedFile,
} = require("../../utils/files.utils");
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
        email: studentData.email,
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

/**
 * @api {GET} /students/
 * @apiDescription Get all the students, depending on the user role
 * For ADMIN, no restrictions are applied; For COMPANY gets all the students
 * that have applied to offers of the company
 *
 * @apiSuccess array with the requested data or 204 if no student was found
 */
async function httpGetAllStudents(req, res) {
  const userId = req.account;
  const userRole = req.userRole;

  let students;
  console.log(userRole);
  if (userRole === "admin") students = await getAllStudents();
  else {
  }

  if (!students.length) return res.status(204).send();

  return res.status(200).json(students);
}

/**
 * @api {PATCH} /students/self
 * @apiDescription Update the data for the logged in student
 *
 * @apiSuccess 204
 */
async function httpPatchSelfStudent(req, res) {
  const studentId = req.userId;
  const newData = req.body;

  const student = await queryStudents({ _id: studentId }, { cv: 1 });
  if (student.cv) await deleteUploadedFile("cv", student.cv);

  const fileName = `${studentId}.pdf`;
  await uploadFilesFromRequest(req, "cv", fileName);
  await updateOneStudent(studentId, { ...newData, cv: fileName });

  return res.status(204).send();
}

/**
 * @api {GET} /students/self
 * @apiDescription Get the data of the logged in student
 *
 * @apiSuccess 204
 */
async function httpGetSelfStudent(req, res) {
  const studentId = req.userId;
  const projectionFields = req.query.fields;

  let studentData = {};

  if (!projectionFields) studentData = await getOneStudent(studentId);
  else {
    const projectionFieldsFormatted = projectionFields.replace(/ /g, "");
    const projectionFieldsArray = projectionFieldsFormatted.split(",");

    const projection = {};
    projectionFieldsArray.forEach((key) => {
      projection[key] = 1;
    });

    studentData = await getOneStudent(studentId, projection);
  }
  if (!studentData) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(studentData);
}

module.exports = {
  httpCreateStudent,
  httpGetAllStudents,
  httpGetSelfStudent,
  httpPatchSelfStudent,
  httpCreateMultipleStudents,
};
