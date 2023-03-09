import { Typography, Avatar } from "antd";
import { IconText, Card } from "common";
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
      avatar={
        <Avatar
          src={`https://ui-avatars.com/api/?name=${offerData.title}&background=0F1C80&color=FFFFFF&bold=true`}
        />
      }
      title={
        <a href={`http://localhost:3000/company/offer/${offerData._id}`}>
          {offerData.title}
        </a>
      }
      description={`${offerData.companyName} | ${offerData.departament}`}
      content={
        <Typography.Paragraph ellipsis={{ rows: 3 }}>
          <br />
          {offerData.description}
        </Typography.Paragraph>
      }
    />
  );
};

export default OfferCard;
