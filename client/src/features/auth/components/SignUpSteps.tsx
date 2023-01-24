import { Steps } from "antd";

type SignUpStepsProps = {
  currentStepIdx: number;
  onChangeHandler?: (current: number) => void;
};

const SignUpSteps = ({ currentStepIdx, onChangeHandler }: SignUpStepsProps) => {
  const steps = [
    {
      title: "Step 1",
      description: "Account Setup",
    },
    {
      title: "Step 2",
      description: "Company general information",
    },
    {
      title: "Step 3",
      description: "Company legal representative information",
    },
    {
      title: "Step 4",
      description: "Internship handler information",
    },
    {
      title: "Step 5",
      description: "Internship options setup",
    },
    {
      title: "Step 6",
      description: "Offers setup",
    },
    {
      title: "Finish!",
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
