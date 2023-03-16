import dayjs from "dayjs";
import download from "downloadjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { TableProps, notification, Space, Tooltip, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import {
  DeleteOutlined,
  DownloadOutlined,
  QuestionOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import { getApplicationsCV, getSelfApplications, getStudentCV } from "../api";
import { IApplicationData, IServerResponseMultipleFetch } from "common/types";
import { initialFetchOptions } from "common/constants";
import {
  getApplicationStatusOptionsForCompany,
  getApplicationStatusTag,
  getMajors,
  parseTableFiltersObject,
  parseTableSortObject,
} from "common/utils";

const useApplicationsList = (offerId?: string) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [fetchOptions, setFetchOptions] = useState({
    ...initialFetchOptions,
    paginationParams: {
      ...initialFetchOptions.paginationParams,
      pageSize: 10,
    },
  });

  const { data: applicationsList, refetch: refetchApplicationsList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getSelfApplications"],
      () => {
        setIsLoading(true);
        return getSelfApplications(
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
            description: t("CANNOT_RETRIEVE_APPLICATIONS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchApplicationsList();
  }, [fetchOptions]);

  const handleTablePropsChange: TableProps<IApplicationData>["onChange"] = (
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

  const columns: ColumnsType<IApplicationData> = [
    {
      title: t("STUDENT_NAME"),
      dataIndex: "studentName",
      key: "studentName",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("STUDENT_EMAIL"),
      dataIndex: "studentEmail",
      key: "studentEmail",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("STUDENT_MAJOR"),
      dataIndex: "studentMajor",
      key: "studentMajor",
      ellipsis: true,
      sorter: true,
      filters: getMajors(),
    },
    ...(!offerId
      ? [
          {
            title: t("JOB_TITLE"),
            dataIndex: "offerTitle",
            key: "offerTitle",
            ellipsis: true,
            sorter: true,
          },
        ]
      : []),
    {
      title: t("APPLIED_ON"),
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
      sorter: true,
      render: (record) => {
        return <>{dayjs(record.createdAt).format("MMMM D YYYY").toString()}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      sorter: true,
      filters: getApplicationStatusOptionsForCompany(),
      render: (value) => {
        return (
          <>
            <Tag color={getApplicationStatusTag(value).color}>
              {getApplicationStatusTag(value).message}
            </Tag>
          </>
        );
      },
    },
    {
      key: "5",
      title: t("ACTIONS"),
      render: (record: IApplicationData) => {
        return (
          <>
            <Space size="small">
              <Tooltip title={t("ACCEPT_FOR_INTERVIEW")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<QuestionOutlined />}
                  onClick={() => {}}
                />
              </Tooltip>
              <Tooltip title={t("ACCEPT")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<CheckOutlined />}
                  style={{ backgroundColor: "#52c41a" }}
                  onClick={() => {}}
                />
              </Tooltip>
              <Tooltip title={t("REJECT")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => {}}
                  danger
                />
              </Tooltip>
              <Tooltip title={t("DOWNLOAD_CV")}>
                <Button
                  shape="circle"
                  icon={<DownloadOutlined />}
                  onClick={async () => {
                    const fileData = await getStudentCV(record.student || "");
                    download(fileData, `${record.studentName}_CV.pdf`);
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

  const handleDownloadCVs = async () => {
    const fileData = await getApplicationsCV(offerId);
    download(fileData, "cv_zip.zip");
  };

  return {
    isLoading,
    columns,
    fetchOptions,
    setFetchOptions,
    handleTablePropsChange,
    applicationsList,
    handleDownloadCVs,
  };
};

export default useApplicationsList;
