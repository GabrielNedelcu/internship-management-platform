import { Typography, notification, Spin, Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ContainerOutlined, UserOutlined } from "@ant-design/icons";

import { Tabs } from "common";

import { TeacherInfo } from "../components";
import { getProfessor, patchProfessor } from "../api/professorsAPI";
import { ITabProps } from "common/types";
import { useTranslation } from "react-i18next";

const AdminTeacherProfile = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const params = useParams();
  const teacherId = params.teacherId;

  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useQuery(
    ["getTeacher", teacherId],
    () => {
      setLoading(true);
      return getProfessor(teacherId || "");
    },
    {
      onSuccess: (data) => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("CANNOT_RETRIEVE_TEACHER_DATA"),
          duration: 10,
        });
      },
    }
  );

  const { mutate: mutateUpdateTeacherData } = useMutation(
    ["updateTeacherData", teacherId],
    (data: any) => {
      setLoading(true);
      return patchProfessor(teacherId || "", data);
    },
    {
      onSuccess: () => {
        setLoading(false);

        queryClient.invalidateQueries(["getTeacher", teacherId]);

        notification.success({
          message: t("ACCOUNT_UPDATED"),
          description: t("UPDATE_ACCOUNT_SUCCESS_MSG"),
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("UPDATE_ACCOUNT_ERR_MSG"),
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={t("FETCHING_TEACHER_DATA")} />
      </>
    );

  const tabs: ITabProps[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          {t("PROFILE_INFO")}
        </span>
      ),
      key: "1",
      children: (
        <TeacherInfo
          teacherId={teacherId || ""}
          name={data.name}
          email={data.email}
          title={data.title}
          privatePhone={data.privatePhone}
          publicPhone={data.publicPhone}
          departament={data.departament}
          numPositions={data.numPositions}
        />
      ),
    },
    {
      label: (
        <span>
          <UserOutlined />
          {t("SUPERVISED_STUDENTS")}
        </span>
      ),
      key: "2",
      children: "",
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={t("FETCHING_TEACHER_DATA")}>
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Typography.Title level={1}>{data.name}</Typography.Title>
            <Typography.Title level={5} type={"secondary"}>
              {data.email}
            </Typography.Title>
          </Col>

          <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
            {!data.admin ? (
              <Button
                size="large"
                onClick={() => {
                  mutateUpdateTeacherData({ admin: true });
                }}
              >
                {t("MAKE_ADMIN")}
              </Button>
            ) : (
              <Button
                danger
                size="large"
                onClick={() => {
                  mutateUpdateTeacherData({ admin: false });
                }}
              >
                {t("REMOVE_ADMIN")}
              </Button>
            )}
          </Col>
        </Row>

        <Tabs tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminTeacherProfile;
