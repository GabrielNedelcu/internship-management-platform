const {
  createStudent,
  getAllStudents,
  getOneStudent,
  queryStudents,
  updateOneStudent,
  countStudents,
  deleteOneStudent,
} = require("../../models/students/students.model");
const {
  createAccount,
  deleteOneAccount,
  updateOneAccount,
} = require("../../models/accounts/accounts.model");

const { generatePassword } = require("../../utils/auth.utils");
const { getStudentMajor } = require("../../utils/models.utils");
const {
  uploadFilesFromRequest,
  deleteUploadedFile,
  downloadUploadedFile,
} = require("../../utils/files.utils");
const { parseExcel, studentSchema } = require("../../utils/excel.utils");

const logger = require("../../config/logger.config");

const {
  getSort,
  getPagination,
  getProjection,
} = require("../../utils/query.utils");
const {
  countApplications,
  queryApplications,
  deleteOneApplication,
} = require("../../models/applications/applications.model");
const {
  queryInternships,
} = require("../../models/internships/internships.model");
const {
  queryOffers,
  getOneOffer,
  updateOneOffer,
} = require("../../models/offers/offers.model");

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
    fullAvg:
      (studentData.firstYearAvg +
        studentData.secondYearAvg +
        studentData.thirdYearAvg) /
        3 || 0,
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
  const major = req.query.major;
  const searchFor = req.query.search;

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  const regex = new RegExp(searchFor, "i");
  const resp = await getAllStudents(
    {
      $or: [{ email: { $regex: regex } }, { name: { $regex: regex } }],
      ...(major && { major: major }),
    },
    projection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  // if (!resp.totalCount) return res.status(204).send();

  return res.status(200).json(resp);
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

  let data = newData;
  if (req.files) {
    const fileName = `${studentId}.pdf`;
    await uploadFilesFromRequest(req, "cv", fileName);
    data = { ...newData, cv: fileName };
  }

  await updateOneStudent(studentId, data);

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
  const projection = getProjection(req.query);

  const studentData = await getOneStudent(studentId, projection);

  if (!studentData) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(studentData);
}

/**
 * @api {GET} /students/:studentId/cv
 * @apiDescription Get the cv of a student
 *
 * @apiSuccess 204
 */
async function httpGetStudentCV(req, res) {
  const studentId = req.params.studentId;
  const userId = req.userId;

  const studentData = await getOneStudent(studentId);

  if (!studentData) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return downloadUploadedFile(res, "cv", studentData.cv);
}

/**
 *
 * @api {GET} /student/:studentId
 * @apiDescription Get one student
 *
 * @apiParam    {String}    studentId       id of the student to be fetched
 */
async function httpGetOneStudent(req, res) {
  const userRole = req.userRole;
  const studentId = req.params.studentId;

  if (studentId === "count") return httpGetStudentsCount(req, res);

  if (studentId === "self") {
    if (userRole !== "student") {
      const err = new Error("Unathorized");
      err.statusCode = 403;
      throw err;
    }

    return httpGetSelfStudent(req, res);
  }

  const student = await getOneStudent(studentId, {});

  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(student);
}

/**
 *
 * @api {GET} /students/count
 * @apiDescription Get the students count
 *
 * @apiSuccess  {Object}     count of all documents
 */
async function httpGetStudentsCount(req, res) {
  const userRole = req.userRole;

  if (userRole !== "admin") {
    const err = new Error("Unathorized");
    err.statusCode = 403;
    throw err;
  }

  const count = await countStudents();

  return res.status(200).json({ count });
}

/**
 *
 * @api {PATCH} /students/:studentId
 * @apiDescription Update student data
 *
 * @apiParam    {String}    studentId       id of the student to be updated
 */
async function httpPatchOneStudent(req, res) {
  const userRole = req.userRole;
  const studentId = req.params.studentId;
  let newData = req.body;

  if (newData.firstYearAvg || newData.secondYearAvg || newData.thirdYearAvg) {
    newData = {
      ...newData,
      fullAvg:
        (newData.firstYearAvg + newData.secondYearAvg + newData.thirdYearAvg) /
        3,
    };
  }

  if (studentId === "self") {
    if (userRole !== "student") {
      const err = new Error("Unathorized");
      err.statusCode = 403;
      throw err;
    }

    return httpPatchSelfStudent(req, res);
  }

  if (userRole !== "admin") {
    const err = new Error("Unathorized");
    err.statusCode = 403;
    throw err;
  }

  await updateOneStudent(studentId, newData);

  // if email is changed, also change the account's email
  if (newData["email"])
    await updateOneAccount(studentId, { email: newData.email });

  return res.status(204).send();
}

/**
 *
 * @api {GET} /student/:studentId/stats
 * @apiDescription Get the statistics for one student
 *
 * @apiParam    {String}    studentId       id of the student
 */
async function httpGetOneStudentStats(req, res) {
  let studentId = req.params.studentId;

  const userRole = req.userRole;
  const userId = req.userId;

  // the student can access only it's own stats
  if (userRole === "student" && studentId !== "self") {
    const err = new Error("Unauthorized");
    err.statusCode = 403;
    throw err;
  }

  if (userRole === "admin" && studentId === "self") {
    const err = new Error("Not found");
    err.statusCode = 404;
    throw err;
  }

  if (studentId === "self") studentId = userId;

  const student = await countApplications(studentId);
  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  const applications = await countApplications({ student: studentId });
  const pendingReview = await countApplications({
    student: studentId,
    status: "inReview",
  });
  const accepted = await countApplications({
    student: studentId,
    $or: [
      { status: "companyAccepted" },
      { status: "studentAccepted" },
      { status: "professorAssgined" },
    ],
  });

  const declined = await countApplications({
    student: studentId,
    status: "companyDeclined",
  });

  return res
    .status(200)
    .json({ applications, pendingReview, accepted, declined });
}

/**
 *
 * @api {DELETE} /students/:studentId
 * @apiDescription Delete a student
 *
 * @apiSuccess  {Object}    200 OK
 */
async function httpDeleteStudent(req, res) {
  const studentId = req.params.studentId;

  const student = await getOneStudent(studentId, { _id: 1, cv: 1 });
  if (!student) {
    const err = new Error("Student not found");
    err.statusCode = 404;
    throw err;
  }

  const internships = await queryInternships(
    { student: studentId },
    { _id: 1 }
  );
  if (internships.totalCount) {
    const err = new Error(
      "Cannot delete the student. It already has an internship"
    );
    err.statusCode = 400;
    throw err;
  }

  // delete the student cv
  if (student.cv) await deleteUploadedFile("cv", student.cv);

  // delete all it's applications
  const applications = await queryApplications(
    { student: studentId },
    { offer: 1 }
  );

  for await (const application of applications.data) {
    // decrese the offers applications
    const offer = await getOneOffer(application.offer, { applications: 1 });
    if (offer)
      await updateOneOffer(application.offer, {
        applications: --offer.applications,
      });

    await deleteOneApplication(application._id);
  }

  // delete the account
  await deleteOneAccount(studentId);

  // finally delete the professor
  await deleteOneStudent(studentId);

  return res.status(200).send();
}

module.exports = {
  httpGetStudentCV,
  httpCreateStudent,
  httpGetOneStudent,
  httpDeleteStudent,
  httpGetAllStudents,
  httpGetSelfStudent,
  httpPatchOneStudent,
  httpPatchSelfStudent,
  httpGetOneStudentStats,
  httpCreateMultipleStudents,
};
