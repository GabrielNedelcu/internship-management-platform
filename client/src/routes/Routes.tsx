import { Route, Routes } from "react-router-dom";

import { AdminRoutes, CommonRoutes } from "./components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<CommonRoutes />} />
      <Route path="dashboard/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
