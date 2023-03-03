import { Card, Typography, Avatar } from "antd";
import { ICompanyCardData } from "common/types";
import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { IconText } from "common";
import { getFieldOfWork } from "common/utils";

interface CompanyCardProps {
  companyData: ICompanyCardData;
}

const CompanyCard = ({ companyData }: CompanyCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 476, marginTop: 16 }}
      actions={[
        <IconText
          icon={ContainerOutlined}
          text={companyData.numOffers}
          tooltip={"Offers"}
        />,
        <IconText
          icon={UserOutlined}
          text={companyData.numPositions}
          tooltip={"Positions"}
        />,
      ]}
    >
      <Card.Meta
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
        description={`Field of work: ${getFieldOfWork(
          companyData.fieldOfWork
        )}`}
      />
      <Typography.Paragraph ellipsis={{ rows: 3 }}>
        <br />
        {companyData.description}
      </Typography.Paragraph>
    </Card>
  );
};

export default CompanyCard;
