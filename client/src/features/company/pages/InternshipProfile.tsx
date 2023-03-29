import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Descriptions, notification, Row, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";

import { Card, LoadingPage } from "common";
import { getInternship } from "../api";
import dayjs from "dayjs";

const InternshipProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const internshipId = params.internshipId;

  const { data: internshipData } = useQuery(
    ["getInternship", internshipId],
    () => {
      return getInternship(internshipId || "");
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
    return <LoadingPage message={t("FETCHING_OFFER_DATA")} />;

  return (
    <>
      <Typography.Title level={1}>{t("INTERNSHIP_PROFILE")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("INTERNSHIP_PROFILE_MSG")}
      </Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title={t("GENERAL_INFORMATION")}
            content={
              <>
                <br />
                <Descriptions layout="vertical">
                  <Descriptions.Item label={t("Ref#")} span={1.5}>
                    {internshipData._id}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("CREATED")} span={1.5}>
                    {dayjs(internshipData.createdAt)
                      .format("MMMM D YYYY")
                      .toString()}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("COMPANY")} span={1.5}>
                    {internshipData.companyData?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("Offer")} span={1.5}>
                    <a href={`/company/offer/${internshipData.offer}`}>
                      {internshipData.offerData?.title}
                    </a>
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>

        <Col span={12}>
          <Card
            title={"Student"}
            content={
              <>
                <br />
                <Descriptions layout="vertical">
                  <Descriptions.Item label={t("NAME")}>
                    {internshipData.studentData?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("GROUP")}>
                    {internshipData.studentData?.group}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("MAJOR")}>
                    {internshipData.studentData?.major}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("PHONE_NUMBER")}>
                    +40{internshipData.studentData?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("EMAIL")}>
                    {internshipData.studentData?.email}
                  </Descriptions.Item>
                </Descriptions>
              </>
            }
          />
        </Col>

        <Col span={12}>
          <Card
            title={t("SUPERVISOR")}
            content={
              <>
                <br />
                <Descriptions layout="vertical">
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

        <Col span={12}>
          <Card
            title={t("ASSIGNED_PROFESSOR")}
            content={
              <>
                <br />
                {internshipData.professor ? (
                  <Descriptions layout="vertical">
                    <Descriptions.Item label={t("NAME")}>
                      {internshipData.professorData[0].name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("EMAIL")} span={0.5}>
                      {internshipData.professorData[0].email}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("PHONE_NUMBER")}>
                      +40{internshipData.professorData[0].publicPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("DEPARTAMENT")}>
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

export default InternshipProfile;
