import { createContext, useContext, useEffect, useState } from "react";
import { getApi } from "../tools/fetchApi";
import { useRequest } from "ahooks";

export type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
};
export type UserInfo = {
  user?: User;
  token?: string;
  setToken: (token: string | undefined) => void;
};

const UserContext = createContext<UserInfo>({} as any);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: React.PropsWithChildren) {
  const [userToken, setUserToken] = useState<string | undefined>(
    () => localStorage.getItem("token") ?? undefined
  );
  useEffect(() => {
    if (!userToken) localStorage.removeItem("token");
    else localStorage.setItem("token", userToken);
  }, [userToken]);

  const { data: user } = useRequest(
    () => {
      if (!userToken) return Promise.resolve(undefined);
      return getApi("/users/me", userToken) as Promise<User>;
    },
    { refreshDeps: [userToken], onError: () => setUserToken(undefined) }
  );

  return (
    <UserContext.Provider
      value={{ token: userToken, user, setToken: setUserToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
