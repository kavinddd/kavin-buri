import { useUser } from "@/features/user/UserProvider";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export default function WithUser({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return children;
}
