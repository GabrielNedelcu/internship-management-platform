import { Card, Col, Statistic } from "antd";
import { LoadingPage } from "common";
import { useTranslation } from "react-i18next";
import useStats from "../hooks/useStats";

const Stats = () => {
  const { t } = useTranslation();

  const {
    isLoading,
    studentsCount,
    professorsCount,
    applicationsCount,
    internshipsCount,
    offersStats,
  } = useStats();

  if (
    isLoading ||
    !studentsCount ||
    !professorsCount ||
    !applicationsCount ||
    !internshipsCount ||
    !offersStats
  )
    return <LoadingPage message="" />;

  return (
    <>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_STUDENTS")}
            value={studentsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_PROFFESORS")}
            value={professorsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_COMPANIES")}
            value={offersStats.validatedCompanyCount}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_OFFERS")}
            value={offersStats.totalNumOffers}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_POSITIONS_OFFERED")}
            value={offersStats.totalNumPositions}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_AVAILABLE_POSITIONS")}
            value={offersStats.totalNumPositions - internshipsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_APPLICATIONS")}
            value={applicationsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_INTERNSHIPS")}
            value={internshipsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title={t("TOTAL_NUM_STUDENTS_WITHOUT_INTERNSHIPS")}
            value={studentsCount.count - internshipsCount.count}
            valueStyle={{ color: "rgb(15, 28, 112)" }}
          />
        </Card>
      </Col>
    </>
  );
};

export default Stats;
