const { default: mongoose } = require("mongoose");
const {
  queryInternshipsAppendReferencedData,
  getOneInternship,
  updateOneInternship,
  countInternships,
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
const {
  uploadFilesFromRequest,
  deleteUploadedFile,
  downloadUploadedFile,
} = require("../../utils/files.utils");

/**
 * @api {GET} /internships/
 * @apiDescription Get all the internships
 *
 * @apiSuccess array with the requested data or 204 if no student was found
 */
async function httpGetInternships(req, res) {
  const userId = req.userId;
  const userRole = req.userRole;

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

  const professorId = req.query.professor;
  const companyId = req.query.company;
  const offerId = req.query.offer;

  const regex = new RegExp(searchFor, "i");

  let query = {
    $or: [
      { "studentData.name": { $regex: regex } },
      { "offerData.title": { $regex: regex } },
      { "companyData.name": { $regex: regex } },
    ],
  };

  if (userRole === "admin") {
    if (professorId)
      query = { ...query, professor: new mongoose.Types.ObjectId(professorId) };
    if (companyId)
      query = { ...query, company: new mongoose.Types.ObjectId(companyId) };
    if (offerId)
      query = { ...query, offer: new mongoose.Types.ObjectId(offerId) };
  }

  if (userRole === "company") {
    query = { ...query, company: new mongoose.Types.ObjectId(userId) };
    if (offerId)
      query = { ...query, offer: new mongoose.Types.ObjectId(offerId) };
  }

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
  const userRole = req.userRole;
  const internshipId = req.params.internshipId;
  let newData = req.body;

  if (userRole === "student" && newData.hasOwnProperty("professor")) {
    const err = new Error("Unathorized!");
    err.statusCode = 403;
    throw err;
  }

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

  if (req.files) {
    const fileKey = Object.keys(req.files)[0];
    if (fileKey.includes("annex7")) {
      if (internship.documents.annex7) {
        await deleteUploadedFile(
          "annex_7",
          internship.documents.annex7.filename
        );
      }

      const fileName = `${internship.student}.pdf`;
      await uploadFilesFromRequest(req, "annex_7", fileName);
      newData = {
        ...newData,
        documents: {
          ...internship.documents,
          annex7: {
            filename: fileName,
            validated: false,
            validationMessage: "",
          },
        },
      };
    } else if (fileKey.includes("tripartit")) {
      if (internship.documents.tripartit) {
        await deleteUploadedFile(
          "tripartit",
          internship.documents.tripartit.filename
        );
      }

      const fileName = `${internship.student}.pdf`;
      await uploadFilesFromRequest(req, "tripartit", fileName);
      newData = {
        ...newData,
        documents: {
          ...internship.documents,
          tripartit: {
            filename: fileName,
            validated: false,
            validationMessage: "",
          },
        },
      };
    } else if (fileKey.includes("annex2")) {
      if (internship.documents.annex2) {
        await deleteUploadedFile(
          "annex_2",
          internship.documents.annex2.filename
        );
      }

      const fileName = `${internship.student}.pdf`;
      await uploadFilesFromRequest(req, "annex_2", fileName);
      newData = {
        ...newData,
        documents: {
          ...internship.documents,
          annex2: {
            ...internship.documents,
            filename: fileName,
            validated: false,
            validationMessage: "",
          },
        },
      };
    } else if (fileKey.includes("annex3")) {
      if (internship.documents.annex3) {
        await deleteUploadedFile(
          "annex_3",
          internship.documents.annex3.filename
        );
      }

      const fileName = `${internship.student}.pdf`;
      await uploadFilesFromRequest(req, "annex_3", fileName);
      newData = {
        ...newData,
        documents: {
          ...internship.documents,
          annex3: {
            filename: fileName,
            validated: false,
            validationMessage: "",
          },
        },
      };
    }
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

  if (internshipId === "count") return httpGetInternshipsCount(req, res);

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

/**
 *
 * @api {GET} /internships/count
 * @apiDescription Get the internships count
 *
 * @apiSuccess  {Object}     count of all documents
 */
async function httpGetInternshipsCount(req, res) {
  const userRole = req.userRole;

  if (userRole !== "admin") {
    const err = new Error("Unathorized");
    err.statusCode = 403;
    throw err;
  }

  const count = await countInternships();

  return res.status(200).json({ count });
}

/**
 * @api {GET} /internships/:internshipId/documents
 * @apiDescription Get one document from the internship
 *
 * @apiSuccess 204
 */
async function httpDownloadDocument(req, res) {
  const internshipId = req.params.internshipId;
  const doctype = req.query.doc;

  const internship = await getOneInternship(internshipId);
  if (!internship) {
    const err = new Error("Internship not found");
    err.statusCode = 404;
    throw err;
  }

  switch (doctype) {
    case "tripartit":
      return downloadUploadedFile(
        res,
        "tripartit",
        internship.documents.tripartit.filename
      );
    case "annex2":
      return downloadUploadedFile(
        res,
        "annex_2",
        internship.documents.annex2.filename
      );
    case "annex3":
      return downloadUploadedFile(
        res,
        "annex_3",
        internship.documents.annex3.filename
      );
    case "annex7":
      return downloadUploadedFile(
        res,
        "annex_7",
        internship.documents.annex7.filename
      );
  }

  return res.status(404).send({});
}

module.exports = {
  httpGetInternships,
  httpPatchInternship,
  httpGetInternship,
  httpDownloadDocument,
};
