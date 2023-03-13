import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  Spin,
  InputNumber,
  Modal,
  Divider,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import useTeacherCreation from "features/admin-dashboard/hooks/useTeacherCreation";
import { useTranslation } from "react-i18next";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AdminAddTeachers = () => {
  const { t } = useTranslation();

  const {
    setName,
    loading,
    setEmail,
    setTitle,
    openModal,
    setOpenModal,
    setPublicPhone,
    setDepartament,
    setPrivatePhone,
    setNumPositions,
    createdAccounts,
    detectedAccounts,
    emailCheckResult,
    notCreatedAccounts,
    mutateCreateProfessor,
    mutateCheckUniqueEmail,
    mutateUploadProfessors,
  } = useTeacherCreation();

  const [form] = Form.useForm();

  const validateEmail = (rule: any, value: any, callback: any) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success") callback(t("EMAIL_ALREADY_IN_USE"));
    else callback();
  };

  const newProps: UploadProps = {
    ...props,
    customRequest: (options) => mutateUploadProfessors(options),
  };

  return (
    <>
      <Spin
        spinning={loading}
        size="large"
        tip={t("CREATING_STUDENT_ACCOUNTS")}
      >
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={[]}
          width={1000}
        >
          <Typography.Title level={2}>
            {t("STUDENT_CREATION_RESULTS")}
          </Typography.Title>
          <Divider />
          <Row gutter={[16, 16]} style={{ display: "flex" }} justify="center">
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {detectedAccounts} {t("ACCOUNTS_DETECTED")}
              </Typography.Title>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {createdAccounts} {t("ACCOUNTS_CREATED")}
              </Typography.Title>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {detectedAccounts - createdAccounts} {t("ACCOUNTS_ABORTED")}
              </Typography.Title>
            </Col>
          </Row>
          <br />
          <Typography.Title level={5} type={"secondary"}>
            {t("ACCOUNTS_NOT_CREATED_MSG")}
          </Typography.Title>
          <Typography.Title level={5} type={"secondary"}>
            {notCreatedAccounts}
          </Typography.Title>
        </Modal>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Title level={5}>
              {t("CREATE_TEACHER_ACCOUNT")}
            </Typography.Title>
            <Form
              layout="vertical"
              size="large"
              form={form}
              onFinish={() => {
                mutateCreateProfessor();
                form.resetFields();
              }}
            >
              <Form.Item
                name="name"
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
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: t("TYPE_VALID_EMAIL").toString(),
                  },
                  {
                    required: true,
                    message: t("TYPE_TEACHER_EMAIL").toString(),
                  },
                  { validator: validateEmail },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_TEACHER_EMAIL").toString()}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="title"
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
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="privatePhone"
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
                  onChange={(e) => {
                    setPrivatePhone(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="publicPhone"
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
                  onChange={(e) => {
                    setPublicPhone(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="departament"
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
                  onChange={(value) => {
                    console.log(value);
                    setDepartament(value);
                  }}
                >
                  <Select.Option value="ELA">ELA</Select.Option>
                  <Select.Option value="RST">RST</Select.Option>
                  <Select.Option value="TST">TST</Select.Option>
                  <Select.Option value="MON">MON</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="numPositions">
                <InputNumber
                  size="large"
                  min={1}
                  max={100000}
                  defaultValue={1}
                  onChange={(value) => {
                    setNumPositions(value ? value : 1);
                  }}
                  addonBefore={t("STUDENT_NUMBER")}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t("CREATE_ACCOUNT")}
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>
              {t("IMPORT_TEACHERS")}
            </Typography.Title>
            <Dragger {...newProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{t("CLICK_DRAG")}</p>
              <p className="ant-upload-hint">{t("SELECT_XLSX")}</p>
            </Dragger>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default AdminAddTeachers;
