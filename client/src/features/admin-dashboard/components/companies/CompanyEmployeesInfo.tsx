import { Typography, Row, Col, Divider } from "antd";
import { useTranslation } from "react-i18next";
import EmployeeInfo from "../EmployeeInfo";
import { IEmployeeData } from "../EmployeeInfo";

interface CompanyEmployeesInfoProps {
  legalRep: IEmployeeData;
  handler: IEmployeeData;
}

const CompanyEmployeesInfo: React.FC<CompanyEmployeesInfoProps> = ({
  legalRep,
  handler,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("LEGAL_REP")}</Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={legalRep} />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            {t("INTERNSHIP_HANDLER")}
          </Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={handler} />
        </Col>
      </Row>
    </>
  );
};

export default CompanyEmployeesInfo;
