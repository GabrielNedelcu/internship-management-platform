import { Col, Row, Typography, Card, List, Button, Tag } from "antd";
import { LoadingPage } from "common";
import CardComp from "common/components/CardComp";
import { IApplicationData, IInternshipData, IOfferData } from "common/types";
import { getApplicationStatusTag } from "common/utils";
import { useTranslation } from "react-i18next";
import useCompanyStats from "../hooks/useCompanyStats";

const CompanyStats = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    applicationsList,
    internshipsList,
    offers,
    companyProfileData,
    inReviewApps,
  } = useCompanyStats();

  if (
    !offers ||
    !applicationsList ||
    !internshipsList ||
    !companyProfileData ||
    !inReviewApps ||
    isLoading
  )
    return <LoadingPage message="" />;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18} push={6}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <CardComp
                title={
                  <Typography.Title level={5}>
                    {t("AVAILABLE_POSITIONS")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {companyProfileData.numPositions
                      ? companyProfileData.numPositions -
                        internshipsList.totalCount
                      : "Nan"}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <CardComp
                title={
                  <Typography.Title level={5}>
                    {t("POSITIONS_TAKEN")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {internshipsList.totalCount}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <CardComp
                title={
                  <Typography.Title level={5}>
                    {t("APPLICATIONS")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {applicationsList.totalCount}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={12}>
              <CardComp
                title={
                  <Typography.Title level={5}>
                    {t("APPLICATIONS_TO_REVIEW")}
                  </Typography.Title>
                }
                content={
                  <Typography.Title
                    level={3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {inReviewApps.totalCount}
                  </Typography.Title>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={6} pull={18}>
          <CardComp
            title={
              <Typography.Title level={3} style={{ color: "white" }}>
                {t("OFFERS")}
              </Typography.Title>
            }
            content={
              <Typography.Title
                level={1}
                style={{
                  color: "white",
                  textAlign: "center",
                }}
              >
                {offers.totalCount}
              </Typography.Title>
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

        <Col span={8}>
          <Card title={t("INCOMPLETE_OFFERS")}>
            <List
              itemLayout="horizontal"
              dataSource={offers.data}
              renderItem={(offer: IOfferData) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <a href={`/company/offer/${offer._id}`}>{offer.title}</a>
                    }
                    description={`${offer.remainingAvailablePos} ${t(
                      "AVAILABLE_POSITIONS"
                    )}`}
                  />
                  <Tag color={"purple"}>
                    {`${offer.applications} ${t("APPLICATIONS")}`}
                  </Tag>
                </List.Item>
              )}
            />
            <Button type="primary" block href="/company/offers">
              {t("VIEW_MORE")}
            </Button>
          </Card>
        </Col>

        <Col span={8}>
          <Card title={t("LATEST_APPLICATIONS")}>
            <List
              itemLayout="horizontal"
              dataSource={applicationsList.data}
              renderItem={(application: IApplicationData) => (
                <List.Item>
                  <List.Item.Meta
                    title={<>{application.studentName}</>}
                    description={
                      <a href={`/company/offer/${application.offer}`}>
                        {application.offerTitle}
                      </a>
                    }
                  />
                  <Tag
                    color={
                      getApplicationStatusTag(application.status || "").color
                    }
                  >
                    {getApplicationStatusTag(application.status || "").message}
                  </Tag>
                </List.Item>
              )}
            />
            <Button type="primary" block href="/company/applications">
              {t("VIEW_MORE")}
            </Button>
          </Card>
        </Col>

        <Col span={8}>
          <Card title={t("LATEST_ACCEPTED_STUDENTS")}>
            <List
              itemLayout="horizontal"
              dataSource={internshipsList.data}
              renderItem={(internship: IInternshipData) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <a href={`/company/internship/${internship._id}`}>
                        {internship.studentData?.name}
                      </a>
                    }
                    description={
                      <a href={`/company/offer/${internship.offer}`}>
                        {internship.offerData?.title}
                      </a>
                    }
                  />
                </List.Item>
              )}
            />
            <Button type="primary" block href="/company/internships">
              {t("VIEW_MORE")}
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CompanyStats;
