import { createContext, useContext, useEffect, useState } from "react";
import { getApi } from "../tools/fetchApi";

export type User = {
  fullName: string;
  email: string;
  phoneNumber?: string;
};
export type UserInfo = {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
};

const UserContext = createContext<UserInfo>({} as any);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, _setUserToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const setUserToken = (token: string | null) => {
    if (token === userToken) return;

    if (!token) localStorage.removeItem("token");
    else localStorage.setItem("token", token);
    _setUserToken(token);
    setUser(null);
  };

  useEffect(() => {
    if (userToken === "") return;

    getApi("/users/me", userToken)
      .then((user) => {
        setUser({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
      })
      .catch((err) => {
        console.error(err);
        setUserToken(null);
      });
  }, [userToken]);

  return (
    <UserContext.Provider
      value={{ token: userToken, user, setToken: setUserToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
