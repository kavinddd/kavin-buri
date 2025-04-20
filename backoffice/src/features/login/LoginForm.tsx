import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useUser } from "../users/UserProvider";
import { sessionApis } from "./apis";
import { AuthUser, SessionInfo } from "./types";
import logo from "@/assets/images/logo.jpg";
import logoWide from "@/assets/images/logo-wide.png";

const formSchema = z.object({
  username: z.string().min(5, "Username must be at least 6 characters."),
  password: z.string().min(5, "Password must be at least 6 characters."),
});

// type FormSchemaType = z.infer<typeof formSchema>;
//
export function transformSessionInfoToAuthUser(
  sessionInfo: SessionInfo,
): AuthUser {
  return {
    username: sessionInfo.user.username,
    roles: sessionInfo.roles.map((role) => role.name),
  };
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin",
      password: "admin",
    },
  });

  const navigate = useNavigate();

  function onSubmit(formData: z.infer<typeof formSchema>) {
    const { username, password } = formData;

    sessionApis
      .login({
        username,
        password,
      })
      .then((sessionInfo: SessionInfo) => {
        const user = transformSessionInfoToAuthUser(sessionInfo);
        setUser(user);
        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((err: Error) => {
        toast.error(`Login Failed: ${err.message}`);
      });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative hidden bg-muted md:block">
                    <img
                      src={logoWide}
                      alt="Image"
                      className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                  <h1 className="text-2xl font-bold">Back Office</h1>
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src={logo}
                alt="Logo"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
