import dayjs from "dayjs";
import download from "downloadjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TableProps,
  notification,
  Space,
  Tooltip,
  Button,
  Tag,
  Popover,
} from "antd";
import type { ColumnsType } from "antd/es/table/interface";

import {
  DeleteOutlined,
  DownloadOutlined,
  QuestionOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import {
  getApplicationsCV,
  getSelfApplications,
  getStudentCV,
  updateApplicationStatus,
} from "../api";
import {
  IApplicationData,
  IApplicationStatusUpdateData,
  IServerResponseMultipleFetch,
} from "common/types";
import { APPLICATION_STATUS, initialFetchOptions } from "common/constants";
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
      title: t("STUDENT_NAME"),
      dataIndex: "studentName",
      key: "studentName",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("EMAIL"),
      dataIndex: "studentEmail",
      key: "studentEmail",
      ellipsis: true,
      sorter: true,
    },
    {
      title: t("MAJOR"),
      dataIndex: "studentMajor",
      key: "studentMajor",
      ellipsis: true,
      sorter: true,
      width: "160px",
      filters: getMajors(),
    },
    {
      title: t("AVG"),
      key: "studentData.fullAvg",
      ellipsis: true,
      sorter: true,
      width: "100px",
      render: (record: IApplicationData) => {
        return (
          <>
            <Popover
              content={
                <>
                  <>{`${t(
                    "FIRST_YEAR_AVG"
                  )}: ${record.studentData?.firstYearAvg?.toString()}`}</>
                  <br />
                  <>{`${t(
                    "SECOND_YEAR_AVG"
                  )}: ${record.studentData?.secondYearAvg?.toString()}`}</>
                  <br />
                  <>{`${t(
                    "THIRD_YEAR_AVG"
                  )}: ${record.studentData?.thirdYearAvg?.toString()}`}</>
                </>
              }
              title={t("STUDENT_AVG")}
            >
              {record.studentData?.fullAvg?.toString().slice(0, 4)}
            </Popover>
          </>
        );
      },
    },
    ...(!offerId
      ? [
          {
            title: t("JOB_TITLE"),
            key: "offerTitle",
            ellipsis: true,
            sorter: true,
            render: (record: IApplicationData) => {
              return (
                <>
                  <a href={`offer/${record.offer}`}>{record.offerTitle}</a>
                </>
              );
            },
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
        if (!record.studentData?.internship)
          if (record.offerData?.remainingAvailablePos !== 0)
            return (
              <>
                <Space size="small">
                  {record.status === APPLICATION_STATUS.IN_REVIEW && (
                    <Tooltip title={t("ACCEPT_FOR_INTERVIEW")}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<QuestionOutlined />}
                        onClick={() => {
                          mutateUpdateApplicationStatus({
                            applicationId: record._id || "",
                            newStatus: APPLICATION_STATUS.ACCEPTED_INTERVIEW,
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  {(record.status === APPLICATION_STATUS.IN_REVIEW ||
                    record.status ===
                      APPLICATION_STATUS.ACCEPTED_INTERVIEW) && (
                    <Tooltip title={t("ACCEPT")}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<CheckOutlined />}
                        style={{ backgroundColor: "#52c41a" }}
                        onClick={() => {
                          mutateUpdateApplicationStatus({
                            applicationId: record._id || "",
                            newStatus: APPLICATION_STATUS.COMPANY_ACCEPTED,
                          });
                        }}
                      />
                    </Tooltip>
                  )}

                  {(record.status === APPLICATION_STATUS.IN_REVIEW ||
                    record.status ===
                      APPLICATION_STATUS.ACCEPTED_INTERVIEW) && (
                    <Tooltip title={t("REJECT")}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          mutateUpdateApplicationStatus({
                            applicationId: record._id || "",
                            newStatus: APPLICATION_STATUS.COMPANY_REJECTED,
                          });
                        }}
                        danger
                      />
                    </Tooltip>
                  )}

                  <Tooltip title={t("DOWNLOAD_CV")}>
                    <Button
                      shape="circle"
                      icon={<DownloadOutlined />}
                      onClick={async () => {
                        const fileData = await getStudentCV(
                          record.student || ""
                        );
                        download(fileData, `${record.studentName}_CV.pdf`);
                      }}
                    />
                  </Tooltip>
                </Space>
              </>
            );
          else
            return (
              <>
                <Tag color="#108ee9">{t("NO_POS_AVAILABLE")}</Tag>
              </>
            );
        else
          return (
            <>
              <Tag color="#f50">{t("HAS_INTERNSHIP")}</Tag>
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
