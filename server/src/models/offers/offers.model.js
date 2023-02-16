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
 * @param {ObjectId} offerId  - the id corresponding to the offer
 *
 * @returns {Object}              - the retrieved offer
 */
async function getOneOffer(offerId) {
  return await Offer.findById(offerId);
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

module.exports = {
  createOffer,
  getOneOffer,
  getAllOffers,
  updateOneOffer,
  queryOffers,
};
