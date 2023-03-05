import { IStudentData, LoadingPage } from "common";
import {
  Form,
  Input,
  UploadProps,
  Button,
  DatePicker,
  Upload,
  notification,
  Space,
} from "antd";
import {
  FlagOutlined,
  HomeOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateStudentData } from "../api";

interface IProfileFormProps {
  profileData?: IStudentData;
  onSuccess?: () => void;
  finishPrompt: string;
  displayLabels: boolean;
}

const uploadProps: UploadProps = {
  name: "file",
  accept: ".pdf",
  multiple: false,
  maxCount: 1,
  beforeUpload: (file) => {
    return false;
  },
};

const ProfileForm = ({
  profileData,
  onSuccess,
  finishPrompt,
  displayLabels,
}: IProfileFormProps) => {
  const [loading, setLoading] = useState(false);

  const { mutate: mutateUpdateSelfStudent } = useMutation(
    ["getSelfStudent"],
    (data: IStudentData) => {
      setLoading(true);
      return updateStudentData(data);
    },
    {
      onSuccess: () => {
        setLoading(false);
        notification.success({
          message: "Profile updated!",
          description:
            "You have successfully updated your profile information!",
          duration: 10,
        });
        onSuccess?.();
      },
      onError: () => {
        setLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while updating your profile information ... Please try again later!",
          duration: 10,
        });
      },
    }
  );

  if (loading)
    return <LoadingPage message="Updating profile information ..." />;

  return (
    <>
      <Form
        layout="horizontal"
        size="large"
        onFinish={(values: any) => {
          mutateUpdateSelfStudent({
            ...values,
            profileCompleted: true,
          });
        }}
        initialValues={{
          ...profileData,
          birthDay: dayjs(profileData?.birthDay),
        }}
        labelCol={{ span: 5 }}
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
          {...(displayLabels && {
            label: "Citizenship",
          })}
        >
          <Input
            suffix={<FlagOutlined />}
            placeholder="Type in the your citizenship (Eg: Romana)"
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
          {...(displayLabels && {
            label: "Legal Address",
          })}
        >
          <Input
            suffix={<HomeOutlined />}
            placeholder="Type in your home address ..."
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
          {...(displayLabels && {
            label: "Current Address",
          })}
        >
          <Input
            suffix={<PushpinOutlined />}
            placeholder="Type in the full address where you will be staying during the internship"
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
          {...(displayLabels && { label: "Birthday" })}
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
          {...(displayLabels && { label: "Birthplace" })}
        >
          <Input
            suffix={<PushpinOutlined />}
            placeholder="Type in the your birth place"
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
              message: "The phone number must have exactly 9 characters",
            },
          ]}
          hasFeedback
          {...(displayLabels && { label: "Phone" })}
        >
          <Input
            placeholder="Type in your phone number"
            suffix={<PhoneOutlined />}
            addonBefore="+40"
          />
        </Form.Item>

        <Form.Item name="cv" {...(displayLabels && { label: "CV" })}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload your CV</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {finishPrompt}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileForm;
