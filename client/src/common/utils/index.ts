import {
  IComboEntry,
  IDocumentData,
  IFilter,
  IQueryParameters,
  ITagProps,
} from "common/types";
import type { SorterResult, FilterValue } from "antd/es/table/interface";

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
 * Return the display value of the application's status from the value saved
 * on the server
 * @param fow db value for application status
 * @returns user display value
 */
export const getApplicationStatus = (serverStatus: string) => {
  switch (serverStatus) {
    case "inReview":
      return "In review by the company";
    case "interviewAccepted":
      return "Accepted for interview";
    case "companyAccepted":
      return "Accepted by the company";
    case "companyDeclined":
      return "Rejected";
    case "studentAccepted":
      return "Accepted by the student";
    case "studentDeclined":
      return "Declined by the student";
    case "waitingProffesor":
      return "Waiting for a professor to be assigned";
    case "professorAssgined":
      return "Professor assigned";
    default:
      return "";
  }
};

export const getApplicationStatusTag = (serverStatus: string) => {
  switch (serverStatus) {
    case "inReview":
      return { message: "pending review", color: "gold" };
    case "interviewAccepted":
      return { message: "pending interview", color: "geekblue" };
    case "companyAccepted":
      return { message: "pending student choice", color: "purple" };
    case "companyDeclined":
      return { message: "declined", color: "magenta" };
    case "studentAccepted":
      return { message: "pending teacher assign", color: "cyan" };
    case "studentDeclined":
      return { message: "student declined", color: "magenta" };
    case "waitingProffesor":
      return { message: "pending teacher assign", color: "cyan" };
    case "professorAssgined":
      return { message: "recruited", color: "green" };
    default:
      return { message: "", color: "" };
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
  paramValue: string | number | boolean
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

    if (queryParams.filters)
      queryParams.filters.map(
        (filter) =>
          (url = addParameterToQuery(
            url,
            filter.field,
            filter.values.join(",")
          ))
      );
  }

  return url;
};

/**
 * Returns a list of combo box entries representing all the majors
 * a student can have
 *
 * @returns array of IComboEntry
 */
export const getMajors = (): IComboEntry[] => {
  return [
    { text: "ELA", value: "ELA" },
    { text: "ELA_EN", value: "ELA_EN" },
    { text: "RST", value: "RST" },
    { text: "TST", value: "TST" },
    { text: "TST_EN", value: "TST_EN" },
    {
      text: "MON",
      value: "MON",
    },
    { text: "CTI", value: "CTI" },
  ];
};

/**
 * Returns a list of combo box entries representing possible applications
 * status for companies
 *
 * @returns array of IComboEntry
 */
export const getApplicationStatusOptionsForCompany = (): IComboEntry[] => {
  return [
    { text: "pending review", value: "inReview" },
    { text: "pending interview", value: "interviewAccepted" },
    { text: "pending student choice", value: "companyAccepted" },
    { text: "declined", value: "companyDeclined" },
    { text: "pending teacher assign", value: "studentAccepted" },
    {
      text: "student declined",
      value: "studentDeclined",
    },
    { text: "pending teacher assign", value: "waitingProffesor " },
    { text: "recruited", value: "professorAssgined " },
  ];
};

/**
 * Parse the sort object generated by the antd table
 * and return a string that can be interpreted by the server
 *
 * @param sortObject object generated by the antd table
 * @returns sort string inteligable by the server
 */
export const parseTableSortObject = (sortObject: SorterResult<any>): string => {
  if (!sortObject.order) return "";

  let parsedObject = "";
  parsedObject = sortObject.order === "ascend" ? "asc." : "desc.";
  parsedObject += sortObject.field;

  return parsedObject;
};

/**
 * Parse the filters object generated by the antd table
 * and return an array of internal filter objects
 *
 * @param filterObject filter object generated by the antd table
 * @returns array of internal filter objects
 */
export const parseTableFiltersObject = (
  filterObject: Record<string, FilterValue | null>
): IFilter[] => {
  let filters: IFilter[] = [];
  for (const [field, values] of Object.entries(filterObject)) {
    filters.push({
      field,
      values: values?.map((value) => value.toString()) || [],
    });
  }

  return filters;
};

/**
 * Returns a list oftable filter entries representing possible company fields of work
 *
 * @returns array of IComboEntry
 */
export const getFieldsOfWork = (): IComboEntry[] => {
  return [
    { text: "Telecom", value: "telecom" },
    { text: "Software Developement", value: "softwareDev" },
    { text: "Electronics", value: "electronics" },
    { text: "Other", value: "other" },
  ];
};

/**
 * Returns the props for the docuemt status tag
 *
 * @returns ITagData
 */
export const getDocumentStatus = (documentData?: IDocumentData): ITagProps => {
  if (!documentData) return { message: "NOT_UPLOADED", color: "blue" };
  else {
    if (documentData.validated) return { message: "VALIDATED", color: "green" };
    else {
      if (documentData.validationMessage)
        return { message: "INVALIDATED", color: "magenta" };
      else return { message: "PENDING_VALIDATION", color: "orange" };
    }
  }
};
