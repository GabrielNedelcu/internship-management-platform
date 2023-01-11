import { useState } from "react";
import { TableProps, Popconfirm } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

type TCompaniesRowData = {
  key: string;
  name: string;
  email: string;
  fieldOfWork: string;
  offers: number;
  positions: number;
  onboardingDate: string;
};

const useCompaniesTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<TCompaniesRowData>>(
    {}
  );

  const handleChange: TableProps<TCompaniesRowData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<TCompaniesRowData>);
  };

  const columns: ColumnsType<TCompaniesRowData> = [
    {
      title: "Company Name",
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
      title: "Field of Work",
      dataIndex: "fieldOfWork",
      key: "fieldOfWork",
      filters: [
        { text: "Telecom", value: "Telecom" },
        { text: "Software Developement", value: "Software Developement" },
        { text: "Electronics", value: "Electronics" },
        { text: "Other", value: "Other" },
      ],
      filteredValue: filteredInfo.fieldOfWork || null,
      onFilter: (value, record) => record.fieldOfWork === value,
      sorter: (a, b) => a.fieldOfWork.localeCompare(b.fieldOfWork),
      sortOrder:
        sortedInfo.columnKey === "fieldOfWork" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Number Of Offers",
      dataIndex: "offers",
      key: "offers",
      sorter: (a, b) => a.offers - b.offers,
      sortOrder: sortedInfo.columnKey === "offers" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Number Of Positions",
      dataIndex: "positions",
      key: "positions",
      sorter: (a, b) => a.positions - b.positions,
      sortOrder: sortedInfo.columnKey === "positions" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      sorter: (a, b) =>
        new Date(a.onboardingDate).setHours(0, 0, 0, 0) -
        new Date(b.onboardingDate).setHours(0, 0, 0, 0),
      sortOrder:
        sortedInfo.columnKey === "onboardingDate" ? sortedInfo.order : null,
      ellipsis: true,
      render: (record) => {
        console.log(record);
        return (
          <div>
            <p>{moment(record).format("DD-MM-YYYY")}</p>
          </div>
        );
      },
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined onClick={() => {}} />
            <Popconfirm
              title="Delete this company? This may imply further issues"
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

export default useCompaniesTable;
