import { useState } from "react";
import { TableProps, Popconfirm, notification } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllStudents } from "../api/studentAPI";
import { useTranslation } from "react-i18next";

interface IStudentData {
  key: string;
  name: string;
  group: string;
  major: string;
  email: string;
  cnp: string;
}

const useStudentsTable = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const [tableData, setTableData] = useState<IStudentData[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IStudentData>>({});

  const { data } = useQuery(
    ["getAllStudents"],
    () => {
      setLoading(true);
      return getAllStudents();
    },
    {
      onSuccess: (data: IStudentData[]) => {
        setLoading(false);
        setTableData(data);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_STUDENTS"),
          duration: 10,
        });
      },
    }
  );

  const handleChange: TableProps<IStudentData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<IStudentData>);
  };

  const columns: ColumnsType<IStudentData> = [
    {
      title: t("NAME"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("EMAIL"),
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("GROUP"),
      dataIndex: "group",
      key: "group",
      sorter: (a, b) => a.group.localeCompare(b.group),
      sortOrder: sortedInfo.columnKey === "group" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("MAJOR"),
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
      title: "CNP",
      dataIndex: "cnp",
      key: "cnp",
      sorter: (a, b) => a.cnp.localeCompare(b.cnp),
      sortOrder: sortedInfo.columnKey === "cnp" ? sortedInfo.order : null,
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

  const handleSearchBy = (value: string) => {
    setTableData(
      tableData?.filter((student: IStudentData) => {
        return (
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.email.toLowerCase().includes(value.toLowerCase())
        );
      })
    );
  };

  const handleClearSearch = () => {
    setTableData(data);
    setSearchText("");
  };

  return {
    loading,
    columns,
    tableData,
    searchText,
    handleChange,
    setSearchText,
    handleSearchBy,
    handleClearSearch,
  };
};

export default useStudentsTable;
