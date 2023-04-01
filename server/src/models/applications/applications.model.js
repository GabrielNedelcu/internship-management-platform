const Application = require("./applications.mongo");

/**
 * Create a new application
 *
 * @param {JSON} applicationData    - the data needed to create a new student
 */
async function createApplication(applicationData) {
  const application = new Application(applicationData);
  await application.save();
  return application;
}

/**
 * Retrieve the application associated with an id
 *
 * @param {ObjectId} applicationId  - the id corresponding to the application
 * @param {Object}   projection     - projection for the query - OPTIONAL
 * @returns {JSON}                  - the retrieved application
 */
async function getOneApplication(applicationId, projection = {}) {
  return await Application.findById(applicationId, projection);
}

/**
 * Get all the applications
 * @param {Object} projection   - projection for the query - OPTIONAL
 * @returns {Array}             - the retrieved applications
 */
async function getAllApplications(projection = {}) {
  return await Application.find({}, projection);
}

/**
 * Update an application
 * Be aware that the id of the application is the same as the
 * associated account's id
 *
 * @param {ObjectId} applicationId      - the id of the application to be updated
 * @param {JSON}     applicationData    - new data to update the application
 */
async function updateOneApplication(applicationId, applicationData) {
  return await Application.findByIdAndUpdate(applicationId, applicationData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query applications
 * @param {*} query     query
 * @param {*} projection query projection
 * @param {*} sortBy field to sort by
 * @param {*} sortOrder sort order
 * @param {*} skipCount number of documents to skip
 * @param {*} pageSize number of documents to retrieve
 * @returns object containing the total documents and the requested number of documents
 */
async function queryApplications(
  query,
  projection = {},
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Application.countDocuments(query);
  const data = await Application.find(query, projection)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

/**
 * Query applications and append student and offer data
 * @param {*} query     query
 * @param {*} projection query projection
 * @param {*} sortBy field to sort by
 * @param {*} sortOrder sort order
 * @param {*} skipCount number of documents to skip
 * @param {*} pageSize number of documents to retrieve
 * @returns object containing the total documents and the requested number of documents
 */
async function queryApplicationAppendStudentOfferData(
  query,
  projection = {},
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const pipeline = [
    {
      $lookup: {
        from: "students",
        localField: "student",
        foreignField: "_id",
        as: "studentData",
        pipeline: [
          {
            $project: {
              internship: 1,
              firstYearAvg: 1,
              secondYearAvg: 1,
              thirdYearAvg: 1,
              fullAvg: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$studentData",
    },
    {
      $lookup: {
        from: "offers",
        localField: "offer",
        foreignField: "_id",
        as: "offerData",
        pipeline: [
          {
            $project: {
              remainingAvailablePos: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$offerData",
    },
    {
      $match: query,
    },
    {
      $count: "totalDocuments",
    },
  ];

  const countResult = await Application.aggregate(pipeline).exec();
  const totalCount = countResult[0] ? countResult[0].totalDocuments : 0;
  const mainPipeline = [
    ...pipeline.slice(0, -1),
    ...(Object.keys(projection).length
      ? [
          {
            $project: projection,
          },
        ]
      : []),
    {
      $match: query,
    },
    ...(sortBy && sortOrder
      ? [
          {
            $sort: {
              [`${sortBy}`]: sortOrder === "asc" ? 1 : -1,
            },
          },
        ]
      : []),
    {
      $skip: Number(skipCount),
    },
    {
      $limit: Number(pageSize),
    },
  ];

  const data = await Application.aggregate(mainPipeline).exec();

  return {
    totalCount,
    data,
  };
}

/**
 * Count the number of results for a query
 * @param {*} query     query
 * @returns the count of the documents for the specific query
 */
async function countApplications(query) {
  return await Application.countDocuments(query);
}

async function getMostDesiredFieldsOfWork() {
  return await Application.aggregate([
    // Join Applications and Company collections using the company field
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
    // Unwind the company array to make it easier to group by fieldOfWork
    {
      $unwind: "$company",
    },
    // Group by fieldOfWork and count the number of applications in each group
    {
      $group: {
        _id: "$company.fieldOfWork",
        applications: { $sum: 1 },
      },
    },
    // Sort by the count in descending order
    {
      $sort: { applications: -1 },
    },
  ]);
}

async function getMostDesiredCompanies() {
  return await Application.aggregate([
    {
      $group: {
        _id: "$company",
        companyName: { $first: "$companyName" },
        applications: { $sum: 1 },
      },
    },
    // Sort by count in descending order again
    {
      $sort: { applications: -1 },
    },
  ]);
}

module.exports = {
  countApplications,
  createApplication,
  getOneApplication,
  queryApplications,
  getAllApplications,
  updateOneApplication,
  getMostDesiredCompanies,
  getMostDesiredFieldsOfWork,
  queryApplicationAppendStudentOfferData,
};
