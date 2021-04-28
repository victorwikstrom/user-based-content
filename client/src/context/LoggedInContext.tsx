import { createContext, FC, useEffect, useState } from "react";
import { User } from "../helpers";

interface LoggedInValue {
  user: User | undefined;
  authenticated: boolean;
  authenticateUser: () => void;
}

export const LoggedInContext = createContext<LoggedInValue>({
  user: undefined,
  authenticated: false,
  authenticateUser: () => {},
});

const LoggedInProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState(false);

  const authenticateUser = () => {
    fetch("/api/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setAuthenticated(result.authenticated);
          setUser(result.user);
        }
      });
  };

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);

  return (
    <LoggedInContext.Provider
      value={{
        user,
        authenticated,
        authenticateUser,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
