import { Typography, Avatar } from "antd";
import { IconText, Card } from "common";
import { IOfferCardData } from "common/types";
import {
  SendOutlined,
  SolutionOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface OfferCardProps {
  offerData: IOfferCardData;
}

const OfferCard = ({ offerData }: OfferCardProps) => {
  const { t } = useTranslation();

  return (
    <Card
      actions={[
        <IconText
          icon={SolutionOutlined}
          text={offerData.availablePos}
          tooltip={t("OFFERED_POSITIONS").toString()}
        />,
        <IconText
          icon={UnlockOutlined}
          text={offerData.remainingAvailablePos}
          tooltip={t("AVAILABLE_POSITIONS").toString()}
        />,
        <IconText
          icon={SendOutlined}
          text={offerData.applications}
          tooltip={t("APPLICATIONS").toString()}
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
