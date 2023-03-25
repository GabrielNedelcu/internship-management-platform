import { useQuery } from "@tanstack/react-query";
import { Col, Descriptions, notification, Row, Tag, Typography } from "antd";
import { Card, LoadingPage } from "common";
import dayjs from "dayjs";
import StudentInternshipDocuments from "./StudentInternshipDocuments";
import { useTranslation } from "react-i18next";
import { getInternship } from "../api";

interface IInternshipOverviewProps {
  internshipId: string;
}

const StudentInternship = ({ internshipId }: IInternshipOverviewProps) => {
  const { t } = useTranslation();
  const { data: internshipData } = useQuery(
    ["getInternship", internshipId],
    () => {
      return getInternship(internshipId);
    },
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_INTERNSHIP_DATA"),
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
        <Col span={6}>
          <Card
            title={t("COMPANY")}
            content={
              <>
                <br />
                <Typography.Link href={`/company/${internshipData.company}`}>
                  {internshipData.companyData.name}
                </Typography.Link>
              </>
            }
          />
        </Col>

        <Col span={6}>
          <Card
            title={t("OFFER")}
            content={
              <>
                <br />
                <Typography.Link
                  href={`/dashboard/admin/offer/${internshipData.offer}`}
                >
                  {internshipData.offerData.title}
                </Typography.Link>
              </>
            }
          />
        </Col>

        <Col span={6}>
          <Card
            title={t("PROFESSOR")}
            content={
              <>
                <br />
                {internshipData.professor ? (
                  <Typography.Link
                    href={`/dashboard/admin/teacher/${internshipData.professor}`}
                  >
                    {internshipData?.professorData[0].name}
                  </Typography.Link>
                ) : (
                  <Tag color="red">{t("NOT_ASSIGNED")}</Tag>
                )}
              </>
            }
          />
        </Col>

        <Col span={6}>
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
          <StudentInternshipDocuments internshipId={internshipId} />
        </Col>
      </Row>
    </>
  );
};

export default StudentInternship;
