import { Steps } from "antd";
import { useTranslation } from "react-i18next";

type SignUpStepsProps = {
  currentStepIdx: number;
  onChangeHandler?: (current: number) => void;
};

const SignUpSteps = ({ currentStepIdx, onChangeHandler }: SignUpStepsProps) => {
  const { t } = useTranslation();

  const steps = [
    {
      title: "Step 1",
      description: t("ACCOUNT_SETUP"),
    },
    {
      title: "Step 2",
      description: t("GENERAL_INFORMATION"),
    },
    {
      title: "Step 3",
      description: t("LEGAL_REP"),
    },
    {
      title: "Step 4",
      description: t("INTERNSHIP_HANDLER"),
    },
    {
      title: "Step 5",
      description: t("INTERNSHIP_SETUP"),
    },
    {
      title: "Step 6",
      description: t("OFFERS"),
    },
    {
      title: t("FINISH"),
    },
  ];

  return (
    <Steps
      current={currentStepIdx}
      // onChange={onChangeHandler}
      direction="vertical"
      items={steps}
    />
  );
};

export default SignUpSteps;
