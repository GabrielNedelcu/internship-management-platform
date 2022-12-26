import { Result } from "antd";

import "../../style/ErrorPage.css";

export enum ErrorPageCode {
  NotPermitted = 403,
  NotFound = 404,
  InternalError = 500,
}

export const ErrorPage = ({ errorCode }: { errorCode: ErrorPageCode }) => {
  const errorData = new Map<ErrorPageCode, [string, string]>([
    [
      ErrorPageCode.NotPermitted,
      [
        "403 Not Permitted",
        "Sorry, you are not authorized to access this page.",
      ],
    ],
    [
      ErrorPageCode.NotFound,
      ["404 Not Found", "Sorry, the page you visited does not exist."],
    ],
    [
      ErrorPageCode.InternalError,
      ["500 Internal Server Error", "Sorry, something went wrong."],
    ],
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
