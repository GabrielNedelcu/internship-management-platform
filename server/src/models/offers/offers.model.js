const Offer = require("./offers.mongo");

/**
 * Create a new offer
 *
 * @param {Object} offerData    - the data needed to create a new student
 */
async function createOffer(offerData) {
  const offer = new Offer(offerData);
  await offer.save();
  return offer;
}

/**
 * Retrieve the offer associated with an id
 *
 * @param {ObjectId} offerId     - the id corresponding to the offer
 * @param {ObjectId} projection  - the projection for the query
 *
 * @returns {Object}              - the retrieved offer
 */
async function getOneOffer(offerId, projection = {}) {
  return await Offer.findById(offerId, projection);
}

/**
 * Get all the Offers
 *
 * @returns {Array}             - the retrieved offers
 */
async function getAllOffers() {
  return await Offer.find({});
}

/**
 * Update a offer
 *
 * @param {ObjectId} offerId      - the id of the offer to be updated
 * @param {Object}     offerData    - new data to update the offer
 */
async function updateOneOffer(offerId, offerData) {
  return await Offer.findByIdAndUpdate(offerId, offerData, {
    runValidators: true,
    new: true,
  });
}

/**
 * Query the offers collection
 *
 * @param {Object} query              - query parameters
 * @param {Object} options            - additional options
 *
 * @returns {Array}                 - Array of JSON objects resulting after the query
 */
async function queryOffers(query, options) {
  return await Offer.find(query, options);
}

/**
 * Retrieve all the offers of the validated companies
 * @param {*} searchFilter search for company name or for job title
 * @param {*} projection query projection
 * @param {*} sortBy field to sort by
 * @param {*} sortOrder sort order
 * @param {*} skipCount number of documents to skip
 * @param {*} pageSize number of documents to retrieve
 * @returns object containing the total documents and the requested number of documents
 */
async function getValidatedOffers(
  searchFilter,
  projection,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const pipeline = [
    {
      $lookup: {
        from: "companies",
        localField: "companyID",
        foreignField: "_id",
        as: "companyData",
        pipeline: [
          {
            $project: {
              validated: 1,
            },
          },
        ],
      },
    },
    {
      $match: {
        "companyData.0.validated": true,
      },
    },
    {
      $match: {
        $or: [
          { companyName: { $regex: new RegExp(searchFilter, "i") } },
          { title: { $regex: new RegExp(searchFilter, "i") } },
        ],
      },
    },
    {
      $count: "totalDocuments",
    },
  ];

  const countResult = await Offer.aggregate(pipeline).exec();
  const totalCount = countResult[0] ? countResult[0].totalDocuments : 0;

  const mainPipeline = [
    ...pipeline.slice(0, -1),
    {
      $project: projection,
    },
    {
      $match: {
        $or: [
          { companyName: { $regex: new RegExp(searchFilter, "i") } },
          { title: { $regex: new RegExp(searchFilter, "i") } },
        ],
      },
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

  const data = await Offer.aggregate(mainPipeline).exec();

  return {
    totalCount,
    data,
  };
}

/**
 * Retrieve all the offers of a companies
 * @param {*} query     query
 * @param {*} projection query projection
 * @param {*} sortBy field to sort by
 * @param {*} sortOrder sort order
 * @param {*} skipCount number of documents to skip
 * @param {*} pageSize number of documents to retrieve
 * @returns object containing the total documents and the requested number of documents
 */
async function getCompanyOffers(
  query,
  projection,
  sortBy,
  sortOrder,
  skipCount,
  pageSize
) {
  const totalCount = await Offer.countDocuments(query);
  const data = await Offer.find(query, projection)
    .sort({ [`${sortBy}`]: sortOrder })
    .skip(skipCount)
    .limit(pageSize);

  return { totalCount, data };
}

module.exports = {
  createOffer,
  getOneOffer,
  getAllOffers,
  updateOneOffer,
  queryOffers,
  getValidatedOffers,
  getCompanyOffers,
};
