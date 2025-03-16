import { fetchJson, fetchVoid } from "@/core/api";
import { LoginReq, SessionInfo } from "./types";

const sessionEndpoint = "sessions";

export const sessionApis = {
  login: async function (req: LoginReq): Promise<SessionInfo> {
    return await fetchJson<SessionInfo>(`${sessionEndpoint}/login`, {
      method: "POST",
      body: JSON.stringify(req),
    });
  },

  me: async function (): Promise<SessionInfo> {
    return await fetchJson<SessionInfo>(`${sessionEndpoint}`);
  },

  logout: async function (): Promise<void> {
    return await fetchVoid(`${sessionEndpoint}/logout`);
  },
};
