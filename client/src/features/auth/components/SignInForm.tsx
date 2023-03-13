import { Button, Form, Input, Divider, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import useSignIn from "../hooks/useSignIn";

import "../../../style/SignInForm.css";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const SignInForm = () => {
  const { t } = useTranslation();

  const {
    setEmail,
    setPassword,
    setReqPasswordEmail,
    mutateLoginUser,
    mutateRequestPassword,
  } = useSignIn();

  return (
    <div className="sign-in-form-container">
      <h1 className="header">{t("WELCOME")}</h1>
      <p style={{ color: "#c5c5c5" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare
        congue euismod. Nullam accumsan, libero sit{" "}
      </p>

      <Divider>Log In</Divider>

      <Form layout="vertical" size="large" onFinish={(e) => mutateLoginUser()}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: t("TYPE_VALID_EMAIL").toString(),
            },
            { required: true, message: t("TYPE_IN_YOUR_EMAIL").toString() },
          ]}
        >
          <Input
            placeholder={t("TYPE_IN_YOUR_EMAIL").toString()}
            prefix={<MailOutlined />}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: t("TYPE_IN_YOUR_PASSWORD").toString() },
          ]}
        >
          <Input.Password
            placeholder={t("TYPE_IN_YOUR_PASSWORD").toString()}
            prefix={<LockOutlined />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <a href="" style={{ float: "right" }}>
            {t("PASS_FORGOTTEN")}
          </a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log In
          </Button>
        </Form.Item>
      </Form>

      <Divider>{t("DONT_HAVE_ACCOUNT")}</Divider>

      <Divider orientation="left" dashed={true}>
        {t("I_AM_COMPANY")}
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
        {t("I_AM_STUDENT_TEACHER")}
      </Divider>

      <Search
        placeholder={t("ENTER_EMAIL_FOR_PASS_REQ").toString()}
        allowClear
        enterButton={t("REQUEST_PASS")}
        size="large"
        onChange={(e) => {
          setReqPasswordEmail(e.target.value);
        }}
        onSearch={(value, e) => {
          if (!value.length) {
            notification.error({
              message: "Ooops ...",
              description: t("ENTER_EMAIL_FOR_PASS_REQ"),
              duration: 2,
            });
          } else mutateRequestPassword();
        }}
      />
    </div>
  );
};

export default SignInForm;
