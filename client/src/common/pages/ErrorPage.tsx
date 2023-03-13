import { Result } from "antd";
import { useTranslation } from "react-i18next";

import "../../style/ErrorPage.css";

export enum ErrorPageCode {
  NotPermitted = 403,
  NotFound = 404,
  InternalError = 500,
}

export const ErrorPage = ({ errorCode }: { errorCode: ErrorPageCode }) => {
  const { t } = useTranslation();

  const errorData = new Map<ErrorPageCode, [string, string]>([
    [ErrorPageCode.NotPermitted, [t("NOT_PERMITTED"), t("403_ERR_MSG")]],
    [ErrorPageCode.NotFound, [t("NOT_FOUND"), t("404_ERR_MSG")]],
    [ErrorPageCode.InternalError, [t("INTERNAL_ERR"), t("500_ERR_MSG")]],
  ]);

  return (
    <div className="errorContainer">
      <Result
        status={errorCode}
        title={errorData.get(errorCode)?.[0]}
        subTitle={errorData.get(errorCode)?.[1]}
      />
    </div>
  );
};
