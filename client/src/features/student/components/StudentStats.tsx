import { useQuery } from "@tanstack/react-query";
import { Col, notification, Row, Typography } from "antd";
import { Card, LoadingPage } from "common";
import { IStudentStatsData } from "common/types";
import { useTranslation } from "react-i18next";
import { getSelfStudentStats } from "../api";

const StudentStats = () => {
  const { t } = useTranslation();

  const { data: studentStats } = useQuery<IStudentStatsData>(
    ["getSelfStudentStats"],
    () => {
      return getSelfStudentStats();
    },
    {
      onError: () => {
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_STUDENT_STATS"),
          duration: 10,
        });
      },
    }
  );

  if (!studentStats) return <LoadingPage message="" />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={18} push={6}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card
              title={
                <Typography.Title level={5}>
                  {t("PENDING_REVIEW_FOR")}
                </Typography.Title>
              }
              content={
                <Typography.Title
                  level={3}
                  style={{
                    textAlign: "center",
                  }}
                >{`${studentStats.pendingReview} ${t(
                  "OFFERS"
                )}`}</Typography.Title>
              }
            />
          </Col>
          <Col span={12}>
            <Card
              title={
                <Typography.Title level={5}>
                  {t("ACCEPTANCES")}
                </Typography.Title>
              }
              content={
                <Typography.Title
                  level={3}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {`${studentStats.accepted} ${t("OFFERS")}`}
                </Typography.Title>
              }
            />
          </Col>
          <Col span={12}>
            <Card
              title={
                <Typography.Title level={5}>
                  {t("YOU_HAVE_BEEN_REJECTED_TO")}
                </Typography.Title>
              }
              content={
                <Typography.Title
                  level={3}
                  style={{
                    textAlign: "center",
                  }}
                >{`${studentStats.declined} ${t("OFFERS")}`}</Typography.Title>
              }
            />
          </Col>
        </Row>
      </Col>
      <Col span={6} pull={18}>
        <Card
          title={
            <Typography.Title level={3} style={{ color: "white" }}>
              {t("YOU_HAVE_APPLIED_TO")}
            </Typography.Title>
          }
          content={
            <Typography.Title
              level={3}
              style={{
                color: "white",
                textAlign: "center",
              }}
            >{`${studentStats.applications} ${t("OFFERS")}`}</Typography.Title>
          }
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(15, 28, 112)",
            color: "white",
            bottom: "16px",
          }}
        />
      </Col>
    </Row>
  );
};

export default StudentStats;
