import { Role } from "@/core/typeAliases";

export interface SessionInfo {
  user: User;
  roles: string[];
}

export interface AuthUser {
  username: string;
  roles: Role[];
}

type UserId = number;

export interface User {
  id: UserId;
  fullName: string;
  username: string;
  createdAt: string;
  createdBy?: UserId;
  updatedAt: string;
  updatedBy?: UserId;
}

export interface LoginReq {
  username: string;
  password: string;
}
