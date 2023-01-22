import { Button, Form, Input, Divider, Space } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import "../../../style/SignInForm.css";
import useSignIn from "../hooks/useSignIn";
import FormItem from "antd/es/form/FormItem";

const { Search } = Input;

const SignInForm = () => {
  const { setEmail, setPassword, mutateLoginUser } = useSignIn();

  return (
    <div className="sign-in-form-container">
      <h1 className="header">Welcome!</h1>
      <p style={{ color: "#c5c5c5" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare
        congue euismod. Nullam accumsan, libero sit{" "}
      </p>

      <Divider>Log In</Divider>

      <Form layout="vertical" size="large" onFinish={(e) => mutateLoginUser()}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Type in you email address"
            prefix={<MailOutlined />}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Type in your password"
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <a href="" style={{ float: "right" }}>
            Forgotten password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Divider>Don't have an account?</Divider>

      <Divider orientation="left" dashed={true}>
        I am a company
      </Divider>

      <Button
        type="primary"
        htmlType="button"
        size="large"
        href="/signup"
        block
      >
        Sign Up
      </Button>

      <Divider orientation="left" dashed={true}>
        I am a student / teacher
      </Divider>

      <Search
        placeholder="Please enter your email so we can send you your password"
        allowClear
        enterButton="Request password"
        size="large"
      />
    </div>
  );
};

export default SignInForm;
