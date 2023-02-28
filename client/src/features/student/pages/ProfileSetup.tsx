import {
  Col,
  Row,
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  UploadProps,
  Upload,
  Spin,
  notification,
} from "antd";
import {
  FlagOutlined,
  HomeOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "../../../style/SignInPage.css";
import { IEditableStudentData } from "../types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStudentData } from "../api";
import { useNavigate } from "react-router-dom";

const uploadProps: UploadProps = {
  name: "file",
  accept: ".pdf",
  multiple: false,
  maxCount: 1,
  beforeUpload: (file) => {
    return false;
  },
};

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mutateUpdateSelfStudent } = useMutation(
    ["SelfStudent"],
    (data: IEditableStudentData) => {
      setLoading(true);
      return updateStudentData(data);
    },
    {
      onSuccess: () => {
        setLoading(false);
        return navigate(`/student/overview`);
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while setting up the profile ... Please try again later!",
          duration: 10,
        });
      },
    }
  );

  return (
    <>
      <div
        className="sign-in-container"
        style={{ backgroundColor: "white", padding: 25 }}
      >
        <Spin spinning={loading}>
          <Row justify="center">
            <Typography.Title level={2}>
              Setting up your profile ...
            </Typography.Title>
          </Row>
          <Row justify="center">
            <Typography.Title level={4} type={"secondary"}>
              Before using the platform, we need some information in order to
              generate the legal documents (contracts, etc.)
            </Typography.Title>
          </Row>

          <Row gutter={[16, 16]} justify={"center"}>
            <Col span={12}>
              <br />
              <br />
              <br />
              <Form
                layout="vertical"
                size="large"
                onFinish={(values: any) => {
                  mutateUpdateSelfStudent({
                    ...values,
                    profileCompleted: true,
                  });
                }}
              >
                <Form.Item
                  name="citizenship"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your citizenship",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    suffix={<FlagOutlined />}
                    placeholder="Type in the your citizenship (Eg: Romana)"
                    onChange={(e) => {}}
                  />
                </Form.Item>

                <Form.Item
                  name="legalAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your full home address",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    suffix={<HomeOutlined />}
                    placeholder="Type in your home address ..."
                    onChange={(e) => {}}
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your address",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    suffix={<PushpinOutlined />}
                    placeholder="Type in the full address where you will be staying during the internship"
                    onChange={(e) => {}}
                  />
                </Form.Item>

                <Form.Item
                  name="birthDay"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your birth day",
                    },
                  ]}
                  hasFeedback
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Please select your birthday"
                  />
                </Form.Item>

                <Form.Item
                  name="birthPlace"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your full birth place address",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    suffix={<PushpinOutlined />}
                    placeholder="Type in the your birth place"
                    onChange={(e) => {}}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your phone number",
                    },
                    {
                      len: 9,
                      message:
                        "The phone number must have exactly 9 characters",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Type in your phone number"
                    suffix={<PhoneOutlined />}
                    addonBefore="+40"
                    onChange={(e) => {}}
                  />
                </Form.Item>

                <Form.Item name="cv">
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload your CV</Button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Finish Profile Setup
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    </>
  );
};

export default ProfileSetup;
