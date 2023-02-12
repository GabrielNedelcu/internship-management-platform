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

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  maxCount: 1,
};

const AdminAddTeachers = () => {
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

    if (emailCheckResult === "success")
      callback("Email address already in use!");
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
        tip={"Creating teacher account(s) ..."}
      >
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          footer={[]}
          width={1000}
        >
          <Typography.Title level={2}>
            Professors Creation Results ...
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
            <Typography.Title level={5}>Add a teacher</Typography.Title>
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
                    message: "Please provide the teacher's full name",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's full name"
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
                  placeholder="Type in the teacher's email"
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
                    message: "Please provide the teacher's job title",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's job title"
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
                    message: "Please provide the techer's private phone number",
                  },
                  {
                    len: 9,
                    message: "The phone number must have exactly 9 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's private phone number"
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
                    message: "Please provide the techer's public phone number",
                  },
                  {
                    len: 9,
                    message: "The phone number must have exactly 9 characters",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Type in the teacher's public phone number"
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
                    message: "Please select the techer's departament",
                  },
                ]}
                hasFeedback
              >
                <Select
                  placeholder="Please select the teacher's departament"
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
                  addonBefore={"Number of students"}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add the teacher
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>
              Import multiple teachers from file
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

export default AdminAddTeachers;
