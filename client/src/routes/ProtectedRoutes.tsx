import { Navigate, Outlet } from "react-router";

type TProtectedRouteProps = {
  user: string;
  authorizedRoles: string[];
};

const ProtectedRoutes = ({ user, authorizedRoles }: TProtectedRouteProps) => {
  // verify everything is ok
  const bOK = true;

  if (bOK) return <Outlet />;

  return <Navigate to={"/not-permitted"} />;
};

export default ProtectedRoutes;
