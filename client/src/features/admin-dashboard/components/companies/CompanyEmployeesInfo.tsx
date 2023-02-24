import { Typography, Row, Col, Divider } from "antd";
import EmployeeInfo from "./EmployeeInfo";
import { IEmployeeData } from "./EmployeeInfo";

interface CompanyEmployeesInfoProps {
  legalRep: IEmployeeData;
  handler: IEmployeeData;
}

const CompanyEmployeesInfo: React.FC<CompanyEmployeesInfoProps> = ({
  legalRep,
  handler,
}) => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>Legal Representative</Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={legalRep} />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>Internship Handler</Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={handler} />
        </Col>
      </Row>
    </>
  );
};

export default CompanyEmployeesInfo;
