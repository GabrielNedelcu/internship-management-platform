import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router";

import { UserContext } from "app/contexts/UserContext";

type TProtectedRouteProps = {
  authorizedRoles: string[];
};

const ProtectedRoutes = ({ authorizedRoles }: TProtectedRouteProps) => {
  const { accessToken } = useContext(UserContext);
  const decodedToken: any = jwt_decode(accessToken);

  if (authorizedRoles.includes(decodedToken.role)) return <Outlet />;

  return <Navigate to={"/not-permitted"} />;
};

export default ProtectedRoutes;
