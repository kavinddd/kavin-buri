import { useNavigate } from "react-router";
import { useUser } from "../users/UserProvider";
import LoginForm, { transformSessionInfoToAuthUser } from "./LoginForm";
import { sessionApis } from "./apis";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) return;
    const fetchUser = async function () {
      try {
        const sessionInfo = await sessionApis.me();
        const fetchedUser = transformSessionInfoToAuthUser(sessionInfo);
        setUser(fetchedUser);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, [user, setUser]);

  if (user) {
    navigate(-2);
    return null;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
