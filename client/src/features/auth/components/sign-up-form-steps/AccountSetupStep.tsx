import { Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const AccountSetupStep = () => {
  return (
    <>
      <Form.Item label="Email address" name="account_email">
        <Input
          placeholder="Type in you email address"
          prefix={<MailOutlined />}
        />
      </Form.Item>
      <Form.Item label="Password" name="account_password">
        <Input.Password
          placeholder="Type in your password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item label="Password confirm" name="account_password_confirm">
        <Input.Password
          placeholder="Re-enter your password"
          prefix={<LockOutlined />}
        />
      </Form.Item>
    </>
  );
};

export default AccountSetupStep;
