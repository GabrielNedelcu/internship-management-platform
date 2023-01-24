import { ReactElement, useState } from "react";

const useSignUpForm = (steps: ReactElement[]) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const next = () => {
    setCurrentStepIdx((crntStepIdx) => {
      if (crntStepIdx >= steps.length - 1) return crntStepIdx;
      return crntStepIdx + 1;
    });
  };

  const back = () => {
    setCurrentStepIdx((crntStepIdx) => {
      if (crntStepIdx <= 0) return crntStepIdx;
      return crntStepIdx - 1;
    });
  };

  const goTo = (stepIdx: number) => {
    setCurrentStepIdx(stepIdx);
  };

  return {
    steps,
    currentStepIdx,
    step: steps[currentStepIdx],
    isFirstStep: currentStepIdx === 0,
    isLastStep: currentStepIdx === steps.length - 1,
    goTo,
    next,
    back,
  };
};

export default useSignUpForm;
