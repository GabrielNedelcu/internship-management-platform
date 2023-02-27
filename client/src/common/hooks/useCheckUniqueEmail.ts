import { useMutation } from "@tanstack/react-query";

import { checkAccountEmail } from "common";
import { RuleObject } from "antd/es/form";

const useCheckUniqueEmail = () => {
  const { mutate: mutateCheckUniqueEmail, status: emailCheckResult } =
    useMutation(["checkUniqueEmail"], (email: string) =>
      checkAccountEmail(email)
    );

  const validateEmail = (
    rule: RuleObject,
    value: any,
    callback: (error?: string) => void
  ) => {
    mutateCheckUniqueEmail(value);

    if (emailCheckResult === "success")
      callback("Email address already in use!");
    else callback();
  };

  return { validateEmail };
};

export default useCheckUniqueEmail;
