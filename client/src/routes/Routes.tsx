import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import { SignIn } from "../pages";
import { ErrorPage, ErrorPageCode } from "../common";
import { SignUpForm } from "../features";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="*"
        element={<ErrorPage errorCode={ErrorPageCode.NotFound} />}
      />
    </Routes>
  );
};

export default AppRoutes;
