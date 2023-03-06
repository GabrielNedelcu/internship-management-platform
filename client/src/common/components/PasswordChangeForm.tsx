import { LockOutlined } from "@ant-design/icons";
import { Form, Button, Input, notification, Spin } from "antd";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "common/api";
import { useState } from "react";
import { IPasswordChangeData } from "common/types";

const PasswordChangeForm = () => {
  const [isLoading, setIsLoading] = useState(false);

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
          message: "Password changed",
          description: "Great! You have successfully changed your password ...",
          duration: 10,
        });
      },
      onError: () => {
        setIsLoading(false);
        notification.error({
          message: "Ooops ...",
          description:
            "Error occured while changing your password! Please try again later!",
          duration: 10,
        });
      },
    }
  );

  return (
    <>
      <Spin spinning={isLoading} tip="Changing password ...">
        <Form
          layout="horizontal"
          size="large"
          labelCol={{ span: 5 }}
          onFinish={(values: any) => {
            mutateChangeUserPassword(values);
          }}
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
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
      </Spin>
    </>
  );
};

export default PasswordChangeForm;
