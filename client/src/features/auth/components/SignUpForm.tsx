import { Col, Row, Form } from "antd";
import useSignUpForm from "../hooks/useSignUpForm";
import SignUpSteps from "./SignUpSteps";
import CompanyGeneralInfoForm from "./CompanyGeneralInfoForm";
import CompanyLegalRepForm from "./CompanyLegalRepForm";
import CompanyOffersForm from "./CompanyOffersForm";
import InternshipSetupForm from "./InternshipSetupForm";
import CompanyInternshipHandlerForm from "./CompanyInternshipHandlerForm";
import AllDoneForm from "./AllDoneForm";
import AccountSetupForm from "./AccountSetupForm";

import "../../../style/SignUpForm.css";

const SignUpForm = () => {
  const { steps, currentStepIdx, step, goTo } = useSignUpForm([
    <AccountSetupForm />,
    <CompanyGeneralInfoForm />,
    <CompanyLegalRepForm />,
    <CompanyInternshipHandlerForm />,
    <InternshipSetupForm />,
    <CompanyOffersForm />,
    <AllDoneForm />,
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

export default SignUpForm;
