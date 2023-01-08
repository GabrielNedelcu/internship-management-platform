import { Row, Col, Typography, Form, Input, Button, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

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

const AdminAddTeachers = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Typography.Title level={5}>Add a teacher</Typography.Title>
          <Form layout="vertical" size="large">
            <Form.Item>
              <Input placeholder="Type in the teacher's full name" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Type in the teacher's email" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Type in the teacher's job title" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Type in the teacher's private phone number" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Type in the teacher's public phone number" />
            </Form.Item>
            <Form.Item>
              <Select placeholder="Please select the teacher's departament">
                <Select.Option value="ELA">ELA</Select.Option>
                <Select.Option value="RST">RST</Select.Option>
                <Select.Option value="TST">TST</Select.Option>
                <Select.Option value="MON">MON</Select.Option>
              </Select>
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

export default AdminAddTeachers;
