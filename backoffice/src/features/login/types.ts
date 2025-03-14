import { User } from "../user/UserProvider";

export interface SessionInfo {
  user: User;
  roles: string[];
}
