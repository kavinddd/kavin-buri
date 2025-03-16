import { Navigate } from "react-router";
import { useUser } from "../user/UserProvider";
import LoginForm, { transformSessionInfoToAuthUser } from "./LoginForm";
import { sessionApis } from "./apis";

export default function LoginPage() {
  const { user, setUser } = useUser();

  if (!user) {
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
  }

  if (user) return <Navigate to="/" />;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
