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
