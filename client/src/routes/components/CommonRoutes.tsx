import { Routes, Route } from "react-router-dom";

import { ErrorPage, ErrorPageCode } from "../../common";
import { SignUpPage, SignInPage } from "../../features";

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="*"
        element={<ErrorPage errorCode={ErrorPageCode.NotFound} />}
      />
    </Routes>
  );
};

export default CommonRoutes;
