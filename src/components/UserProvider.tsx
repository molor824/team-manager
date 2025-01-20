import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  username: string;
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
  const [userToken, setUserToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );

  useEffect(() => {
    setUser(undefined);
    if (userToken === "") return;

    fetch("http://localhost:8080/users/me", {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => (res.status < 400 ? res.json() : Promise.reject(res)))
      .then((user) => console.log(user))
      .catch((err) => {
        console.error(err);
        setUserToken("");
        localStorage.removeItem("token");
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
