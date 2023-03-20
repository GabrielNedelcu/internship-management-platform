import { Routes, Route } from "react-router-dom";
import { Layout, AdminNavBar } from "layout";

import {
  AdminOverviewPage,
  AdminStatsPage,
  AdminStudentsPage,
  AdminTeachersPage,
  AdminMessagesPage,
  AdminDocumentsPage,
  AdminCompanyOffersPage,
  AdminCompaniesPage,
  AdminSignUpRequestsPage,
  AdminCompanyProfile,
  AdminOfferProfile,
  AdminTeacherProfile,
} from "../../features";
import ProtectedRoutes from "../ProtectedRoutes";
import { USER_ROLES } from "common/constants";
import { Internships } from "features/admin-dashboard";

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
            path="stats"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"7"} />}
                content={<AdminStatsPage />}
              />
            }
          />
          <Route
            path="students"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"2"} />}
                content={<AdminStudentsPage />}
              />
            }
          />
          <Route
            path="teachers"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"3"} />}
                content={<AdminTeachersPage />}
              />
            }
          />
          <Route
            path="messages"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"10"} />}
                content={<AdminMessagesPage />}
              />
            }
          />
          <Route
            path="documents"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"9"} />}
                content={<AdminDocumentsPage />}
              />
            }
          />
          <Route
            path="offers"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"6"} />}
                content={<AdminCompanyOffersPage />}
              />
            }
          />
          <Route
            path="companies"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"4"} />}
                content={<AdminCompaniesPage />}
              />
            }
          />
          <Route
            path="requests"
            element={
              <Layout
                sider={<AdminNavBar selectedKey={"5"} />}
                content={<AdminSignUpRequestsPage />}
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
                content={<AdminTeacherProfile />}
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
