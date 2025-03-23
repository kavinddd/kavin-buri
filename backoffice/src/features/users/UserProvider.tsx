import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { sessionApis } from "../login/apis";
import { toast } from "sonner";
import { AuthUser } from "../login/types";

interface UserContextValue {
  user?: AuthUser;
  setUser: React.Dispatch<AuthUser | undefined>;
  logout: () => void;
}

const defaultUserContextValue: UserContextValue = {
  setUser: () => null,
  logout: () => null,
};

const UserContext = createContext<UserContextValue>(defaultUserContextValue);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>();

  const logout = useCallback(() => {
    sessionApis
      .logout()
      .then(() => {
        setUser(undefined);
        toast("Logout successfully");
      })
      .catch((e) => {
        toast(e.message);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
