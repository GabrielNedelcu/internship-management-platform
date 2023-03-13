import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  UploadProps,
  Upload,
  Spin,
  Modal,
  Divider,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import useStudentCreation from "../../hooks/useStudentCreation";
import { useTranslation } from "react-i18next";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AdminAddStudents = () => {
  const { t } = useTranslation();

  const {
    cnp,
    setCNP,
    loading,
    setName,
    passport,
    setEmail,
    setGroup,
    openModal,
    setPassport,
    setOpenModal,
    createdAccounts,
    detectedAccounts,
    emailCheckResult,
    notCreatedAccounts,
    mutateCreateStudent,
    mutateUplaodStudents,
    mutateCheckUniqueEmail,
  } = useStudentCreation();

  const [form] = Form.useForm();

  const validateEmail = (rule: any, value: any, callback: any) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success") callback(t("EMAIL_ALREADY_IN_USE"));
    else callback();
  };

  const newProps: UploadProps = {
    ...props,
    customRequest: (options) => mutateUplaodStudents(options),
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
              {t("CREATE_STUDENT_ACCOUNT")}
            </Typography.Title>
            <Form
              form={form}
              layout="vertical"
              size="large"
              onFinish={() => {
                mutateCreateStudent();
                form.resetFields();
              }}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t("TYPE_STUDENT_FULL_NAME").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_STUDENT_FULL_NAME").toString()}
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
                    message: t("TYPE_STUDENT_EMAIL").toString(),
                  },
                  { validator: validateEmail },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_STUDENT_EMAIL").toString()}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="group"
                rules={[
                  {
                    required: true,
                    message: t("TYPE_STUDENT_GROUP").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_STUDENT_GROUP").toString()}
                  onChange={(e) => {
                    setGroup(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="cnp"
                rules={[
                  {
                    required: passport === "",
                    message: t("TYPE_STUDENT_CNP_OR_PASSPORT").toString(),
                  },
                  {
                    len: 13,
                    message: t("CNP_MUST_HAVE").toString(),
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_STUDENT_CNP").toString()}
                  disabled={passport !== ""}
                  onChange={(e) => {
                    setCNP(e.target.value);
                    form.resetFields(["passport"]);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="passport"
                //TODO: Add passport string format validation
                hasFeedback
              >
                <Input
                  placeholder={t("TYPE_STUDENT_PASSPORT").toString()}
                  disabled={cnp !== ""}
                  onChange={(e) => {
                    setPassport(e.target.value);
                    form.resetFields(["cnp"]);
                  }}
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
              {t("IMPORT_STUDENTS")}
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

export default AdminAddStudents;
