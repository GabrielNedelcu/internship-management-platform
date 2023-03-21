import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography, Spin, Row, Col, Button } from "antd";

import { ContainerOutlined, UserOutlined } from "@ant-design/icons";

import { LoadingPage, Tabs } from "common";
import { ITabProps } from "common/types";

import { ProfessorData } from "../components";
import useProfessorProfile from "../hooks/useProfessorProfile";

const ProfessorProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const professorId = params.teacherId;

  const { isLoading, professorData, mutateUpdateProfessor } =
    useProfessorProfile(professorId || "");

  if (!professorData)
    return <LoadingPage message={t("FETCHING_TEACHER_DATA")} />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("PROFILE_INFO")}
        </span>
      ),
      key: "1",
      children: <ProfessorData professorData={professorData} />,
    },
    {
      label: (
        <span>
          <UserOutlined />
          {t("SUPERVISED_STUDENTS")}
        </span>
      ),
      key: "2",
      children: "",
    },
  ];

  return (
    <>
      <Spin spinning={isLoading} size="large" tip={t("FETCHING_TEACHER_DATA")}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{professorData.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {professorData.email}
            </Typography.Title>
          </Col>

          <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
            {!professorData.admin ? (
              <Button
                size="large"
                onClick={() => {
                  mutateUpdateProfessor({
                    profId: professorId || "",
                    newData: { _id: professorId || "", admin: true },
                  });
                }}
              >
                {t("MAKE_ADMIN")}
              </Button>
            ) : (
              <Button
                danger
                size="large"
                onClick={() => {
                  mutateUpdateProfessor({
                    profId: professorId || "",
                    newData: { _id: professorId || "", admin: false },
                  });
                }}
              >
                {t("REMOVE_ADMIN")}
              </Button>
            )}
          </Col>
        </Row>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default ProfessorProfile;
