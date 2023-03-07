import { Routes, Route } from "react-router-dom";
import { Layout, CompanyNavBar } from "layout";

import ProtectedRoutes from "./ProtectedRoutes";
import { Overview, Profile } from "features/company";
import { USER_ROLES } from "common/constants";

const CompanyRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          element={<ProtectedRoutes authorizedRoles={[USER_ROLES.COMPANY]} />}
        >
          <Route
            path="/overview"
            element={
              <Layout
                sider={<CompanyNavBar selectedKey={"1"} />}
                content={<Overview />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Layout
                sider={<CompanyNavBar selectedKey={"2"} />}
                content={<Profile />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default CompanyRoutes;
