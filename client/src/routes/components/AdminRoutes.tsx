import { Routes, Route } from "react-router-dom";
import { Layout, AdminNavBar } from "layout";

import {
  AdminOverviewPage,
  Professors,
  Companies,
  EnrollmentRequests,
  AdminCompanyProfile,
  AdminOfferProfile,
  ProfessorProfile,
} from "../../features";
import ProtectedRoutes from "../ProtectedRoutes";
import { USER_ROLES } from "common/constants";
import {
  Internships,
  Offers,
  StudentProfile,
  Students,
} from "features/admin-dashboard";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          element={<ProtectedRoutes authorizedRoles={[USER_ROLES.ADMIN]} />}
        >
          <Route
            path="/"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"1"} />}
                content={<AdminOverviewPage />}
              />
            }
          />
          <Route
            path="students"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"2"} />}
                content={<Students />}
              />
            }
          />
          <Route
            path="teachers"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"3"} />}
                content={<Professors />}
              />
            }
          />
          <Route
            path="offers"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"6"} />}
                content={<Offers />}
              />
            }
          />
          <Route
            path="companies"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"4"} />}
                content={<Companies />}
              />
            }
          />
          <Route
            path="requests"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"5"} />}
                content={<EnrollmentRequests />}
              />
            }
          />
          <Route
            path="company/:companyId"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"-1"} />}
                content={<AdminCompanyProfile />}
              />
            }
          />
          <Route
            path="offer/:offerId"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"-1"} />}
                content={<AdminOfferProfile />}
              />
            }
          />
          <Route
            path="teacher/:teacherId"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"-1"} />}
                content={<ProfessorProfile />}
              />
            }
          />
          <Route
            path="student/:studentId"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"-1"} />}
                content={<StudentProfile />}
              />
            }
          />
          <Route
            path="internships"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"-1"} />}
                content={<Internships />}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
