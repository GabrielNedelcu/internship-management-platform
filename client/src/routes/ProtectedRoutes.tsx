import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, Outlet } from "react-router";
import { notification } from "antd";

import { UserContext } from "app/contexts/UserContext";

interface IProtectedRouteProps {
  authorizedRoles: string[];
}

const ProtectedRoutes = ({ authorizedRoles }: IProtectedRouteProps) => {
  const { accessToken } = useContext(UserContext);

  if (!accessToken) {
    localStorage.clear();

    notification.error({
      message: "Not Logged In ...",
      description:
        "Seems like you are not logged in yet ... please log in to your account to continue using the platform",
      duration: 10,
    });

    return <Navigate to={"/"} />;
  }

  const decodedToken: any = jwt_decode(accessToken);
  let currentDate = Date.now();
  //remove the last 3 digits
  currentDate = (currentDate - (currentDate % 1000)) / 1000;

  if (decodedToken.exp < currentDate) {
    localStorage.clear();

    notification.error({
      message: "Session expired ...",
      description:
        "Seems like your session has expired ... please log in to continue using the platform",
      duration: 10,
    });

    return <Navigate to={"/"} />;
  }

  //TODO: verify if token is expired
  if (authorizedRoles.includes(decodedToken.role)) return <Outlet />;

  return <Navigate to={"/not-permitted"} />;
};

export default ProtectedRoutes;
