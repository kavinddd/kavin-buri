import { RoleNameType } from "@/core/types";
import { Role } from "../roles/types";

export interface SessionInfo {
  user: User;
  roles: Role[];
}

export interface AuthUser {
  username: string;
  roles: RoleNameType[];
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
