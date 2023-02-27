import { Typography, notification, Spin, Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ContainerOutlined, UserOutlined } from "@ant-design/icons";

import { TabNavigation } from "common";
import type { TTab } from "common";

import { TeacherInfo } from "../components";
import { getProfessor, patchProfessor } from "../api/professorsAPI";

const AdminTeacherProfile = () => {
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
          description:
            "Cannot retrieve the professor's data from the server ... please try again!",
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
          message: "Account updated",
          description:
            "Great! You have successfully updated the teacher's account! ...",
          duration: 10,
        });
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while updating the account! Please try again later!",
          duration: 10,
        });
      },
    }
  );

  if (!data)
    return (
      <>
        <Spin spinning={true} size="large" tip={"Fetching teacher data ..."} />
      </>
    );

  const tabs: TTab[] = [
    {
      label: (
        <span>
          <ContainerOutlined />
          Profile Information
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
          Supervised Students
        </span>
      ),
      key: "2",
      children: "",
    },
  ];

  return (
    <>
      <Spin spinning={loading} size="large" tip={"Fetching teacher's data ..."}>
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
                Make Admin
              </Button>
            ) : (
              <Button
                danger
                size="large"
                onClick={() => {
                  mutateUpdateTeacherData({ admin: false });
                }}
              >
                Remove Admin
              </Button>
            )}
          </Col>
        </Row>

        <TabNavigation tabList={tabs} />
      </Spin>
    </>
  );
};

export default AdminTeacherProfile;
