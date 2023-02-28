import { Route, Routes } from "react-router-dom";

import { AdminRoutes, CommonRoutes, StudentRoutes } from "./components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<CommonRoutes />} />
      <Route path="dashboard/admin/*" element={<AdminRoutes />} />
      <Route path="student/*" element={<StudentRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
