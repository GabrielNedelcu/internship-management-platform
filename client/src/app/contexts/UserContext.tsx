import { useLocalStorage } from "common/hooks";
import { createContext, ReactNode } from "react";

const initialState = {
  userID: "",
  accessToken: "",
  setUserID: (_: string) => {},
  setAccessToken: (_: string) => {},
};

interface IUserContext {
  userID: string;
  accessToken: string;
  setUserID: (userID: string) => void;
  setAccessToken: (accessToken: string) => void;
}

interface IUserContextWrapperProps {
  children: ReactNode;
}

const UserContext = createContext<IUserContext>(initialState);

const UserContextWrapper = ({ children }: IUserContextWrapperProps) => {
  const [userID, setUserID] = useLocalStorage("userID", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  return (
    <UserContext.Provider
      value={{
        userID,
        accessToken,
        setUserID,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserContextWrapper;
