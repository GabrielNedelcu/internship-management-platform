import { Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { TabNavigation } from "common";
import type { TTab } from "common";

import { AdminAddTeachers, AdminBrowseTeachers } from "../components";

const AdminTeachersPage = () => {
  const tabs: TTab[] = [
    {
      label: (
        <span>
          <PlusCircleOutlined />
          Add Teachers
        </span>
      ),
      key: "1",
      children: <AdminAddTeachers />,
    },
    {
      label: (
        <span>
          <SearchOutlined />
          Browse Teachers
        </span>
      ),
      key: "2",
      children: <AdminBrowseTeachers />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>Teachers List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Add, view, edit or delete teachers from the internship program ...
      </Typography.Title>

      <TabNavigation tabList={tabs} />
    </>
  );
};

export default AdminTeachersPage;
