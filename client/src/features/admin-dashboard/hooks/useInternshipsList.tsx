import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import type { ColumnsType } from "antd/es/table/interface";
import { TableProps, notification, Space, Tooltip, Button, Tag } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { initialFetchOptions } from "common/constants";
import { parseTableFiltersObject, parseTableSortObject } from "common/utils";
import {
  ICompanyData,
  IInternshipData,
  IOfferData,
  IProfessorData,
  IServerResponseMultipleFetch,
  IStudentData,
} from "common/types";
import { getInternships, getProfessors } from "../api";
import { AssignProfessorModal } from "../components";

const useInternshipsList = () => {
  const { t } = useTranslation();

  const [openAssignProfModal, setOpenAssignProfModal] = useState(false);
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
        return getInternships(fetchOptions.searchValue, {
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
            description: t("CANNOT_RETRIEVE_INTERNSHIPS"),
            duration: 10,
          });
        },
      }
    );

  const { data: professorsList, refetch: refetchProfessorsList } =
    useQuery<IServerResponseMultipleFetch>(
      ["getProfessors"],
      () => {
        setIsLoading(true);
        return getProfessors(
          "",
          {
            fields: "name,numAvailablePositions",
            pagination: { page: 1, pageSize: -1 },
          },
          undefined,
          true
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
            description: t("CANNOT_RETRIEVE_PROFESSORS"),
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

  const onAfterProfessorAssign = () => {
    refetchInternshipsList();
    refetchProfessorsList();
    setOpenAssignProfModal(false);
  };

  const columns: ColumnsType<IInternshipData> = [
    {
      title: t("STUDENT_NAME"),
      dataIndex: "studentData",
      key: "studentData.name",
      ellipsis: true,
      sorter: true,
      render: (record: IStudentData) => {
        return <a href={`student/${record._id}`}>{record.name}</a>;
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
    {
      title: t("COMPANY"),
      dataIndex: "companyData",
      key: "companyData.name",
      ellipsis: true,
      sorter: true,
      render: (record: ICompanyData) => {
        return <a href={`company/${record._id}`}>{record.name}</a>;
      },
    },
    {
      title: t("OFFER"),
      dataIndex: "offerData",
      key: "offerData.title",
      ellipsis: true,
      sorter: true,
      render: (record: IOfferData) => {
        return <a href={`offer/${record._id}`}>{record.title}</a>;
      },
    },
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
              <a href={`teacher/${record[0]._id}`}>{record[0].name}</a>
            ) : (
              <Tag color={"red"}>{t("NOT_ASSIGNED")}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: t("DOCUMENTS"),
      key: "documents",
      ellipsis: true,
      render: (record: IInternshipData) => {
        if (
          record.documents?.annex7?.validated === false ||
          record.documents?.tripartit?.validated === false ||
          record.documents?.annex2?.validated === false ||
          record.documents?.annex3?.validated === false
        )
          return <Tag color={"red"}>{t("PENDING_VALIDATION")}</Tag>;
        else return <Tag color={"green"}>{t("VALIDATED")}</Tag>;
      },
    },
    {
      key: "5",
      title: t("ACTIONS"),
      render: (record: IInternshipData) => {
        return (
          <>
            <Space size="small">
              <AssignProfessorModal
                professors={professorsList?.data}
                internshipId={record?._id || ""}
                openModal={openAssignProfModal}
                closeModalCb={() => setOpenAssignProfModal(false)}
                afterAssignCb={onAfterProfessorAssign}
              />
              <Tooltip title={t("ASSIGN_CHANGE_PROFESSOR")}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => setOpenAssignProfModal(true)}
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
    professorsList,
    openAssignProfModal,
    setOpenAssignProfModal,
  };
};

export default useInternshipsList;
