import { Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { Tabs } from "common";

import { AdminAddStudents, AdminBrowseStudents } from "../components";
import { ITabProps } from "common/types";
import { useTranslation } from "react-i18next";

const AdminStudentsPage = () => {
  const { t } = useTranslation();

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <PlusCircleOutlined />
          {t("ADD_STUDENTS")}
        </span>
      ),
      key: "1",
      children: <AdminAddStudents />,
    },
    {
      label: (
        <span>
          <SearchOutlined />
          {t("BROWSE_STUDENTS")}
        </span>
      ),
      key: "2",
      children: <AdminBrowseStudents />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>{t("STUDENTS_LIST")}</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        {t("ADD_VIEW_EDIT_STUDENTS")}
      </Typography.Title>

      <Tabs tabList={tabs} />
    </>
  );
};

export default AdminStudentsPage;
