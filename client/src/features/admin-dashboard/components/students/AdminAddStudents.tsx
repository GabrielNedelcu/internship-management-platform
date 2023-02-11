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

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AdminAddStudents = () => {
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

    if (emailCheckResult === "success")
      callback("Email address already in use!");
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
        tip={"Creating student account(s) ..."}
      >
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={[]}
          width={1000}
        >
          <Typography.Title level={2}>
            Student Creation Results ...
          </Typography.Title>
          <Divider />
          <Row gutter={[16, 16]} style={{ display: "flex" }} justify="center">
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {detectedAccounts} Accounts Detected
              </Typography.Title>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {createdAccounts} Accounts Created
              </Typography.Title>
            </Col>
            <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
              <Typography.Title level={3} style={{ color: "rgb(15, 28, 112)" }}>
                {detectedAccounts - createdAccounts} Accounts Aborted
              </Typography.Title>
            </Col>
          </Row>
          <br />
          <Typography.Title level={5} type={"secondary"}>
            The following accounts have not been created (please check the email
            is not already in use and that the information in the file is valid
            ...):
          </Typography.Title>
          <Typography.Title level={5} type={"secondary"}>
            {notCreatedAccounts}
          </Typography.Title>
        </Modal>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Typography.Title level={5}>Create a student</Typography.Title>
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
                    message: "Please provide the student's full name",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the student's full name"
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
                    message: "Please provide a valid email address!",
                  },
                  {
                    required: true,
                    message: "Please provide the student's email!",
                  },
                  { validator: validateEmail },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the student's email"
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
                    message: "Please provide the student's group",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the student's group"
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
                    message:
                      "Please provide either the student's passport or CNP",
                  },
                  {
                    len: 13,
                    message: "CNP must have exactly 13 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the student's CNP"
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
                  placeholder="Type in the student's passport"
                  disabled={cnp !== ""}
                  onChange={(e) => {
                    setPassport(e.target.value);
                    form.resetFields(["cnp"]);
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create the student
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>
              Import multiple students from file
            </Typography.Title>
            <Dragger {...newProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Select the .xlsx file containing the students. The upload will
                start as soon as you drag or select the document.
              </p>
            </Dragger>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default AdminAddStudents;
