import { Routes, Route } from "react-router-dom";
import { Layout, StudentNavBar } from "layout";

import ProtectedRoutes from "./ProtectedRoutes";
import {
  Companies,
  Overview,
  ProfileSetup,
  Offers,
  OfferProfile,
  CompanyProfile,
  Applications,
  Profile,
} from "features/student";
import { USER_ROLES } from "common/constants";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          element={<ProtectedRoutes authorizedRoles={[USER_ROLES.STUDENT]} />}
        >
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
                sider={<StudentNavBar selectedKey={"3"} />}
                content={<Companies />}
              />
            }
          />
          <Route
            path="/offers"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"4"} />}
                content={<Offers />}
              />
            }
          />
          <Route
            path="offer/:offerID"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"-1"} />}
                content={<OfferProfile />}
              />
            }
          />
          <Route
            path="company/:companyID"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"-1"} />}
                content={<CompanyProfile />}
              />
            }
          />
          <Route
            path="/applications"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"5"} />}
                content={<Applications />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Layout
                sider={<StudentNavBar selectedKey={"2"} />}
                content={<Profile />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
