const {
  createProfessor,
  getAllProfessors,
  getOneProfessor,
  updateOneProfessor,
} = require("../../models/professors/professors.model");
const {
  createAccount,
  deleteOneAccount,
  updateOneAccount,
} = require("../../models/accounts/accounts.model");
const {
  getSort,
  getPagination,
  getProjection,
  getProjectionFromString,
} = require("../../utils/query.utils");

const { generatePassword } = require("../../utils/auth.utils");
const { uploadFilesFromRequest } = require("../../utils/files.utils");
const { parseExcel, professorSchema } = require("../../utils/excel.utils");

const logger = require("../../config/logger.config");

/**
 *
 * @api {POST} /professors/
 * @apiDescription Create a new professor
 *
 * @apiBody     {Object}                The data needed to create a new professor
 * @apiSuccess  {Object}                The new object (created professor)
 */
async function httpCreateProfessor(req, res) {
  const professorData = req.body;

  // Created the associated account first
  const accountData = {
    email: professorData.email,
    password: generatePassword(),
    role: "professor",
  };

  const account = await createAccount(accountData);
  if (!account) {
    const err = new Error("Unable to create the associated account");
    throw err;
  }

  logger.info(`Created account with id ${account._id}`);

  // create the student
  const professor = await createProfessor({
    _id: account._id,
    ...professorData,
    numAvailablePositions: professorData.numPositions,
  });

  logger.info(`Created professor with id ${account._id}`);

  return res.status(201).json({ ...professor._doc });
}

/**
 * @api {POST} /professors/multiple
 * @apiDescription Upload the xlsx file send in the request body to the server.
 * Read all the professors and create correspoding accounts.
 * The operation is not "all or nothing" - in case the creation of
 * one user fails, skip to the next one
 *
 * @apiBody     {File}                  The excel file containing all the professors
 * @apiSuccess  {Object[]}  data        Array of the created professors
 * @apiSuccess  {String[]}  messages    Array of messages corresponding to the
 *                                      success of the operations
 */
async function httpCreateMultipleProfessors(req, res) {
  const filePath = await uploadFilesFromRequest(
    req,
    "excel",
    "professorsList.xlsx"
  );

  const professors = await parseExcel(filePath, professorSchema);
  if (!professors.length) {
    logger.warn("No users were retrieved from the parsed file");
    return res.status(204).send({ messages: "No professors were created!" });
  }

  const result = [];
  const success = [];
  const fails = [];

  for await (const professorData of professors) {
    const accountData = {
      email: professorData.email,
      role: "professor",
      password: generatePassword(),
    };

    try {
      const account = await createAccount(accountData);
      if (!account) {
        const err = new Error("Unable to create a professor account");
        throw err;
      }

      const dataForProfessorCreation = {
        name: professorData.name,
        email: professorData.email,
        title: professorData.title,
        privatePhone: professorData.private_phone,
        publicPhone: professorData.public_phone,
        departament: professorData.departament,
      };

      try {
        result.push(
          await createProfessor({
            _id: account._id,
            ...dataForProfessorCreation,
          })
        );

        success.push(`${accountData.email}`);
        logger.info(`Created professor ${accountData.email}`);
      } catch (err) {
        console.log(err);
        logger.warn(`Unable to create professor ${accountData.email}`);
        fails.push(`${accountData.email}`);

        await deleteOneAccount(account._id);
        continue;
      }
    } catch (err) {
      console.log(err);
      logger.warn(`Unable to create professor ${accountData.email}`);
      fails.push(`${accountData.email}`);

      continue;
    }
  }

  return res
    .status(201)
    .json({ data: result, detected: professors.length, success, fails });
}

/**
 * @api {GET} /professors/
 * @apiDescription Get all the professors.
 * Available only for the ADMIN
 *
 * @apiSuccess array with the requested data or 204 if no professor was found
 */
async function httpGetAllProfessors(req, res) {
  const departament = req.query.departament;
  const searchFor = req.query.search;
  const available = req.query.available;

  console.log(req.query);

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);

  const regex = new RegExp(searchFor, "i");
  const resp = await getAllProfessors(
    {
      $or: [{ email: { $regex: regex } }, { name: { $regex: regex } }],
      ...(available && { numAvailablePositions: { $gt: 0 } }),
      ...(departament && { departament: departament }),
    },
    projection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  if (!resp.totalCount) return res.status(204).send();

  return res.status(200).json(resp);
}

/**
 *
 * @api {GET} /professors/:professorId
 * @apiDescription Get one professor
 *
 * @apiParam    {String}    professorId       id of the professor to be fetched
 */
async function httpGetOneProfessor(req, res) {
  const professorId = req.params.professorId;
  const userRole = req.userRole;

  let projection = {};
  let professor = {};

  if (userRole === "admin") {
    professor = await getOneProfessor(professorId, projection);
  }

  if (!professor) {
    const err = new Error("Professor not found");
    err.statusCode = 404;
    throw err;
  }

  return res.status(200).json(professor);
}

/**
 *
 * @api {PATCH} /professors/:professorId
 * @apiDescription Update professor data
 *
 * @apiParam    {String}    professorId       id of the professor to be updated
 */
async function httpPatchOneProfessor(req, res) {
  const professorId = req.params.professorId;
  const newData = req.body;

  // if number of positions is modified, update also the available positions
  if (newData["numPositions"]) {
    const oldData = await getOneProfessor(professorId);
    const computedAvailablePos =
      oldData.numAvailablePositions +
      (newData.numPositions - oldData.numPositions);

    await updateOneProfessor(professorId, {
      ...newData,
      numAvailablePositions: computedAvailablePos,
    });
  } else await updateOneProfessor(professorId, newData);

  // if master admin sets professor as admin, change account role
  if (newData["admin"] !== undefined) {
    const newRole = newData.admin === true ? "admin" : "professor";
    await updateOneAccount(professorId, { role: newRole });
  }

  // if email is changed, also change the account's email
  if (newData["email"])
    await updateOneAccount(professorId, { email: newData.email });

  return res.status(204).send();
}

module.exports = {
  httpCreateProfessor,
  httpGetOneProfessor,
  httpGetAllProfessors,
  httpPatchOneProfessor,
  httpCreateMultipleProfessors,
};
