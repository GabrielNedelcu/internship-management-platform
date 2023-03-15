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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const { mutate: mutateUpdateSelfStudent } = useMutation(
    ["updateSelfStudent"],
    (data: IStudentData) => {
      setLoading(true);
      return updateStudentData(data);
    },
    {
      onSuccess: () => {
        setLoading(false);
        notification.success({
          message: t("ACCOUNT_UPDATED"),
          description: t("UPDATE_ACCOUNT_SUCCESS_MSG"),
          duration: 10,
        });
        onSuccess?.();
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

  if (loading) return <LoadingPage message={t("UPDATING_ACCOUNT")} />;

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
              message: t("PROVIDE_CITIZENSHIP").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && {
            label: t("CITIZENSHIP"),
          })}
        >
          <Input
            suffix={<FlagOutlined />}
            placeholder={t("PROVIDE_CITIZENSHIP").toString()}
          />
        </Form.Item>

        <Form.Item
          name="legalAddress"
          rules={[
            {
              required: true,
              message: t("PROVIDE_HOME_ADDRESS").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && {
            label: t("HOME_ADDRESS"),
          })}
        >
          <Input
            suffix={<HomeOutlined />}
            placeholder={t("PROVIDE_HOME_ADDRESS").toString()}
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: t("PROVIDE_RESIDENCY_ADDRESS").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && {
            label: t("RESIDENCY_ADDRESS"),
          })}
        >
          <Input
            suffix={<PushpinOutlined />}
            placeholder={t("PROVIDE_RESIDENCY_ADDRESS").toString()}
          />
        </Form.Item>

        <Form.Item
          name="birthDay"
          rules={[
            {
              required: true,
              message: t("PROVIDE_BIRTHDAY").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && { label: t("BIRTHDAY") })}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder={t("PROVIDE_BIRTHDAY").toString()}
          />
        </Form.Item>

        <Form.Item
          name="birthPlace"
          rules={[
            {
              required: true,
              message: t("PROVIDE_BIRTHPLACE").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && { label: t("BIRTHPLACE") })}
        >
          <Input
            suffix={<PushpinOutlined />}
            placeholder={t("PROVIDE_BIRTHPLACE").toString()}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: t("PROVIDE_PHONE_NUMBER").toString(),
            },
            {
              len: 9,
              message: t("TYPE_VALID_PHONE_NUMBER").toString(),
            },
          ]}
          hasFeedback
          {...(displayLabels && { label: t("PHONE_NUMBER") })}
        >
          <Input
            placeholder={t("PROVIDE_PHONE_NUMBER").toString()}
            suffix={<PhoneOutlined />}
            addonBefore="+40"
          />
        </Form.Item>

        <Form.Item name="cv" {...(displayLabels && { label: "CV" })}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{t("UPLOAD_CV")}</Button>
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
