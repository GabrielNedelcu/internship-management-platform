import { useState } from "react";
import {
  TableProps,
  Popconfirm,
  notification,
  Space,
  Tooltip,
  Button,
} from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllProfessors } from "../api/professorsAPI";
interface ITeacherData {
  _id: string;
  name: string;
  email: string;
  title: string;
  departament: string;
  privatePhone: string;
  publicPhone: string;
  numPositions: number;
  numAvailablePositions: number;
}

const useTeachersTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [tableData, setTableData] = useState<ITeacherData[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ITeacherData>>({});

  const { data, status } = useQuery(
    ["getAllProfessors"],
    () => {
      setLoading(true);
      return getAllProfessors();
    },
    {
      onSuccess: (data: ITeacherData[]) => {
        setLoading(false);
        setTableData(data);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve the professors from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  const handleChange: TableProps<ITeacherData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<ITeacherData>);
  };

  const columns: ColumnsType<ITeacherData> = [
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
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
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
      filteredValue: filteredInfo.departament || null,
      onFilter: (value, record) => record.departament === value,
      sorter: (a, b) => a.departament.localeCompare(b.departament),
      sortOrder:
        sortedInfo.columnKey === "departament" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Private Phone Number",
      dataIndex: "privatePhone",
      key: "privatePhone",
      sorter: (a, b) => a.privatePhone.localeCompare(b.privatePhone),
      sortOrder:
        sortedInfo.columnKey === "privatePhone" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Public Phone Number",
      dataIndex: "publicPhone",
      key: "publicPhone",
      sorter: (a, b) => a.publicPhone.localeCompare(b.publicPhone),
      sortOrder:
        sortedInfo.columnKey === "publicPhone" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Positions No.",
      dataIndex: "numPositions",
      key: "numPositions",
      sorter: (a, b) => a.numPositions - b.numPositions,
      sortOrder:
        sortedInfo.columnKey === "numPositions" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Available Positions No.",
      dataIndex: "numAvailablePositions",
      key: "numAvailablePositions",
      sorter: (a, b) => a.numAvailablePositions - b.numAvailablePositions,
      sortOrder:
        sortedInfo.columnKey === "numAvailablePositions"
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
            <Space size="small">
              <Tooltip title="Edit Teacher">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => handleEditTeacher(record._id)}
                />
              </Tooltip>
              <Tooltip title="Delete Teacher">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(record._id)}
                />
              </Tooltip>
            </Space>
          </>
        );
      },
      ellipsis: true,
    },
  ];

  const handleEditTeacher = (key: string) => {
    return navigate(`/dashboard/admin/teacher/${key}`);
  };

  const handleDelete = (key: string) => {
    console.log(`Se sterge ${key}`);
  };

  const handleSearchBy = (value: string) => {
    setTableData(
      tableData?.filter((student: ITeacherData) => {
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

export default useTeachersTable;
