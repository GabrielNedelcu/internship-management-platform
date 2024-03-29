import { Result, Typography } from "antd";
import { useTranslation } from "react-i18next";

import {
  BookOutlined,
  ContainerOutlined,
  FileOutlined,
} from "@ant-design/icons";

import { ITabProps } from "common/types";
import { LoadingPage, Tabs } from "common";
import {
  InternshipDocuments,
  InternshipJournal,
  InternshipOverview,
} from "../components";

import useProfile from "../hooks/useProfile";

const Internship = () => {
  const { t } = useTranslation();

  const { studentProfileData } = useProfile();

  if (!studentProfileData) return <LoadingPage message="" />;

  if (!studentProfileData.internship)
    return (
      <Result
        status="404"
        title={t("NO_INTERNSHIP")}
        subTitle={t("NO_INTERNSHIP_MSG")}
      />
    );

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("OVERVIEW")}
        </span>
      ),
      key: "1",
      children: (
        <InternshipOverview internshipId={studentProfileData.internship} />
      ),
    },
    {
      label: (
        <span>
          <BookOutlined />
          {t("INTERNSHIP_JOURNAL")}
        </span>
      ),
      key: "2",
      children: (
        <InternshipJournal internshipId={studentProfileData.internship} />
      ),
    },
    {
      label: (
        <span>
          <FileOutlined />
          {t("DOCUMENTS")}
        </span>
      ),
      key: "3",
      children: (
        <InternshipDocuments internshipId={studentProfileData.internship} />
      ),
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{t("YOUR_INTERNSHIP")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("YOUR_INTERNSHIP_MSG")}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default Internship;
