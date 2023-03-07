import { IFetchOptions } from "common/types";

export const initialFetchOptions: IFetchOptions = {
  paginationParams: {
    page: 1,
    pageSize: 21,
  },
  sortOrder: "",
  searchValue: "",
};

export enum URL_ROUTES {
  STUDENTS = "/students",
  COMPANIES = "/companies",
  OFFERS = "/offers",
  APPLICATIONS = "/applications",
}

export enum USER_ROLES {
  ADMIN = "admin",
  STUDENT = "student",
  COMPANY = "company",
}
