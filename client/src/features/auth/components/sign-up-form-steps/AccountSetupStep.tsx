import { Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import useSignUp from "features/auth/hooks/useSignUp";

const AccountSetupStep = () => {
  const { mutateCheckUniqueEmail, emailCheckResult } = useSignUp();

  const handleEmailChange = (rule: any, value: any, callback: any) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success")
      callback("Email address already in use!");
    else callback();
  };

  return (
    <>
      <Form.Item
        label="Email address"
        name="accountEmail"
        rules={[
          {
            type: "email",
            message: "Please provide a valid email address!",
          },
          { required: true, message: "Please provide your email!" },
          { validator: handleEmailChange },
        ]}
        hasFeedback
      >
        <Input
          placeholder="Type in you email address"
          prefix={<MailOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="accountPassword"
        rules={[{ required: true, message: "Please provide a password!" }]}
        hasFeedback
      >
        <Input.Password
          placeholder="Type in your password"
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item
        label="Password confirm"
        name="accountPassword_confirmation"
        dependencies={["accountPassword"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("accountPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          placeholder="Re-enter your password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
    </>
  );
};

export default AccountSetupStep;
