import { Col, Row } from "antd";
import SignInForm from "../components/SignInForm";

import "../../../style/SignInPage.css";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
  const { t } = useTranslation();

  return (
    <div className="sign-in-container">
      <Row justify="center">
        <Col className="form-container" span={12}>
          <SignInForm />
        </Col>
        <Col className="image-container" span={12}>
          <div className="text-container">
            <h1 className="heading"> ETTI Internships.</h1>
            <h3 className="subheading"> {t("CONNECTING_STUDENTS")}</h3>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignInPage;
