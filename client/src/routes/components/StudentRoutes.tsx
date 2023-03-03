import { Routes, Route } from "react-router-dom";
import { Layout, StudentNavBar } from "layout";

import ProtectedRoutes from "./ProtectedRoutes";
import { Companies, Overview, ProfileSetup } from "features/student";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes authorizedRoles={["student"]} />}>
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route
            path="/overview"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"1"} />}
                content={<Overview />}
              />
            }
          />
          <Route
            path="/companies"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"2"} />}
                content={<Companies />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;