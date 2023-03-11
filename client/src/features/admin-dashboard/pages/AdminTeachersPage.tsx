import { Typography } from "antd";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

import { Tabs } from "common";

import { AdminAddTeachers, AdminBrowseTeachers } from "../components";
import { ITabProps } from "common/types";

const AdminTeachersPage = () => {
  const tabs: ITabProps[] = [
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

      <Tabs tabList={tabs} />
    </>
  );
};

export default AdminTeachersPage;
