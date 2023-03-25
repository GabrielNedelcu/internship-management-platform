import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography, Spin, Row, Col, Result } from "antd";

import {
  ContainerOutlined,
  ReconciliationOutlined,
  BookOutlined,
} from "@ant-design/icons";

import { LoadingPage, Tabs } from "common";
import { ITabProps } from "common/types";

import {
  InternshipJournal,
  StudentData,
  StudentInternship,
} from "../components";
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
          <ReconciliationOutlined />
          {t("INTERNSHIP")}
        </span>
      ),
      key: "2",
      children: studentData.internship ? (
        <StudentInternship internshipId={studentData.internship} />
      ) : (
        <Result status="404" title={t("NO_INTERNSHIP")} />
      ),
    },
    {
      label: (
        <span>
          <BookOutlined />
          {t("INTERNSHIP_JOURNAL")}
        </span>
      ),
      key: "3",
      children: studentData.internship ? (
        <InternshipJournal internshipId={studentData.internship} />
      ) : (
        <Result status="404" title={t("NO_INTERNSHIP")} />
      ),
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
