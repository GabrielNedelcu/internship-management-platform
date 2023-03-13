import { Col, Row, Form, Space, Button } from "antd";
import { StepForwardOutlined, StepBackwardOutlined } from "@ant-design/icons";

import {
  SignUpSteps,
  AllDoneStep,
  AccountSetupStep,
  CompanyOffersStep,
  InternshipSetupStep,
  CompanyLegalRepStep,
  CompanyGeneralInfoStep,
  CompanyInternshipHandlerStep,
} from "../components";

import useSignUpForm from "../hooks/useSignUpForm";
import useSignUp from "../hooks/useSignUp";

import "../../../style/SignUpForm.css";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation();

  const { formData, setFormData, mutateSignUpCompany } = useSignUp();

  const { currentStepIdx, step, next, back, isFirstStep, isLastStep } =
    useSignUpForm([
      <AccountSetupStep />,
      <CompanyGeneralInfoStep />,
      <CompanyLegalRepStep />,
      <CompanyInternshipHandlerStep />,
      <InternshipSetupStep />,
      <CompanyOffersStep />,
      <AllDoneStep />,
    ]);

  return (
    <>
      <div className="sign-up-container">
        <Row>
          <Col className="forms-container" span={18} push={6}>
            <div className="form-container">
              <Form
                layout="vertical"
                size="large"
                onFinish={(data) => {
                  if (!isLastStep) {
                    setFormData({ ...formData, ...data });
                    next();
                  } else {
                    mutateSignUpCompany();

                    //TODO: display loading state until account is created
                  }
                }}
              >
                {step}
                <Space style={{ float: "right" }}>
                  {!isFirstStep && (
                    <Button
                      type="primary"
                      onClick={() => back()}
                      icon={<StepBackwardOutlined />}
                    >
                      {t("BACK")}
                    </Button>
                  )}

                  {!isLastStep && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<StepForwardOutlined />}
                    >
                      {t("NEXT")}
                    </Button>
                  )}
                </Space>
              </Form>
            </div>
          </Col>
          <Col className="steps-container" span={6} pull={18}>
            <SignUpSteps currentStepIdx={currentStepIdx} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignUpPage;
