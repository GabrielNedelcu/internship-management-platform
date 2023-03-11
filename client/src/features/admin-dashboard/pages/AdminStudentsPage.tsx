import { Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { Tabs } from "common";

import { AdminAddStudents, AdminBrowseStudents } from "../components";
import { ITabProps } from "common/types";

const AdminStudentsPage = () => {
  const tabs: ITabProps[] = [
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

      <Tabs tabList={tabs} />
    </>
  );
};

export default AdminStudentsPage;
