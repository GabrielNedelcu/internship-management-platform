import { Typography, Row, Col, Divider } from "antd";
import { useTranslation } from "react-i18next";

import EmployeeInfo from "./EmployeeInfo";
import { ICompanyData } from "common/types";

interface ICompanyEmployeeInfoProps {
  companyData: ICompanyData;
}

const CompanyEmployeesInfo = ({ companyData }: ICompanyEmployeeInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={4}>{t("LEGAL_REP")}</Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={companyData.legalRep} />
        </Col>
        <Col span={12}>
          <Typography.Title level={4}>
            {t("INTERNSHIP_HANDLER")}
          </Typography.Title>
          <Divider />
          <EmployeeInfo employeeData={companyData.handler} />
        </Col>
      </Row>
    </>
  );
};

export default CompanyEmployeesInfo;
