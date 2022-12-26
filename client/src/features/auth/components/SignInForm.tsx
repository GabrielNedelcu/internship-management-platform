import { Button, Form, Input, Divider } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import "../../../style/SignInForm.css";

const { Search } = Input;

const SignInForm = () => {
  return (
    <div className="sign-in-form-container">
      <h1 className="header">Welcome!</h1>
      <p className="paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare
        congue euismod. Nullam accumsan, libero sit{" "}
      </p>
      <Divider>Log In</Divider>
      <Form layout="vertical" size="large">
        <Form.Item>
          <Input
            placeholder="Type in you email address"
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Type in your password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgotten password?
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
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
        className="signup-form-button"
        href="/signup"
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
