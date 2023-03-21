import { Typography } from "antd";
import { IEmployeeData } from "common/types";

import { useTranslation } from "react-i18next";

interface IEmployeeInfoProps {
  employeeData?: IEmployeeData;
}

const EmployeeInfo = ({ employeeData }: IEmployeeInfoProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography.Title level={4}>{t("NAME")}</Typography.Title>
      <Typography.Paragraph>{employeeData?.name}</Typography.Paragraph>
      <Typography.Title level={4}>{t("EMAIL")}</Typography.Title>
      <Typography.Paragraph>{employeeData?.email}</Typography.Paragraph>
      <Typography.Title level={4}>{t("JOB_TITLE")}</Typography.Title>
      <Typography.Paragraph>{employeeData?.jobTitle}</Typography.Paragraph>
      <Typography.Title level={4}>{t("PHONE_NUMBER")}</Typography.Title>
      <Typography.Paragraph>{`+40${employeeData?.phoneNumber}`}</Typography.Paragraph>
    </>
  );
};

export default EmployeeInfo;
