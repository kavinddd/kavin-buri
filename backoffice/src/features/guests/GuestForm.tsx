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
import { Guest, GuestId, GuestSaveReq } from "./types";
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
import { getGuest } from "./api";
import InputDate from "@/components/inputs/InputDate";

const guestFormSchema = z.object({
  citizenId: z.string().trim().nonempty(),
  firstName: z.string().trim().nonempty(),
  lastName: z.string().trim().nonempty(),
  nationality: z.string().trim().nonempty(),
  dateOfBirth: z.date(),
});

type GuestFormType = z.infer<typeof guestFormSchema>;

const guestFormDefaultValue: GuestFormType = {
  citizenId: "",
  firstName: "",
  lastName: "",
  nationality: "",
  dateOfBirth: new Date(),
};

interface FormProps {
  mode: FormMode;
  id?: GuestId;
  onSubmit?: (req: GuestSaveReq) => void;
  error?: Error;
}

export default function GuestForm({ mode, id, onSubmit, error }: FormProps) {
  const navigate = useNavigate();

  const {
    data: guest,
    isError,
    isLoading,
    error: fetchError,
  } = useQuery<Guest, Error>({
    queryKey: ["guests", id],
    queryFn: () => {
      return getGuest(id!);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled: mode !== "CREATE" && Boolean(id),
  });

  const defaultValues: GuestFormType = useMemo(() => {
    return {
      ...guestFormDefaultValue,
      ...guest,
      dateOfBirth: guest
        ? new Date(guest.dateOfBirth)
        : guestFormDefaultValue.dateOfBirth,
    };
  }, [guest]);
  console.log(defaultValues);

  const form = useForm<GuestFormType>({
    resolver: zodResolver(guestFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  if (isError) {
    toast.error(fetchError?.message || "Error while fetching entity");
  }

  function onValidSubmit(formData: GuestFormType) {
    onSubmit?.(formData as GuestSaveReq);
  }

  const isReadOnly = mode === "SHOW";

  console.log(form.watch());

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
                name="citizenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Citizen Id</FormLabel>
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
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
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <InputDate
                        value={field.value}
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
                  onClick={() => navigate("/guest")}
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
