import { Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import useSignUp from "features/auth/hooks/useSignUp";
import { useTranslation } from "react-i18next";

const AccountSetupStep = () => {
  const { t } = useTranslation();

  const { mutateCheckUniqueEmail, emailCheckResult } = useSignUp();

  const validateEmail = (rule: any, value: any, callback: any) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success") callback(t("EMAIL_ALREADY_IN_USE"));
    else callback();
  };

  return (
    <>
      <Form.Item
        label={t("EMAIL")}
        name="accountEmail"
        rules={[
          {
            type: "email",
            message: t("TYPE_VALID_EMAIL").toString(),
          },
          { required: true, message: t("PROVIDE_EMAIL").toString() },
          { validator: validateEmail },
        ]}
        hasFeedback
      >
        <Input
          placeholder={t("PROVIDE_EMAIL").toString()}
          prefix={<MailOutlined />}
        />
      </Form.Item>

      <Form.Item
        label={t("PASSWORD")}
        name="accountPassword"
        rules={[{ required: true, message: t("PROVIDE_PASSWORD").toString() }]}
        hasFeedback
      >
        <Input.Password
          placeholder={t("PROVIDE_PASSWORD").toString()}
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
          placeholder={t("CONFIRM_PASSWORD").toString()}
          prefix={<LockOutlined />}
        />
      </Form.Item>
    </>
  );
};

export default AccountSetupStep;
