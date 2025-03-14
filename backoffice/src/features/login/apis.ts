import { fetchJson } from "@/core/api";

type UserId = number;
interface User {
  id: UserId;
  fullName: string;
  username: string;
  createdAt: string;
  createdBy?: UserId;
  updatedAt: string;
  updatedBy?: UserId;
}

interface LoginReq {
  username: string;
  password: string;
}

export const sessionApis = {
  login: async function (req: LoginReq): Promise<User> {
    return await fetchJson<User>("sessions/login", {
      method: "POST",
      body: JSON.stringify(req),
      credentials: "include",
    });
  },

  me: async function (): Promise<User> {
    return await fetchJson<User>("sessions");
  },
};
