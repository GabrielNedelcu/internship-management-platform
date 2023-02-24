import { useState } from "react";
import moment from "moment";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCompanies, acceptCompany } from "../api/companiesAPI";
import { TableProps, Space, Button, Tooltip, notification } from "antd";
import { CloseOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type ICompanyData = {
  _id: string;
  name: string;
  email: string;
  fieldOfWork: string;
  numOffers: number;
  numPositions: number;
  onboardingDate: string;
};

const useCompanyTable = (companyValidated: boolean) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ICompanyData[]>();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<ICompanyData>>({});

  const { data, status } = useQuery(
    ["getAllCompanies", companyValidated],
    () => {
      setLoading(true);
      return getAllCompanies(companyValidated);
    },
    {
      onSuccess: (data: ICompanyData[]) => {
        setLoading(false);
        setTableData(data);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Cannot retrieve the companies from the server ... please try again!",
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateAcceptCompany } = useMutation(
    ["acceptCompany"],
    (companyId: string) => {
      setLoading(true);
      return acceptCompany(companyId);
    },
    {
      onSuccess: () => {
        // Invalidate query in order to fetch all the companies excepting the one that has been
        // accepted on the platform
        queryClient.invalidateQueries(["getAllCompanies"]);

        notification.success({
          message: "Great!",
          description: "The company has just been accepted on the platform!",
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Something went wrong ...",
          description:
            "An error occured while accepting the company on the platform! Please try again later ...",
          duration: 10,
        });
      },
    }
  );

  const handleChange: TableProps<ICompanyData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<ICompanyData>);
  };

  const columns: ColumnsType<ICompanyData> = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Account Email",
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
        { text: "Telecom", value: "telecom" },
        { text: "Software Developement", value: "softwareDev" },
        { text: "Electronics", value: "electronics" },
        { text: "Other", value: "other" },
      ],
      filteredValue: filteredInfo.fieldOfWork || null,
      onFilter: (value, record) => record.fieldOfWork === value,
      sorter: (a, b) => a.fieldOfWork.localeCompare(b.fieldOfWork),
      sortOrder:
        sortedInfo.columnKey === "fieldOfWork" ? sortedInfo.order : null,
      ellipsis: true,
      render: (record: String) => {
        let fow = "";
        switch (record) {
          case "telecom":
            fow = "Telecom";
            break;
          case "softwareDev":
            fow = "Software Developement";
            break;
          case "electronics":
            fow = "Electronics";
            break;
          case "other":
            fow = "Other";
            break;
          default:
            break;
        }
        return (
          <div>
            <p>{fow}</p>
          </div>
        );
      },
    },
    {
      title: "Number Of Offers",
      dataIndex: "numOffers",
      key: "numOffers",
      sorter: (a, b) => a.numOffers - b.numOffers,
      sortOrder: sortedInfo.columnKey === "numOffers" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Number Of Positions",
      dataIndex: "numPositions",
      key: "numPositions",
      sorter: (a, b) => a.numPositions - b.numPositions,
      sortOrder:
        sortedInfo.columnKey === "numPositions" ? sortedInfo.order : null,
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
        if (!companyValidated)
          return (
            <>
              <Space size="small">
                <Tooltip title="Review Company">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => handleReview(record._id)}
                  />
                </Tooltip>
                <Tooltip title="Quick Accept">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    style={{ backgroundColor: "#52c41a" }}
                    onClick={() => mutateAcceptCompany(record._id)}
                  />
                </Tooltip>
                <Tooltip title="Quick Decline">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    danger
                    onClick={() => handleDecline(record._id)}
                  />
                </Tooltip>
              </Space>
            </>
          );
        else
          return (
            <>
              <Space size="small">
                <Tooltip title="Edit Company">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => handleReview(record._id)}
                  />
                </Tooltip>
                <Tooltip title="Delete Company">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    danger
                    onClick={() => handleDeleteCompany(record._id)}
                  />
                </Tooltip>
              </Space>
            </>
          );
      },
      ellipsis: true,
    },
  ];

  const handleDecline = (key: string) => {
    console.log(`Se sterge ${key}`);
  };

  const handleReview = (key: string) => {
    return navigate(`/dashboard/admin/company/${key}`);
  };

  const handleDeleteCompany = (key: string) => {
    console.log(`Se sterge ${key}`);
  };

  const handleSearchBy = (value: string) => {
    setTableData(
      tableData?.filter((company: ICompanyData) => {
        return (
          company.name.toLowerCase().includes(value.toLowerCase()) ||
          company.email.toLowerCase().includes(value.toLowerCase())
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

export default useCompanyTable;
