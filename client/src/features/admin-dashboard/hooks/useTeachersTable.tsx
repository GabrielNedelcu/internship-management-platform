import { useState } from "react";
import { TableProps, Popconfirm } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type TTeacherRowData = {
  key: string;
  name: string;
  email: string;
  jobTitle: string;
  departament: string;
  phone: string;
  studentsNo: number;
  availableStudentsNo: number;
};

const useTeachersTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<TTeacherRowData>>(
    {}
  );

  const handleChange: TableProps<TTeacherRowData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<TTeacherRowData>);
  };

  const columns: ColumnsType<TTeacherRowData> = [
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
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
      sortOrder: sortedInfo.columnKey === "jobTitle" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Departament",
      dataIndex: "departament",
      key: "departament",
      filters: [
        { text: "ELA", value: "ELA" },
        { text: "RST", value: "RST" },
        { text: "TST", value: "TST" },
        { text: "MON", value: "MON" },
        { text: "CTI", value: "CTI" },
      ],
      filteredValue: filteredInfo.major || null,
      onFilter: (value, record) => record.departament === value,
      sorter: (a, b) => a.departament.localeCompare(b.departament),
      sortOrder:
        sortedInfo.columnKey === "departament" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Private Phone Number",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortOrder: sortedInfo.columnKey === "phone" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Total No. Student Spots",
      dataIndex: "studentsNo",
      key: "studentsNo",
      sorter: (a, b) => a.studentsNo - b.studentsNo,
      sortOrder:
        sortedInfo.columnKey === "studentsNo" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Available Student Spots",
      dataIndex: "availableStudentsNo",
      key: "availableStudentsNo",
      sorter: (a, b) => a.availableStudentsNo - b.availableStudentsNo,
      sortOrder:
        sortedInfo.columnKey === "availableStudentsNo"
          ? sortedInfo.order
          : null,
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
              title="Delete this teacher? This may imply further issues"
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

export default useTeachersTable;
