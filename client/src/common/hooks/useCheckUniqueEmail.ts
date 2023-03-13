import { useMutation } from "@tanstack/react-query";

import { checkAccountEmail } from "common";
import { RuleObject } from "antd/es/form";
import { useTranslation } from "react-i18next";

const useCheckUniqueEmail = () => {
  const { t } = useTranslation();

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
      callback(t("EMAIL_ALREADY_IN_USE").toString());
    else callback();
  };

  return { validateEmail };
};

export default useCheckUniqueEmail;
