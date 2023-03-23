import { useQuery } from "@tanstack/react-query";
import { Col, Descriptions, notification, Row, Typography } from "antd";
import { Card, LoadingPage } from "common";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { getInternship } from "../api";

interface IInternshipOverviewProps {
  internshipId: string;
}

const InternshipOverview = ({ internshipId }: IInternshipOverviewProps) => {
  const { t } = useTranslation();

  const { data: internshipData } = useQuery(
    ["getInternship", internshipId],
    () => {
      console.log(internshipId);
      return getInternship(
        internshipId,
        "company,offer,professor,professorData,companyData,offerData,createdAt"
      );
    },
    {
      onError: (data) => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_COMPANY_DATA"),
          duration: 10,
        });
      },
    }
  );

  if (!internshipData)
    return <LoadingPage message={t("FETCHING_INTERNSHIP")} />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title={t("COMPANY")}
            content={
              <>
                <br />
                <Typography.Link
                  href={`/student/company/${internshipData.company}`}
                >
                  {internshipData.companyData.name}
                </Typography.Link>
              </>
            }
          />
        </Col>

        <Col span={8}>
          <Card
            title={t("OFFER")}
            content={
              <>
                <br />
                <Typography.Link
                  href={`/student/offer/${internshipData.offer}`}
                >
                  {internshipData.offerData.title}
                </Typography.Link>
              </>
            }
          />
        </Col>

        <Col span={8}>
          <Card
            title={t("ACCEPTED_ON")}
            content={
              <>
                <br />
                <Typography>
                  {dayjs(internshipData.createdAt)
                    .format("MMMM D YYYY")
                    .toString()}
                </Typography>
              </>
            }
          />
        </Col>

        <Col span={24}>
          <Card
            title={t("SUPERVISOR")}
            content={
              <>
                <br />
                <Descriptions layout="horizontal">
                  <Descriptions.Item label={t("NAME")} span={1}>
                    {internshipData.offerData?.supervisor?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("EMAIL")} span={1}>
                    {internshipData.offerData?.supervisor?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("PHONE_NUMBER")} span={1}>
                    +40{internshipData.offerData?.supervisor?.phoneNumber}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>

        <Col span={24}>
          <Card
            title={t("ASSIGNED_PROFESSOR")}
            content={
              <>
                <br />
                {internshipData.professor ? (
                  <Descriptions layout="horizontal">
                    <Descriptions.Item label={t("NAME")} span={1}>
                      {internshipData.professorData[0].name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("EMAIL")} span={1}>
                      {internshipData.professorData[0].email}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("PHONE_NUMBER")} span={1}>
                      +40{internshipData.professorData[0].publicPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("DEPARTAMENT")} span={1}>
                      {internshipData.professorData[0].departament}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  t("NOT_ASSIGNED")
                )}
              </>
            }
          />
        </Col>
      </Row>
    </>
  );
};

export default InternshipOverview;
