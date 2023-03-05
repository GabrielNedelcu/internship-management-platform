import { LockOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";

const PasswordChangeForm = () => {
  return (
    <>
      <Form
        layout="horizontal"
        size="large"
        labelCol={{ span: 5 }}
        onFinish={(values: any) => {}}
      >
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
          label="Confirm"
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block danger>
            Change password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PasswordChangeForm;
