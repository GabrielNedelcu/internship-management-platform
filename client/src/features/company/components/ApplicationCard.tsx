import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { Card, IconText } from "common";
import { IApplicationData } from "common/types";
import { getApplicationStatus } from "common/utils";
import dayjs from "dayjs";

interface IApplicationCardProps {
  applicationData: IApplicationData;
}

const ApplicationCard = ({ applicationData }: IApplicationCardProps) => {
  return (
    <Card
      actions={[
        <IconText
          icon={Loading3QuartersOutlined}
          text={getApplicationStatus(applicationData.status || "")}
        />,
      ]}
      avatar={
        <Avatar
          src={`https://ui-avatars.com/api/?name=${applicationData.studentName}&background=0F1C80&color=FFFFFF&bold=true`}
        />
      }
      title={
        <a
          href={`http://localhost:3000/company/application/${applicationData.offer}`}
        >
          {applicationData.studentName}
        </a>
      }
      description={`Applied to ${applicationData.offerTitle}`}
      content={
        <Typography.Paragraph ellipsis={{ rows: 3 }}>
          <br />
          {`Student has applied on ${dayjs(applicationData.createdAt)}`}
        </Typography.Paragraph>
      }
    />
  );
};

export default ApplicationCard;
