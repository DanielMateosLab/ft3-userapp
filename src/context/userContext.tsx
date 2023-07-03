import { useFetch } from "@/services/appFetch";
import { UserWithoutPassword } from "@/types/user";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  FC,
} from "react";

interface IUserContext {
  user: UserWithoutPassword | undefined;
  setUser: (user: UserWithoutPassword | undefined) => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserWithoutPassword>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UserFetcher>{children}</UserFetcher>
    </UserContext.Provider>
  );
};

const UserFetcher: FC<PropsWithChildren> = ({ children }) => {
  const { appFetch } = useFetch();
  const { setUser } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedIn = Cookies.get("loggedIn");
      if (loggedIn) {
        const res = await appFetch("/api/users/me");
        if (res?.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      }
    };
    fetchUserData();
  }, [setUser, appFetch]);

  return <>{children}</>;
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
