import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  UploadProps,
  message,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import useStudentCreation from "../../hooks/useStudentCreation";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  accept: ".xlsx",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AdminAddStudents = () => {
  const {
    cnp,
    passport,
    setName,
    setEmail,
    setGroup,
    setCNP,
    setPassport,
    emailCheckResult,
    mutateCreateStudent,
    mutateCheckUniqueEmail,
  } = useStudentCreation();

  const [form] = Form.useForm();

  const validateEmail = (rule: any, value: any, callback: any) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success")
      callback("Email address already in use!");
    else callback();
  };

  return (
    <>
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
          <Dragger {...props}>
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
    </>
  );
};

export default AdminAddStudents;
