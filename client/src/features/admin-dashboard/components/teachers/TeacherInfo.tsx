import {
  Row,
  Col,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Spin,
  notification,
} from "antd";

import { useCheckUniqueEmail } from "common";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProfessor } from "features/admin-dashboard/api/professorsAPI";
import { useTranslation } from "react-i18next";

interface ITeacherData {
  teacherId: string;
  name: string;
  email: string;
  title: string;
  privatePhone: string;
  publicPhone: string;
  departament: string;
  numPositions: number;
}

const TeacherInfo = ({
  teacherId,
  name,
  email,
  title,
  privatePhone,
  publicPhone,
  departament,
  numPositions,
}: ITeacherData) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const [newEmail, setNewEmail] = useState<String>(email);
  const [loading, setLoading] = useState<boolean>(false);
  const { validateEmail } = useCheckUniqueEmail();

  const { mutate: mutateUpdateTeacherData } = useMutation(
    ["updateTeacherData", teacherId],
    (data: any) => {
      setLoading(true);
      return patchProfessor(teacherId, data);
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

  return (
    <>
      <Spin spinning={loading} tip={t("UPDATING_ACCOUNT")}>
        <Row gutter={[16, 16]}>
          <Col span={12} offset={6}>
            <Form
              layout="horizontal"
              size="large"
              labelCol={{ span: 4 }}
              onFinish={(values: any) => {
                mutateUpdateTeacherData(values);
              }}
            >
              <Form.Item
                name="name"
                label={t("NAME")}
                initialValue={name}
                rules={[
                  {
                    required: true,
                    message: t("TYPE_TEACHER_FULL_NAME").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_FULL_NAME").toString()}
                  defaultValue={name}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={t("EMAIL")}
                initialValue={email}
                rules={[
                  {
                    type: "email",
                    message: t("TYPE_VALID_EMAIL").toString(),
                  },
                  {
                    required: true,
                    message: t("TYPE_TEACHER_EMAIL").toString(),
                  },
                  ...(newEmail !== email ? [{ validator: validateEmail }] : []),
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_EMAIL").toString()}
                  defaultValue={email}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="title"
                label={t("JOB_TITLE").toString()}
                initialValue={title}
                rules={[
                  {
                    required: true,
                    message: t("TYPE_TEACHER_JOB_TITLE").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_JOB_TITLE").toString()}
                  defaultValue={title}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="privatePhone"
                label={t("PRIVATE_PHONE").toString()}
                initialValue={privatePhone}
                rules={[
                  {
                    required: true,
                    message: t("TYPE_TEACHER_PRIVATE_PHONE").toString(),
                  },
                  {
                    len: 9,
                    message: t("TYPE_VALID_PHONE_NUMBER").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_PRIVATE_PHONE").toString()}
                  addonBefore="+40"
                  defaultValue={privatePhone}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="publicPhone"
                label={t("PUBLIC_PHONE").toString()}
                initialValue={publicPhone}
                rules={[
                  {
                    required: true,
                    message: t("TYPE_TEACHER_PUBLICE_PHONE").toString(),
                  },
                  {
                    len: 9,
                    message: t("TYPE_VALID_PHONE_NUMBER").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_PUBLICE_PHONE").toString()}
                  addonBefore="+40"
                  defaultValue={publicPhone}
                  onChange={(e) => {}}
                />
              </Form.Item>

              <Form.Item
                name="departament"
                label={t("DEPARTAMENT").toString()}
                initialValue={departament}
                rules={[
                  {
                    required: true,
                    message: t("SELECT_TEACHER_DEPARTAMENT").toString(),
                  },
                ]}
                hasFeedback
              >
                <Select
                  placeholder={t("SELECT_TEACHER_DEPARTAMENT").toString()}
                  defaultValue={departament}
                  onChange={(value) => {
                    console.log(value);
                  }}
                >
                  <Select.Option value="ELA">ELA</Select.Option>
                  <Select.Option value="RST">RST</Select.Option>
                  <Select.Option value="TST">TST</Select.Option>
                  <Select.Option value="MON">MON</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="numPositions"
                label={t("STUDENT_NUMBER").toString()}
                initialValue={numPositions}
              >
                <InputNumber
                  size="large"
                  min={numPositions}
                  max={100000}
                  defaultValue={numPositions}
                  onChange={(value) => {}}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t("UPDATE_ACCOUNT")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default TeacherInfo;
