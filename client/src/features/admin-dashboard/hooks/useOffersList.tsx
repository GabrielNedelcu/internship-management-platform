import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ColumnsType } from "antd/es/table/interface";
import { TableProps, notification, Space, Tooltip, Button } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";
import { parseTableFiltersObject, parseTableSortObject } from "common/utils";
import {
  IInternshipData,
  IOfferData,
  IServerResponseMultipleFetch,
} from "common/types";

import { getOffers } from "../api";

const useOffersList = (companyId?: string) => {
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

  const { data: offersList, refetch: refetchOffersList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getOffers"],
      () => {
        setIsLoading(true);
        return getOffers(
          fetchOptions.searchValue,
          {
            fields:
              "companyID,title,companyName,description,departament,availablePos,remainingAvailablePos,applications",
            pagination: fetchOptions.paginationParams,
            sort: fetchOptions.sortOrder,
            filters: fetchOptions.filters,
          },
          companyId
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
            description: t("CANNOT_RETRIEVE_OFFERS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchOffersList();
  }, [fetchOptions]);

  const handleTablePropsChange: TableProps<IOfferData>["onChange"] = (
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

  const columns: ColumnsType<IInternshipData> = [
    {
      title: t("JOB_TITLE"),
      dataIndex: "title",
      key: "stitle",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("COMPANY"),
      key: "companyName",
      ellipsis: true,
      sorter: true,
      render: (record: IOfferData) => {
        return <a href={`company/${record.companyID}`}>{record.companyName}</a>;
      },
    },
    {
      title: t("DEPARTAMENT"),
      dataIndex: "departament",
      key: "departament",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("OFFERED_POSITIONS"),
      dataIndex: "availablePos",
      key: "cavailablePos",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("AVAILABLE_POSITIONS"),
      dataIndex: "remainingAvailablePos",
      key: "remainingAvailablePos",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("APPLICATIONS"),
      dataIndex: "applications",
      key: "applications",
      ellipsis: true,
      sorter: true,
    },
    {
      key: "actions",
      title: t("ACTIONS"),
      render: (record: IOfferData) => {
        return (
          <>
            <Space size="small">
              <Tooltip title={t("EDIT")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    return navigate(`/dashboard/admin/offer/${record._id}`);
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
    offersList,
  };
};

export default useOffersList;
