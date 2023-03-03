import { IQueryParameters } from "common/types";

/**
 * Return the user display value of field "fieldOfWork" from the value saved
 * on the server
 * @param fow db value for field of work
 * @returns user display value
 */
export const getFieldOfWork = (fow: string) => {
  switch (fow) {
    case "telecom":
      return "Telecom";
    case "softwareDev":
      return "Software Developement";
    case "electronics":
      return "Electronics";
    case "other":
      return "Other";
    default:
      return "";
  }
};

/**
 * Append query parameter to the url
 * @param url initial url
 * @param paramName name of the parameter to add
 * @param paramValue value of the parameter to add
 * @returns the new url
 */
export const addParameterToQuery = (
  url: string,
  paramName: string,
  paramValue: string | number
) => {
  let newUrl = url;

  if (url.at(-1) !== "?") newUrl += "&";
  newUrl += `${paramName}=${paramValue}`;
  return newUrl;
};

/**
 * Add query parameters to the url
 *
 * @param baseURL the base url
 * @param queryParams parameters to add to the query
 *
 * @return the query with the parameters added
 */
export const buildQuery = (baseURL: string, queryParams?: IQueryParameters) => {
  let url: string = `${baseURL}`;
  if (queryParams) {
    url += "?";

    if (queryParams.fields)
      url = addParameterToQuery(url, "fields", queryParams.fields);
    if (queryParams.pagination) {
      url = addParameterToQuery(url, "page", queryParams.pagination.page);
      url = addParameterToQuery(
        url,
        "pageSize",
        queryParams.pagination.pageSize
      );
    }
    if (queryParams.sort)
      url = addParameterToQuery(url, "sort_by", queryParams.sort);
  }

  return url;
};
