import { Col, Row, Form } from "antd";
import useSignUpForm from "../hooks/useSignUpForm";

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

import "../../../style/SignUpForm.css";

const SignUpPage = () => {
  const { currentStepIdx, step, goTo } = useSignUpForm([
    <AccountSetupStep />,
    <CompanyGeneralInfoStep />,
    <CompanyLegalRepStep />,
    <CompanyInternshipHandlerStep />,
    <InternshipSetupStep />,
    <CompanyOffersStep />,
    <AllDoneStep />,
  ]);

  const onChangeCurrentStepHandler = (current: number) => {
    goTo(current);
  };

  return (
    <div className="sign-up-container">
      <Row>
        <Col className="forms-container" span={18} push={6}>
          <div className="form-container">
            <Form layout="vertical" size="large">
              {step}
            </Form>
          </div>
        </Col>
        <Col className="steps-container" span={6} pull={18}>
          <SignUpSteps
            currentStepIdx={currentStepIdx}
            onChangeHandler={onChangeCurrentStepHandler}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;
