import { createContext, ReactNode, useContext, useState } from "react";

type Role = string;
interface User {
  name: string;
  roles: Role[];
}

interface UserContextValue {
  user?: User;
  setUser: React.Dispatch<User | undefined>;
}

const defaultUserContextValue: UserContextValue = {};

const UserContext = createContext<UserContextValue>(defaultUserContextValue);

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
