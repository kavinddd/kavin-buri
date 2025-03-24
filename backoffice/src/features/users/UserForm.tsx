import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormMode } from "@/core/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User, UserId, UserSaveReq } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";

import { Separator } from "@/components/ui/separator";
import { CircleAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { Checkbox } from "@/components/ui/checkbox";
import InputDropdownMulti from "@/components/inputs/InputDropdownMulti";
import { listRoleGroupDropdown } from "../roleGroups/api";

interface FormProps {
  mode: FormMode;
  id?: UserId;
  onSubmit?: (req: UserSaveReq) => void;
  error?: Error;
}

export default function UserForm({ mode, id, onSubmit, error }: FormProps) {
  const navigate = useNavigate();

  const userFormSchema = useMemo(
    () =>
      z
        .object({
          fullName: z.string().trim().nonempty(),
          username: z.string().trim().nonempty(),
          password:
            mode === "EDIT" ? z.string().trim() : z.string().trim().nonempty(),
          confirmPassword:
            mode === "EDIT" ? z.string().trim() : z.string().trim().nonempty(),
          roleGroupIds: z.number().array(),
          isActive: z.boolean(),
        })
        .refine(
          (data) =>
            !data.confirmPassword || data.password === data.confirmPassword,
          {
            message: "Passwords must match",
            path: ["confirmPassword"],
          },
        ),
    [mode],
  );

  type UserFormType = z.infer<typeof userFormSchema>;

  const userFormDefaultValue: UserFormType = useMemo(
    () => ({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      roleGroupIds: [],
      isActive: false,
    }),
    [],
  );

  const {
    data: user,
    isError,
    isLoading,
    error: fetchError,
  } = useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: () => {
      return getUser(id!);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled: mode !== "CREATE" && Boolean(id),
  });

  const defaultValues: UserFormType = useMemo(() => {
    return {
      ...userFormDefaultValue,
      ...user,
      roleGroupIds: user?.roleGroups.map((roleGroup) => roleGroup.id) || [],
    };
  }, [user, userFormDefaultValue]);

  const form = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  if (isError) {
    toast.error(fetchError?.message || "Error while fetching entity");
  }

  function onValidSubmit(formData: UserFormType) {
    const req: UserSaveReq = {
      fullName: formData.fullName,
      username: formData.username,
      password: formData.password,
      isActive: formData.isActive,

      roleGroupIds: formData.roleGroupIds,
    };
    onSubmit?.(req);
  }

  const isReadOnly = mode === "SHOW";

  return (
    <>
      <Card>
        {(error || mode === "EDIT") && (
          <CardHeader className="bg-red-200 text-red-500 text-sm flex flex-row items-center gap-x-10">
            {error && (
              <>
                <div>
                  <CircleAlertIcon size={36} />
                </div>
                <div className="flex-1">
                  {error.message.split("\n").map((err) => (
                    <p key={err}>{`- ${err}`}</p>
                  ))}
                </div>
              </>
            )}

            {mode === "EDIT" && (
              <p>
                {
                  "การอัพเดทไม่จำเป็นต้องกรอก  Password ถ้าไม่ต้องการแก้ไข Password"
                }
              </p>
            )}
          </CardHeader>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValidSubmit)}>
            <CardContent className="p-8 grid grid-cols-3 grid-rows-4 gap-y-4 gap-x-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormLabel>Active</FormLabel>
                      <FormControl>
                        <Checkbox
                          className="h-6 w-6"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isReadOnly}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span />
              <span />

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="roleGroupIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Groups</FormLabel>
                      <FormControl>
                        <InputDropdownMulti
                          value={field.value}
                          onChange={field.onChange}
                          apis={listRoleGroupDropdown}
                          maxCount={5}
                          readOnly={isReadOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <Separator className="my-4" />
            <CardFooter className="justify-between">
              {!isReadOnly && (
                <Button
                  variant="destructive"
                  className="px-6"
                  onClick={() => form.reset()}
                  type="reset"
                  disabled={isLoading}
                >
                  Reset
                </Button>
              )}

              <div className="space-x-4">
                <Button
                  variant="outline"
                  className="px-6"
                  onClick={() => navigate("/user")}
                  type="button"
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                {!isReadOnly && (
                  <Button type="submit" className="px-6" disabled={isLoading}>
                    Submit
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
