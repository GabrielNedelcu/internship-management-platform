import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ColumnsType } from "antd/es/table/interface";
import { TableProps, notification, Space, Tooltip, Button, Tag } from "antd";

import { EditOutlined } from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";
import { parseTableFiltersObject, parseTableSortObject } from "common/utils";
import {
  IInternshipData,
  IOfferData,
  IProfessorData,
  IServerResponseMultipleFetch,
  IStudentData,
} from "common/types";
import { getInternships } from "../api";

const useInternshipsList = (offerId?: string) => {
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

  const { data: internshipsList, refetch: refetchInternshipsList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getInternships"],
      () => {
        setIsLoading(true);
        return getInternships(
          fetchOptions.searchValue,
          {
            pagination: fetchOptions.paginationParams,
            sort: fetchOptions.sortOrder,
            filters: fetchOptions.filters,
          },
          offerId
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
            description: t("CANNOT_RETRIEVE_INTERNSHIPS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchInternshipsList();
  }, [fetchOptions]);

  const handleTablePropsChange: TableProps<IInternshipData>["onChange"] = (
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
      title: t("STUDENT_NAME"),
      dataIndex: "studentData",
      key: "studentData.name",
      ellipsis: true,
      sorter: true,
      render: (record: IStudentData) => {
        return <>{record.name}</>;
      },
    },
    {
      title: t("STUDENT_GROUP"),
      dataIndex: "studentData",
      key: "studentData.group",
      ellipsis: true,
      sorter: true,
      render: (record: IStudentData) => {
        return <>{record.group}</>;
      },
    },
    {
      title: t("STUDENT_MAJOR"),
      dataIndex: "studentData",
      key: "studentData.major",
      ellipsis: true,
      sorter: true,
      render: (record: IStudentData) => {
        return <>{record.major}</>;
      },
    },
    ...(!offerId
      ? [
          {
            title: t("OFFER"),
            dataIndex: "offerData",
            key: "offerData.title",
            ellipsis: true,
            sorter: true,
            render: (record: IOfferData) => {
              return (
                <>
                  <a href={`offer/${record._id}`}>{record.title}</a>
                </>
              );
            },
          },
        ]
      : []),
    {
      title: t("PROFESSOR_NAME"),
      dataIndex: "professorData",
      key: "professorData.name",
      ellipsis: true,
      sorter: true,
      render: (record: IProfessorData[]) => {
        return (
          <>
            {record[0]?.name ? (
              <>{record[0].name}</>
            ) : (
              <Tag color={"red"}>{t("NOT_ASSIGNED")}</Tag>
            )}
          </>
        );
      },
    },
    {
      key: "5",
      title: t("ACTIONS"),
      render: (record: IInternshipData) => {
        return (
          <>
            <Space size="small">
              <Tooltip title={t("ASSIGN_CHANGE_PROFESSOR")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => {
                    return navigate(`/company/internship/${record._id}`);
                  }}
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
    internshipsList,
  };
};

export default useInternshipsList;
