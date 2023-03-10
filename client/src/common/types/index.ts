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
  stats?: {
    applications: number;
    acceptances: number;
  };
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
}

export interface IPagination {
  page: number;
  pageSize: number;
}

export interface IQueryParameters {
  fields?: string;
  pagination?: IPagination;
  sort?: string;
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
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFetchOptions {
  paginationParams: IPagination;
  sortOrder: string;
  searchValue: string;
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
