const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

/**
 * Parse the query and retrieve the pagination parameters
 *
 * QUERY EXAMPLE: page=1&pageSize=20
 *
 * @param {string} query request query string
 * @returns {number, number} number of resources to retrieve, number of items to skip
 */
const getPagination = (query) => {
  const page = query.page || DEFAULT_PAGE;
  const pageSize = query.pageSize || DEFAULT_PAGE_SIZE;

  const skipCount = (page - 1) * pageSize;

  return { pageSize, skipCount };
};

/**
 * Parse the query and retrieve the projection
 * Each property is separated by ","
 *
 * QUERY EXAMPLE: projection=_id,name,...etc.
 *
 * @param {string} query request query string
 * @returns object contiaing the fields for the projection
 */
const getProjection = (query) => {
  const projectionFields = query.fields;

  if (!projectionFields) return {};

  const projectionFieldsFormatted = projectionFields.replace(/ /g, "");
  const projectionFieldsArray = projectionFieldsFormatted.split(",");

  const projection = {};
  projectionFieldsArray.forEach((key) => {
    projection[key] = 1;
  });

  return projection;
};

/**
 * Parse the query and retrieve the sort parameters
 * the sort parameters must be a 2 word string, separated by "."
 * The first word is the order ('asc', 'desc') and the second one is the
 * field to sort by
 *
 * QUERY EXAMPLE: sort_by=asc.numOffers
 *
 * @param {*} query request query string
 * @returns {string, string} sort order, field to sort by or empty object
 * if no sort parameters were provided or the sort order is invalid
 */
const getSort = (query) => {
  const sort = query.sort_by;

  if (!sort) return {};

  const sortOrder = sort.split(".")[0];
  const sortBy = sort.split(".")[1];

  if (sortOrder !== "asc" && sortOrder !== "desc") return {};

  return { sortOrder, sortBy };
};

/**
 * Parse the string and retrieve the projection
 * Each property is separated by ","
 *
 * QUERY EXAMPLE: projection=_id,name,...etc.
 *
 * @param {string} query request query string
 * @returns object contiaing the fields for the projection
 */
const getProjectionFromString = (projectionFields) => {
  if (!projectionFields) return {};

  const projectionFieldsFormatted = projectionFields.replace(/ /g, "");
  const projectionFieldsArray = projectionFieldsFormatted.split(",");

  const projection = {};
  projectionFieldsArray.forEach((key) => {
    projection[key] = 1;
  });

  return projection;
};

module.exports = {
  getPagination,
  getProjection,
  getSort,
  getProjectionFromString,
};
