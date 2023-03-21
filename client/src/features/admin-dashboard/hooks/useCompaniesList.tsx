import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TableProps, notification, Space, Button, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";
import { ICompanyData, IServerResponseMultipleFetch } from "common/types";
import {
  getFieldOfWork,
  getFieldsOfWork,
  parseTableFiltersObject,
  parseTableSortObject,
} from "common/utils";
import { getAllCompanies, patchCompany } from "../api";

interface IAcceptDecline {
  companyId: string;
  accepted: boolean;
}

const useCompaniesList = (fetchValidatedOnly: boolean) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [fetchOptions, setFetchOptions] = useState({
    ...initialFetchOptions,
    paginationParams: {
      ...initialFetchOptions.paginationParams,
      pageSize: 10,
    },
  });

  const { data: companiesList, refetch: refetchCompaniesList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllCompanies"],
      () => {
        setIsLoading(true);
        return getAllCompanies(
          fetchOptions.searchValue,
          {
            fields: "name,email,fieldOfWork,numOffers,numPositions,createdAt",
            pagination: fetchOptions.paginationParams,
            sort: fetchOptions.sortOrder,
            filters: fetchOptions.filters,
          },
          fetchValidatedOnly
        );
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("CANNOT_RETRIEVE_COMPANIES"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchCompaniesList();
  }, [fetchOptions]);

  const { mutate: mutateAcceptDeclineCompany } = useMutation(
    ["acceptDeclineCompany"],
    (acceptDeclineData: IAcceptDecline) => {
      setIsLoading(true);
      return patchCompany(acceptDeclineData.companyId, {
        validated: acceptDeclineData.accepted,
      });
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        refetchCompaniesList();

        notification.success({
          message: t("GREAT"),
          description: t("COMPANY_ACCEPTED"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Oops ...",
          description: t("CANNOT_ACCEPT_COMPANIES"),
          duration: 10,
        });
      },
    }
  );

  const handleTablePropsChange: TableProps<ICompanyData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const sortObject = Array.isArray(sorter) ? sorter[0] : sorter;

    setFetchOptions({
      ...fetchOptions,
      filters: parseTableFiltersObject(filters),
      sortOrder: parseTableSortObject(sortObject),
      paginationParams: {
        pageSize: pagination.pageSize || 10,
        page: pagination.current || 1,
      },
    });
  };

  const columns: ColumnsType<ICompanyData> = [
    {
      title: t("COMPANY_NAME"),
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("EMAIL"),
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("FIELD_OF_WORK"),
      dataIndex: "fieldOfWork",
      key: "fieldOfWork",
      filters: getFieldsOfWork(),
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return <>{getFieldOfWork(record)}</>;
      },
    },
    {
      title: t("OFFERS_NB"),
      dataIndex: "numOffers",
      key: "numOffers",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("POSITIONS_NB"),
      dataIndex: "numPositions",
      key: "numPositions",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("ONBOARDING_DATE"),
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return (
          <>
            {record && dayjs(record.createdAt).format("MMMM D YYYY").toString()}
          </>
        );
      },
    },
    {
      key: "5",
      title: t("ACTIONS"),
      render: (record: ICompanyData) => {
        if (!fetchValidatedOnly)
          return (
            <>
              <Space size="small">
                <Tooltip title={t("REVIEW")}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                      return navigate(`/dashboard/admin/company/${record._id}`);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t("QUICK_ACCEPT")}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CheckOutlined />}
                    style={{ backgroundColor: "#52c41a" }}
                    onClick={() =>
                      mutateAcceptDeclineCompany({
                        companyId: record._id || "",
                        accepted: true,
                      })
                    }
                  />
                </Tooltip>
                <Tooltip title={t("QUICK_DECLINE")}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    danger
                    onClick={() =>
                      mutateAcceptDeclineCompany({
                        companyId: record._id || "",
                        accepted: false,
                      })
                    }
                  />
                </Tooltip>
              </Space>
            </>
          );
        else
          return (
            <>
              <Space size="small">
                <Tooltip title={t("EDIT")}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                      return navigate(`/dashboard/admin/company/${record._id}`);
                    }}
                  />
                </Tooltip>
                <Tooltip title={t("DELETE")}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => {}}
                  />
                </Tooltip>
              </Space>
            </>
          );
      },
      ellipsis: true,
    },
  ];

  return {
    isLoading,
    columns,
    fetchOptions,
    setFetchOptions,
    handleTablePropsChange,
    companiesList,
  };
};

export default useCompaniesList;
