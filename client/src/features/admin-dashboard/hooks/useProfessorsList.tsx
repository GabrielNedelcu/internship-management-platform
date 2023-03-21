import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TableProps, notification, Space, Button, Tooltip, Tag } from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";

import { IProfessorData, IServerResponseMultipleFetch } from "common/types";

import {
  getMajors,
  parseTableFiltersObject,
  parseTableSortObject,
} from "common/utils";

import { getProfessors } from "../api";

const useProfessorsList = () => {
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

  const { data: professorsList, refetch: refetchProfessorsList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllCompanies"],
      () => {
        setIsLoading(true);
        return getProfessors(fetchOptions.searchValue, {
          pagination: fetchOptions.paginationParams,
          sort: fetchOptions.sortOrder,
          filters: fetchOptions.filters,
        });
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          notification.error({
            message: "Ooops ...",
            description: t("CANNOT_RETRIEVE_PROFESSORS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchProfessorsList();
  }, [fetchOptions]);

  const handleTablePropsChange: TableProps<IProfessorData>["onChange"] = (
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

  const columns: ColumnsType<IProfessorData> = [
    {
      title: t("NAME"),
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
      title: t("JOB_TITLE"),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("DEPARTAMENT"),
      dataIndex: "departament",
      key: "departament",
      ellipsis: true,
      sorter: true,
      filters: getMajors(),
    },
    {
      title: t("PRIVATE_PHONE"),
      dataIndex: "privatePhone",
      key: "privatePhone",
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return <>+40{record}</>;
      },
    },
    {
      title: t("PUBLIC_PHONE"),
      dataIndex: "publicPhone",
      key: "publicPhone",
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return <>+40{record}</>;
      },
    },
    {
      title: t("POSITIONS_NB"),
      dataIndex: "numPositions",
      key: "numPositions",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("AVAILABLE_POSITIONS"),
      dataIndex: "numAvailablePositions",
      key: "numAvailablePositions",
      ellipsis: true,
      sorter: true,
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return record === true ? (
          <Tag color={"green"}>{t("YES")}</Tag>
        ) : (
          <Tag color={"red"}>{t("NO")}</Tag>
        );
      },
    },
    {
      key: "actions",
      title: t("ACTIONS"),
      render: (record: IProfessorData) => {
        return (
          <>
            <Space size="small">
              <Tooltip title={t("EDIT")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    return navigate(`/dashboard/admin/teacher/${record._id}`);
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
    professorsList,
  };
};

export default useProfessorsList;
