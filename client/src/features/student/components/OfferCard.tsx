import { Card, Typography, Avatar } from "antd";
import { IconText } from "common";
import { IOfferCardData } from "common/types";
import {
  SendOutlined,
  SolutionOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

interface OfferCardProps {
  offerData: IOfferCardData;
}

const OfferCard = ({ offerData }: OfferCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 476, marginTop: 16 }}
      actions={[
        <IconText
          icon={SolutionOutlined}
          text={offerData.availablePos}
          tooltip={"Offered Positions"}
        />,
        <IconText
          icon={UnlockOutlined}
          text={offerData.remainingAvailablePos}
          tooltip={"Positions Available"}
        />,
        <IconText
          icon={SendOutlined}
          text={offerData.applications}
          tooltip={"Total Applications"}
        />,
      ]}
    >
      <Card.Meta
        avatar={
          <Avatar
            src={`https://ui-avatars.com/api/?name=${offerData.title}&background=0F1C80&color=FFFFFF&bold=true`}
          />
        }
        title={
          <a href={`http://localhost:3000/student/offer/${offerData._id}`}>
            {offerData.title}
          </a>
        }
        description={`${offerData.companyName} | ${offerData.departament}`}
      />
      <Typography.Paragraph ellipsis={{ rows: 3 }}>
        <br />
        {offerData.description}
      </Typography.Paragraph>
    </Card>
  );
};

export default OfferCard;
