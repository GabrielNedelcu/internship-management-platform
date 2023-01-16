import { Routes, Route } from "react-router-dom";
import { Layout, AdminNavBar } from "layout";

import {
  AdminOverview,
  AdminStats,
  AdminStudentsList,
  AdminTeachersList,
  AdminMessages,
  AdminDocuments,
  AdminCompanyOffers,
  AdminCompaniesList,
  AdminSignUpRequests,
} from "../../features";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"1"} />}
              content={<AdminOverview />}
            />
          }
        />
        <Route
          path="stats"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"7"} />}
              content={<AdminStats />}
            />
          }
        />
        <Route
          path="students"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"2"} />}
              content={<AdminStudentsList />}
            />
          }
        />
        <Route
          path="teachers"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"3"} />}
              content={<AdminTeachersList />}
            />
          }
        />
        <Route
          path="messages"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"9"} />}
              content={<AdminMessages />}
            />
          }
        />
        <Route
          path="documents"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"8"} />}
              content={<AdminDocuments />}
            />
          }
        />
        <Route
          path="offers"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"6"} />}
              content={<AdminCompanyOffers />}
            />
          }
        />
        <Route
          path="companies"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"4"} />}
              content={<AdminCompaniesList />}
            />
          }
        />
        <Route
          path="requests"
          element={
            <Layout
              sider={<AdminNavBar selectedKey={"5"} />}
              content={<AdminSignUpRequests />}
            />
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;
