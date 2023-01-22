import { createContext, useState, ReactNode } from "react";

const initialState = {
  userID: "",
  userRole: "",
  accessToken: "",
  setUserID: (_: string) => {},
  setUserRole: (_: string) => {},
  setAccessToken: (_: string) => {},
};

interface IUserContext {
  userID: string;
  userRole: string;
  accessToken: string;
  setUserID: (userID: string) => void;
  setUserRole: (userRole: string) => void;
  setAccessToken: (accessToken: string) => void;
}

interface IUserContextWrapperProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContext>(initialState);

const UserContextWrapper = ({ children }: IUserContextWrapperProps) => {
  const [userID, setUserID] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <UserContext.Provider
      value={{
        userID,
        userRole,
        accessToken,
        setUserID,
        setUserRole,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserContextWrapper;
