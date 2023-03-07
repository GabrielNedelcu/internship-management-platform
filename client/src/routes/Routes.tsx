import { Route, Routes } from "react-router-dom";

import {
  AdminRoutes,
  CommonRoutes,
  CompanyRoutes,
  StudentRoutes,
} from "./components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<CommonRoutes />} />
      <Route path="dashboard/admin/*" element={<AdminRoutes />} />
      <Route path="student/*" element={<StudentRoutes />} />
      <Route path="company/*" element={<CompanyRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
