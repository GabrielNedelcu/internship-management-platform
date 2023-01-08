import { useState } from "react";
import { TableProps, Popconfirm } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type TStudentRowData = {
  key: string;
  name: string;
  group: string;
  major: string;
  email: string;
  id: string;
};

const useStudentsTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<TStudentRowData>>(
    {}
  );

  const handleChange: TableProps<TStudentRowData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<TStudentRowData>);
  };

  const columns: ColumnsType<TStudentRowData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      sorter: (a, b) => a.group.localeCompare(b.group),
      sortOrder: sortedInfo.columnKey === "group" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Major",
      dataIndex: "major",
      key: "major",
      filters: [
        { text: "ELA", value: "ELA" },
        { text: "RST", value: "RST" },
        { text: "TST", value: "TST" },
        { text: "MON", value: "MON" },
        { text: "CTI", value: "CTI" },
      ],
      filteredValue: filteredInfo.major || null,
      onFilter: (value, record) => record.major === value,
      sorter: (a, b) => a.major.localeCompare(b.major),
      sortOrder: sortedInfo.columnKey === "major" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "CNP/Passport",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => {}} />
            <Popconfirm
              title="Delete this student? This may imply further issues"
              onConfirm={() => handleDelete(record.key)}
            >
              <DeleteOutlined style={{ color: "red", marginLeft: 12 }} />
            </Popconfirm>
          </>
        );
      },
      ellipsis: true,
    },
  ];

  const handleDelete = (key: string) => {
    console.log(`Se sterge ${key}`);
  };

  return {
    columns,
    handleChange,
  };
};

export default useStudentsTable;
