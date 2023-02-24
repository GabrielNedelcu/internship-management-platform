import { useState } from "react";
import { notification, TableProps, Space, Tooltip, Button } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useQuery } from "@tanstack/react-query";
import { getAllOffers, getCompanyOffers } from "../api/offersAPI";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type IOfferData = {
  _id: string;
  title: string;
  companyName: string;
  departament: string;
  availablePos: number;
  remainingAvailablePos: number;
  applications: number;
};

const useOffersTable = (companyId?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IOfferData[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IOfferData>>({});

  const handleChange: TableProps<IOfferData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<IOfferData>);
  };

  const { data } = useQuery(
    ["getAllOffers", companyId],
    () => {
      setLoading(true);
      console.log(companyId);
      if (companyId) return getCompanyOffers(companyId);
      return getAllOffers();
    },
    {
      onSuccess: (data: IOfferData[]) => {
        setLoading(false);
        setTableData(data);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve the offers from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  const columns: ColumnsType<IOfferData> = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      sortOrder:
        sortedInfo.columnKey === "companyName" ? sortedInfo.order : null,
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
      title: "Offered Positions",
      dataIndex: "availablePos",
      key: "availablePos",
      sorter: (a, b) => a.availablePos - b.availablePos,
      sortOrder:
        sortedInfo.columnKey === "availablePos" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Available Positions",
      dataIndex: "remainingAvailablePos",
      key: "remainingAvailablePos",
      sorter: (a, b) => a.remainingAvailablePos - b.remainingAvailablePos,
      sortOrder:
        sortedInfo.columnKey === "remainingAvailablePos"
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: "Applications",
      dataIndex: "applications",
      key: "applications",
      sorter: (a, b) => a.applications - b.applications,
      sortOrder:
        sortedInfo.columnKey === "applications" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Space size="small">
              <Tooltip title="Edit Offer">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => handleEditOffer(record._id)}
                />
              </Tooltip>
              <Tooltip title="Delete Offer">
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

  const handleEditOffer = (key: string) => {
    console.log(`Se editeaza ${key}`);
  };

  const handleDelete = (key: string) => {
    console.log(`Se sterge ${key}`);
  };

  const handleSearchBy = (value: string) => {
    setTableData(
      tableData?.filter((offer: IOfferData) => {
        return (
          offer.title.toLowerCase().includes(value.toLowerCase()) ||
          offer.companyName.toLowerCase().includes(value.toLowerCase())
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

export default useOffersTable;
