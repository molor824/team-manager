import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  fullName: string;
  email: string;
  phoneNumber?: string;
};
export type UserInfo = {
  user?: User;
  token: string;
  setToken: (token: string) => void;
};

const UserContext = createContext<UserInfo>({} as any);

export function useUser() {
  return useContext(UserContext);
}
export function UserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const [userToken, _setUserToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );
  const setUserToken = (token: string) => {
    if (token === userToken) return;

    if (token === "") localStorage.removeItem("token");
    else localStorage.setItem("token", token);
    _setUserToken(token);
    setUser(undefined);
  };

  useEffect(() => {
    if (userToken === "") return;

    fetch("http://localhost:8080/users/me", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => (res.status < 400 ? res.json() : Promise.reject(res)))
      .then((user) => {
        console.log(user);
        setUser({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
      })
      .catch((err) => {
        console.error(err);
        setUserToken("");
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
