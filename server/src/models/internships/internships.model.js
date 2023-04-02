const Internship = require("./internships.mongo");

/**
 * Create a new internship
 *
 * @param {JSON} internshipData    - the data needed to create a new internship
 */
async function createInternship(internshipData) {
  const internship = new Internship(internshipData);
  await internship.save();
  return internship;
}

/**
 * Delete one internship
 *
 * @param {ObjectId} internshipId  - the id corresponding to the internship
 */
async function deleteOneInternship(internshipId) {
  await Internship.findByIdAndDelete(internshipId);
}

/**
 * Retrieve the internship associated with an id
 *
 * @param {ObjectId} internshipId  - the id corresponding to the internship
 * @param {Object} projection      -projection
 * @returns {JSON}                 - the retrieved internship
 */
async function getOneInternship(internshipId, projection = {}) {
  return await Internship.findById(internshipId, projection);
}

/**
 * Get all the internships
 *
 * @returns {Array}             - the retrieved internships
 */
async function getAllInternships() {
  return await Internship.find({});
}

/**
 * Update a internship
 *
 * @param {ObjectId} internshipId      - the id of the internship to be updated
 * @param {JSON}     internshipData    - new data to update the internship
 */
async function updateOneInternship(internshipId, internshipData) {
  return await Internship.findByIdAndUpdate(internshipId, internshipData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query the companies collection
 *
 * @param {JSON} query              - query parameters
 * @param {JSON} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryInternships(
  query,
  options,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Internship.countDocuments(query);
  const data = await Internship.find(query, options)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

async function queryInternshipsAppendReferencedData(
  query,
  projection = {},
  studentProjection = {},
  companyProjection = {},
  offerProjection = {},
  professorProjection = {},
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
        ...(Object.keys(studentProjection).length && {
          pipeline: [
            {
              $project: studentProjection,
            },
          ],
        }),
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
        ...(Object.keys(offerProjection).length && {
          pipeline: [
            {
              $project: offerProjection,
            },
          ],
        }),
      },
    },
    {
      $unwind: "$offerData",
    },
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "companyData",
        ...(Object.keys(professorProjection).length && {
          pipeline: [
            {
              $project: professorProjection,
            },
          ],
        }),
      },
    },
    {
      $unwind: "$companyData",
    },
    {
      $lookup: {
        from: "professors",
        localField: "professor",
        foreignField: "_id",
        as: "professorData",
        ...(Object.keys(companyProjection).length && {
          pipeline: [
            {
              $project: companyProjection,
            },
          ],
        }),
      },
    },
    // {
    //   $unwind: "$professorData",
    // },
    {
      $match: query,
    },
    {
      $count: "totalDocuments",
    },
  ];

  const countResult = await Internship.aggregate(pipeline).exec();
  const totalCount = countResult[0] ? countResult[0].totalDocuments : 0;
  const mainPipeline = [
    ...pipeline.slice(0, -1),
    {
      $match: query,
    },
    ...(Object.keys(projection).length
      ? [
          {
            $project: projection,
          },
        ]
      : []),
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

  const data = await Internship.aggregate(mainPipeline).exec();

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
async function countInternships(query) {
  return await Internship.countDocuments(query);
}

module.exports = {
  createInternship,
  getOneInternship,
  queryInternships,
  countInternships,
  getAllInternships,
  deleteOneInternship,
  updateOneInternship,
  queryInternshipsAppendReferencedData,
};
