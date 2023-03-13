import { Typography, Avatar } from "antd";
import { ICompanyCardData } from "common/types";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { IconText, Card } from "common";
import { getFieldOfWork } from "common/utils";
import { useTranslation } from "react-i18next";

interface ICompanyCardProps {
  companyData: ICompanyCardData;
}

const CompanyCard = ({ companyData }: ICompanyCardProps) => {
  const { t } = useTranslation();

  return (
    <Card
      actions={[
        <IconText
          icon={ContainerOutlined}
          text={companyData.numOffers}
          tooltip={t("OFFERS").toString()}
        />,
        <IconText
          icon={UserOutlined}
          text={companyData.numPositions}
          tooltip={t("POSITIONS").toString()}
        />,
      ]}
      avatar={
        <Avatar
          src={`https://ui-avatars.com/api/?name=${companyData.name}&background=0F1C80&color=FFFFFF&bold=true`}
        />
      }
      title={
        <a href={`http://localhost:3000/student/company/${companyData._id}`}>
          {companyData.name}
        </a>
      }
      description={`${t("FIELD_OF_WORK")}: ${getFieldOfWork(
        companyData.fieldOfWork
      )}`}
      content={
        <Typography.Paragraph ellipsis={{ rows: 3 }}>
          <br />
          {companyData.description}
        </Typography.Paragraph>
      }
    />
  );
};

export default CompanyCard;
