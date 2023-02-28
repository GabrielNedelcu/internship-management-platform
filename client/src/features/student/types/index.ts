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
  stats: {
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
