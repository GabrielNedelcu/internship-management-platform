const {
  queryInternshipsAppendReferencedData,
  getOneInternship,
  updateOneInternship,
} = require("../../models/internships/internships.model");
const {
  getOneProfessor,
  updateOneProfessor,
} = require("../../models/professors/professors.model");
const {
  getSort,
  getPagination,
  getProjection,
  getProjectionFromString,
} = require("../../utils/query.utils");

const { default: mongoose } = require("mongoose");

/**
 * @api {GET} /internships/
 * @apiDescription Get all the internships
 *
 * @apiSuccess array with the requested data or 204 if no student was found
 */
async function httpGetInternships(req, res) {
  const searchFor = req.query.search;
  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);
  const projection = getProjection(req.query);
  const studentProjection = getProjectionFromString(req.query.studentFields);
  const companyProjection = getProjectionFromString(req.query.companyFields);
  const offerProjection = getProjectionFromString(req.query.offerFields);
  const professorProjection = getProjectionFromString(
    req.query.professorFields
  );

  const regex = new RegExp(searchFor, "i");

  const query = {
    $or: [
      { "studentData.name": { $regex: regex } },
      { "offerData.title": { $regex: regex } },
      { "companyData.name": { $regex: regex } },
    ],
  };
  const resp = await queryInternshipsAppendReferencedData(
    query,
    projection,
    studentProjection,
    companyProjection,
    offerProjection,
    professorProjection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  return res.status(200).json(resp);
}

/**
 *
 * @api {PATCH} /internships/:internshipId
 * @apiDescription Update internship data
 *
 * @apiParam    {String}    applicationId   Internship's unique ObjectId
 * @apiSuccess  {Object}                    The data of the Internship
 */
async function httpPatchInternship(req, res) {
  const internshipId = req.params.internshipId;
  const newData = req.body;

  const internship = await getOneInternship(internshipId);
  if (!internship) {
    const err = new Error("Internship not found");
    err.statusCode = 404;
    throw err;
  }

  if (newData.hasOwnProperty("professor")) {
    const newProfessor = await getOneProfessor(newData.professor);
    if (!newProfessor.numAvailablePositions) {
      const err = new Error("Professor has no positions available");
      err.statusCode = 400;
      throw err;
    }

    const currentProfessor = await getOneProfessor(internship.professor);
    if (currentProfessor) {
      // Increase the available positions
      await updateOneProfessor(currentProfessor._id, {
        numAvailablePositions: ++currentProfessor.numAvailablePositions,
      });
    }

    //decrese the number of available positions for the new professor
    await updateOneProfessor(newProfessor._id, {
      numAvailablePositions: --newProfessor.numAvailablePositions,
    });
  }

  await updateOneInternship(internshipId, newData);

  return res.status(204).json();
}

/**
 *
 * @api {PATCH} /internships/:internshipId
 * @apiDescription Update internship data
 *
 * @apiParam    {String}    applicationId   Internship's unique ObjectId
 * @apiSuccess  {Object}                    The data of the Internship
 */
async function httpGetInternship(req, res) {
  const internshipId = req.params.internshipId;
  const projection = getProjection(req.query);
  const studentProjection = getProjectionFromString(req.query.studentFields);
  const companyProjection = getProjectionFromString(req.query.companyFields);
  const offerProjection = getProjectionFromString(req.query.offerFields);
  const professorProjection = getProjectionFromString(
    req.query.professorFields
  );

  const { sortOrder, sortBy } = getSort(req.query);
  const { pageSize, skipCount } = getPagination(req.query);

  const resp = await queryInternshipsAppendReferencedData(
    { _id: new mongoose.Types.ObjectId(internshipId) },
    projection,
    studentProjection,
    companyProjection,
    offerProjection,
    professorProjection,
    sortBy,
    sortOrder,
    skipCount,
    pageSize
  );

  if (resp.totalCount > 1) {
    const err = new Error("Student has more than one internship");
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json(resp.data[0]);
}

module.exports = { httpGetInternships, httpPatchInternship, httpGetInternship };
