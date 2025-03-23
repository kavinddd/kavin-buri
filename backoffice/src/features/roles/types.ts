import { RoleNameType } from "@/core/types";

export interface Role {
  id: RoleId;
  name: RoleNameType;
  description: string;
}

export type RoleId = number;
