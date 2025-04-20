import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FormMode } from "@/core/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RoleGroup, RoleGroupId, RoleGroupSaveReq } from "./types";
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
import { getRoleGroup } from "./api";
import { roleNameEnum } from "@/core/enums";
import InputEnumMulti from "@/components/inputs/InputEmumMulti";

const roleGroupFormSchema = z.object({
  name: z.string().trim().nonempty(),
  roles: z.enum(roleNameEnum).array(),
});

type RoleGroupFormType = z.infer<typeof roleGroupFormSchema>;

const roleGroupFormDefaultValue: RoleGroupFormType = {
  name: "",
  roles: [],
};

interface FormProps {
  mode: FormMode;
  id?: RoleGroupId;
  onSubmit?: (req: RoleGroupSaveReq) => void;
  error?: Error;
}

export default function RoleGroupForm({
  mode,
  id,
  onSubmit,
  error,
}: FormProps) {
  const navigate = useNavigate();

  const {
    data: roleGroup,
    isError,
    isLoading,
    error: fetchError,
  } = useQuery<RoleGroup, Error>({
    queryKey: ["roleGroups", id],
    queryFn: () => {
      return getRoleGroup(id!);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled: mode !== "CREATE" && Boolean(id),
  });

  const defaultValues: RoleGroupFormType = useMemo(() => {
    return {
      ...roleGroupFormDefaultValue,
      ...roleGroup,
      roles: roleGroup?.roles?.map((role) => role.name) || [],
    };
  }, [roleGroup]);

  const form = useForm<RoleGroupFormType>({
    resolver: zodResolver(roleGroupFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  if (isError) {
    toast.error(fetchError?.message || "Error while fetching entity");
  }

  function onValidSubmit(formData: RoleGroupFormType) {
    onSubmit?.(formData as RoleGroupSaveReq);
  }

  const isReadOnly = mode === "SHOW";

  console.log(form.watch("roles"));

  return (
    <>
      <Card>
        {error && (
          <CardHeader className="bg-red-200 text-red-500 text-sm flex flex-row items-center gap-x-10">
            <div>
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
            <CardContent className="p-8 grid grid-cols-3 gap-y-4 gap-x-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
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
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <InputEnumMulti
                        value={field.value}
                        enums={roleNameEnum}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
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
                  onClick={() => navigate("/roleGroup")}
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
