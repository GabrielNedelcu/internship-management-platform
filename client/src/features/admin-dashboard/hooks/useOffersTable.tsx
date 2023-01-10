import { useState } from "react";
import { TableProps, Popconfirm } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type TOfferRowData = {
  key: string;
  jobTitle: string;
  company: string;
  departament: string;
  offeredPositions: number;
  availablePositions: number;
};

const useOffersTable = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<TOfferRowData>>({});

  const handleChange: TableProps<TOfferRowData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<TOfferRowData>);
  };

  const columns: ColumnsType<TOfferRowData> = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle),
      sortOrder: sortedInfo.columnKey === "jobTitle" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
      sortOrder: sortedInfo.columnKey === "company" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Departament",
      dataIndex: "departament",
      key: "departament",
      sorter: (a, b) => a.departament.localeCompare(b.departament),
      sortOrder:
        sortedInfo.columnKey === "departament" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Number Of Offered Positions",
      dataIndex: "offeredPositions",
      key: "offeredPositions",
      sorter: (a, b) => a.offeredPositions - b.offeredPositions,
      sortOrder:
        sortedInfo.columnKey === "offeredPositions" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Number Of Available Positions",
      dataIndex: "availablePositions",
      key: "availablePositions",
      sorter: (a, b) => a.availablePositions - b.availablePositions,
      sortOrder:
        sortedInfo.columnKey === "availablePositions" ? sortedInfo.order : null,
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
              title="Delete this offer? This may imply further issues"
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

export default useOffersTable;
