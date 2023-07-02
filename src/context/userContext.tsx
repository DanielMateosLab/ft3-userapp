import { UserWithoutPassword } from "@/types/user";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IUserContext {
  user: UserWithoutPassword | undefined;
  setUser: (user: UserWithoutPassword | undefined) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserWithoutPassword>();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedIn = Cookies.get("loggedIn");
      if (loggedIn) {
        try {
          const res = await fetch("/api/user");
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            Cookies.remove("loggedIn");
          }
        } catch (err) {
          console.log(err); // TODO: implement real error handling
        }
      }
    };
    fetchUserData();
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
