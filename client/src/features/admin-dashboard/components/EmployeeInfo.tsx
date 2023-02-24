import { Typography } from "antd";

export interface IEmployeeData {
  name: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
}

interface EmployeeInfoProps {
  employeeData: IEmployeeData;
}

const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employeeData }) => {
  return (
    <>
      <Typography.Title level={4}>Name</Typography.Title>
      <Typography.Paragraph>{employeeData.name}</Typography.Paragraph>
      <Typography.Title level={4}>Email</Typography.Title>
      <Typography.Paragraph>{employeeData.email}</Typography.Paragraph>
      <Typography.Title level={4}>Job Title</Typography.Title>
      <Typography.Paragraph>{employeeData.jobTitle}</Typography.Paragraph>
      <Typography.Title level={4}>Phone Number</Typography.Title>
      <Typography.Paragraph>{`+40${employeeData.phoneNumber}`}</Typography.Paragraph>
    </>
  );
};

export default EmployeeInfo;
