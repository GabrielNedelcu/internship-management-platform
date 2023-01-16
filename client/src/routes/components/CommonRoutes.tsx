import { Routes, Route } from "react-router-dom";

import { SignIn } from "../../pages";
import { ErrorPage, ErrorPageCode } from "../../common";
import { SignUpForm } from "../../features";

const CommonRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="*"
        element={<ErrorPage errorCode={ErrorPageCode.NotFound} />}
      />
    </Routes>
  );
};

export default CommonRoutes;
