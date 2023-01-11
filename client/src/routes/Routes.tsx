import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import { SignIn } from "../pages";
import { ErrorPage, ErrorPageCode } from "../common";
import { SignUpForm } from "../features";
import DashboardLayout from "layouts/DashboardLayout";
import AdminNavBar from "features/admin-dashboard/components/AdminNavBar";
import { AdminOverview } from "../features";
import { AdminStats } from "../features";
import { AdminStudentsList } from "../features";
import { AdminTeachersList } from "../features";
import { AdminMessages } from "../features";
import { AdminDocuments } from "../features";
import { AdminCompanyOffers } from "../features";
import { AdminCompaniesList } from "../features";
import { AdminSignUpRequests } from "../features";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SignIn />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/dashboard/admin"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"1"} />}
            content={<AdminOverview />}
          />
        }
      />
      <Route
        path="/dashboard/admin/stats"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"7"} />}
            content={<AdminStats />}
          />
        }
      />
      <Route
        path="/dashboard/admin/students"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"2"} />}
            content={<AdminStudentsList />}
          />
        }
      />
      <Route
        path="/dashboard/admin/teachers"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"3"} />}
            content={<AdminTeachersList />}
          />
        }
      />
      <Route
        path="/dashboard/admin/messages"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"9"} />}
            content={<AdminMessages />}
          />
        }
      />
      <Route
        path="/dashboard/admin/documents"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"8"} />}
            content={<AdminDocuments />}
          />
        }
      />
      <Route
        path="/dashboard/admin/offers"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"6"} />}
            content={<AdminCompanyOffers />}
          />
        }
      />
      <Route
        path="/dashboard/admin/companies"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"4"} />}
            content={<AdminCompaniesList />}
          />
        }
      />
      <Route
        path="/dashboard/admin/requests"
        element={
          <DashboardLayout
            sider={<AdminNavBar selectedKey={"5"} />}
            content={<AdminSignUpRequests />}
          />
        }
      />
      <Route
        path="*"
        element={<ErrorPage errorCode={ErrorPageCode.NotFound} />}
      />
    </Routes>
  );
};

export default AppRoutes;
