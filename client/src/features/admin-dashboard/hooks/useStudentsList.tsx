import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TableProps, notification, Space, Button, Tooltip, Tag } from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";

import { IServerResponseMultipleFetch, IStudentData } from "common/types";

import {
  getMajors,
  parseTableFiltersObject,
  parseTableSortObject,
} from "common/utils";

import { getStudents } from "../api";

const useStudentsList = () => {
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

  const { data: studentsList, refetch: refetchStudentsList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getAllStudents"],
      () => {
        setIsLoading(true);
        return getStudents(fetchOptions.searchValue, {
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
            description: t("CANNOT_RETRIEVE_STUDENTS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchStudentsList();
  }, [fetchOptions]);

  const handleTablePropsChange: TableProps<IStudentData>["onChange"] = (
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

  const columns: ColumnsType<IStudentData> = [
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
      title: t("GROUP"),
      dataIndex: "group",
      key: "group",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("MAJOR"),
      dataIndex: "major",
      key: "major",
      ellipsis: true,
      sorter: true,
      filters: getMajors(),
    },
    {
      title: t("CNP"),
      dataIndex: "cnp",
      key: "cnp",
      ellipsis: true,
      sorter: true,
    },
    {
      key: "actions",
      title: t("ACTIONS"),
      render: (record: IStudentData) => {
        return (
          <>
            <Space size="small">
              <Tooltip title={t("EDIT")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    return navigate(`/dashboard/admin/student/${record._id}`);
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
    studentsList,
  };
};

export default useStudentsList;
