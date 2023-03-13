import { LockOutlined } from "@ant-design/icons";
import { Form, Button, Input, notification, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "common/api";
import { useState } from "react";
import { IPasswordChangeData } from "common/types";
import { wait } from "@testing-library/user-event/dist/utils";
import { useTranslation } from "react-i18next";

interface IPasswordChangeFormProps {
  afterSubmitCallback?: () => void;
}

const PasswordChangeForm = ({
  afterSubmitCallback,
}: IPasswordChangeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const { mutate: mutateChangeUserPassword } = useMutation(
    ["changeUserPassword"],
    (data: IPasswordChangeData) => {
      setIsLoading(true);
      return changeUserPassword(data);
    },
    {
      onSuccess: () => {
        setIsLoading(false);
        notification.success({
          message: t("PASSWORD_CHANGED"),
          description: t("PASSWORD_CHANGED_SUCCESSFULLY_MSG"),
          duration: 10,
        });
        form.resetFields();
        wait(3000).then(() => afterSubmitCallback?.());
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description: t("PASSWORD_CHANGED_ERROR"),
          duration: 10,
        });
        form.resetFields();
        wait(3000).then(() => afterSubmitCallback?.());
      },
    }
  );

  return (
    <>
      <Spin spinning={isLoading} tip={t("CHANGING_PASSWORD")}>
        <Form
          layout="horizontal"
          size="large"
          labelCol={{ span: 6 }}
          form={form}
          onFinish={(values: any) => {
            mutateChangeUserPassword(values);
          }}
        >
          <Form.Item
            label={t("PASSWORD")}
            name="accountPassword"
            rules={[
              { required: true, message: t("PROVIDE_PASSWORD").toString() },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder={t("TYPE_PASSWORD").toString()}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            label={t("CONFIRM")}
            name="accountPassword_confirmation"
            dependencies={["accountPassword"]}
            rules={[
              {
                required: true,
                message: t("CONFIRM_PASSWORD").toString(),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("accountPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("PASSWORDS_NOT_MATCH").toString())
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder={t("RE_ENTER_PASSWORD").toString()}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("CHANGE_PASSWORD")}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};

export default PasswordChangeForm;
