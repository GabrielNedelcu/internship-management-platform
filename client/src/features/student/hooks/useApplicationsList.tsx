import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TableProps, notification, Space, Tooltip, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";

import { getSelfApplications, updateApplicationStatus } from "../api";
import {
  IApplicationData,
  IApplicationStatusUpdateData,
  IServerResponseMultipleFetch,
} from "common/types";
import { APPLICATION_STATUS, initialFetchOptions } from "common/constants";
import {
  getApplicationStatusOptionsForCompany,
  getApplicationStatusTag,
  parseTableFiltersObject,
  parseTableSortObject,
} from "common/utils";

const useApplicationsList = () => {
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
        return getSelfApplications(fetchOptions.searchValue, {
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
            description: t("CANNOT_RETRIEVE_APPLICATIONS"),
            duration: 10,
          });
        },
      }
    );

  useEffect(() => {
    refetchApplicationsList();
  }, [fetchOptions]);

  const { mutate: mutateUpdateApplicationStatus } = useMutation(
    ["updateApplicationStatus"],
    (updateData: IApplicationStatusUpdateData) => {
      setIsLoading(true);
      return updateApplicationStatus(
        updateData.applicationId,
        updateData.newStatus
      );
    },
    {
      onSuccess: () => {
        refetchApplicationsList();
        setIsLoading(false);
        notification.success({
          message: t("GREAT"),
          description: t("APPLICATION_STATUS_UPDATED"),
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("APPLICATION_STATUS_UPDAT_ERR"),
          duration: 10,
        });
      },
    }
  );

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
      title: t("JOB_TITLE"),
      dataIndex: "offerTitle",
      key: "offerTitle",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("COMPANY_NAME"),
      dataIndex: "companyName",
      key: "companyName",
      ellipsis: true,
      sorter: true,
    },
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
        if (!record.studentData?.at(0)?.internship)
          if (record.offerData?.at(0)?.remainingAvailablePos !== 0)
            return (
              <>
                <Space size="small">
                  {record.status === APPLICATION_STATUS.COMPANY_ACCEPTED && (
                    <Tooltip title={t("ACCEPT")}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<CheckOutlined />}
                        style={{ backgroundColor: "#52c41a" }}
                        onClick={() => {
                          mutateUpdateApplicationStatus({
                            applicationId: record._id || "",
                            newStatus: APPLICATION_STATUS.STUDENT_ACCEPTED,
                          });
                        }}
                      />
                    </Tooltip>
                  )}

                  {record.status === APPLICATION_STATUS.COMPANY_ACCEPTED && (
                    <Tooltip title={t("REJECT")}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          mutateUpdateApplicationStatus({
                            applicationId: record._id || "",
                            newStatus: APPLICATION_STATUS.STUDENT_DECLINED,
                          });
                        }}
                        danger
                      />
                    </Tooltip>
                  )}
                </Space>
              </>
            );
          else
            return (
              <>
                <Tag color="#108ee9">{t("NO_POS_AVAILABLE")}</Tag>
              </>
            );
        else return "";
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
    applicationsList,
  };
};

export default useApplicationsList;
