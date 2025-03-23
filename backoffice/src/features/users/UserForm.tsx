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
import InputNumber from "@/components/inputs/InputNumber";
import InputEnum from "@/components/inputs/InputEnum";
import InputDate from "@/components/inputs/InputDate";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";

import { addDays } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { CircleAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";
import { Checkbox } from "@/components/ui/checkbox";

const userFormSchema = z.object({
  code: z.string().trim().nonempty(),
  status: z.string().trim().nonempty(),
  floorNo: z.number().min(2).max(6),
});

type UserFormType = z.infer<typeof userFormSchema>;

const userFormDefaultValue: UserFormType = {
  code: "",
  status: "",
  floorNo: 2,
};

interface FormProps {
  mode: FormMode;
  id?: UserId;
  onSubmit?: (req: UserSaveReq) => void;
  error?: Error;
}

export default function UserForm({ mode, id, onSubmit, error }: FormProps) {
  const navigate = useNavigate();

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
    };
  }, [user]);

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
    onSubmit?.(formData as UserSaveReq);
  }

  const isReadOnly = mode === "SHOW";

  return (
    <>
      <Card>
        {error && (
          <CardHeader className="bg-red-200 text-red-500 text-sm flex flex-row items-center gap-x-10">
            <div className="">
              <CircleAlertIcon size={36} />
            </div>
            <div className="flex-1">
              {error.message.split("\n").map((err) => (
                <p key={err}>{`- ${err}`}</p>
              ))}
            </div>
          </CardHeader>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onValidSubmit)}>
            <CardContent className="p-8 grid grid-cols-3 grid-rows-4 gap-y-4 gap-x-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      readOnly={true}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floorNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor No.</FormLabel>
                    <InputNumber
                      value={field.value}
                      onChange={field.onChange}
                      readOnly={true}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type </FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
