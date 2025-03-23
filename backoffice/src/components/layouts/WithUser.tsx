import { useUser } from "@/features/users/UserProvider";
import { ReactNode } from "react";
import { createCookie, Navigate } from "react-router";

export default function WithUser({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
