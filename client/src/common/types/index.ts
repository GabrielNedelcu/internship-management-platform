import { APPLICATION_STATUS } from "common/constants";
import React from "react";

export interface IEditableStudentData {
  legalAddress: string;
  address: string;
  birthPlace: string;
  birthDay: string;
  phone: string;
  citizenship: string;
  cv: File;
  profileCompleted?: boolean;
}

export interface IStudentData {
  _id?: string;
  email?: string;
  name?: string;
  group?: string;
  major?: string;
  cv?: string;
  profileCompleted?: boolean;
  cnp?: string;
  passport?: string;
  legalAddress?: string;
  address?: string;
  birthPlace?: string;
  birthDay?: Date;
  phone?: string;
  citizenship?: string;
  internship?: string;
}

export interface ICompanyCardData {
  _id: string;
  name: string;
  fieldOfWork: string;
  description: string;
  numOffers: number;
  numPositions: number;
}

export interface IEmployeeData {
  _id?: string;
  name?: string;
  jobTitle?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ICompanyData {
  _id?: string;
  email?: string;
  name?: string;
  address?: string;
  contactNumber?: string;
  description?: string;
  fieldOfWork?: string;
  legalRep?: IEmployeeData;
  handler?: IEmployeeData;
  internshipMainAddress?: string;
  internshipOtherAddresses?: string;
  internshipOtherAdvantages?: string;
  internshipCompensation?: string;
  internshipContract?: string;
  validated?: boolean;
  numOffers?: number;
  numPositions?: number;
  createdAt?: Date;
  annex?: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IFilter {
  field: string;
  values: string[];
}

export interface IQueryParameters {
  fields?: string;
  pagination?: IPagination;
  sort?: string;
  filters?: IFilter[];
}

export interface IOfferCardData {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  departament: string;
  availablePos: number;
  remainingAvailablePos: number;
  applications: number;
}

export interface IOfferData {
  _id?: string;
  companyID?: string;
  companyName?: string;
  title?: string;
  description?: string;
  departament?: string;
  requirements?: string;
  mentions?: string;
  supervisor?: IEmployeeData;
  availablePos?: number;
  remainingAvailablePos?: number;
  applications?: number;
  createdAt?: Date;
  application?: string;
}

export interface IPasswordChangeData {
  accountPassword: string;
  accountPassword_confirmation: string;
}

export interface IApplicationData {
  _id?: string;
  student?: string;
  offer?: string;
  company?: string;
  offerTitle?: string;
  companyName?: string;
  studentName?: string;
  studentEmail?: string;
  studentMajor?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  studentData?: IStudentData[];
  offerData?: IOfferData[];
}

export interface IFetchOptions {
  paginationParams: IPagination;
  sortOrder: string;
  searchValue: string;
  filters?: IFilter[];
}

export interface IServerResponseMultipleFetch {
  totalCount: number;
  data: any;
}

export interface INavBarProps {
  selectedKey: string;
}

export interface IOfferStats {
  available: number;
  offered: number;
  applications: number;
  rejected: number;
  accepted: number;
}

export interface IComboEntry {
  text: string;
  value: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ILayoutProps {
  sider: React.ReactElement;
  content?: React.ReactElement;
}

export interface ITabProps {
  label: React.ReactElement | string;
  key: string;
  children: React.ReactElement | string;
}

export interface IApplicationStatusUpdateData {
  applicationId: string;
  newStatus: APPLICATION_STATUS;
}

export interface IProfessorData {
  _id: string;
  email?: string;
  name?: string;
  title?: string;
  privatePhone?: string;
  publicPhone?: string;
  departament?: string;
  numPositions?: number;
  numAvailablePositions?: number;
  admin?: boolean;
}

export interface IJournalEntryData {
  _id?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface IInternshipData {
  _id?: string;
  student?: string;
  professor?: string;
  company?: string;
  offer?: string;
  studentData?: IStudentData;
  companyData?: ICompanyData;
  offerData?: IOfferData;
  professorData?: IProfessorData;
  journal?: IJournalEntryData[];
  documents?: IInternshipDocumentsData;
  createdAt?: Date;
}

export interface ITagProps {
  message: string;
  color: string;
}

export interface IInternshipDocumentsData {
  tripartit: IDocumentData;
  annex2: IDocumentData;
  annex3: IDocumentData;
  annex7: IDocumentData;
}

export interface IDocumentData {
  filename: string;
  validated: boolean;
  validationMessage?: string;
}

export interface IStudentStatsData {
  applications: number;
  pendingReview: number;
  accepted: number;
  declined: number;
}

export interface ICountServerResponse {
  count: number;
}

export interface IOffersStats {
  totalNumOffers: number;
  totalNumPositions: number;
  validatedCompanyCount: number;
}

export interface IFieldOfWorkApplications {
  _id: string; // corresponding to the name of the field of work
  applications: number;
}

export interface ICompanyApplications {
  _id: string; // corresponding to the id of the company
  companyName: string;
  applications: number;
}

export interface IApplicationsStats {
  mostDesiredFieldsOfWork: IFieldOfWorkApplications[];
  mostDesiredCompanies: ICompanyApplications[];
}
