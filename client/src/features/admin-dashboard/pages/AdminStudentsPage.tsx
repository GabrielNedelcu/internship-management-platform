import { Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { TabNavigation } from "common";
import type { TTab } from "common";

import { AdminAddStudents, AdminBrowseStudents } from "../components";

const AdminStudentsPage = () => {
  const tabs: TTab[] = [
    {
      label: (
        <span>
          <PlusCircleOutlined />
          Add Students
        </span>
      ),
      key: "1",
      children: <AdminAddStudents />,
    },
    {
      label: (
        <span>
          <SearchOutlined />
          Browse Students
        </span>
      ),
      key: "2",
      children: <AdminBrowseStudents />,
    },
  ];

  return (
    <>
      <Typography.Title level={1}>Students List</Typography.Title>
      <Typography.Title level={5} type={"secondary"}>
        Add, view, edit or delete students from the internship program ...
      </Typography.Title>

      <TabNavigation tabList={tabs} />
    </>
  );
};

export default AdminStudentsPage;
