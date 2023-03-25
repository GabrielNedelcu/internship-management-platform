import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography, Spin, Row, Col } from "antd";

import { ContainerOutlined, UserOutlined } from "@ant-design/icons";

import { LoadingPage, Tabs } from "common";
import { ITabProps } from "common/types";

import { StudentData } from "../components";
import useStudentProfile from "../hooks/useStudentProfile";

const StudentProfile = () => {
  const { t } = useTranslation();

  const params = useParams();
  const studentId = params.studentId;

  const { isLoading, studentData, refetchStudentData } = useStudentProfile(
    studentId || ""
  );

  if (!studentData) return <LoadingPage message={t("FETCHING_STUDENT_DATA")} />;

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("PROFILE_INFO")}
        </span>
      ),
      key: "1",
      children: (
        <StudentData
          studentData={studentData}
          onAfterUpdate={refetchStudentData}
        />
      ),
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
      <Spin spinning={isLoading} size="large" tip={t("FETCHING_PROFILE_DATA")}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{studentData.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {studentData.email}
            </Typography.Title>
          </Col>
        </Row>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default StudentProfile;
