import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { roomStatusEnum, roomTypeNameEnum } from "@/core/enums";
import { FormMode } from "@/core/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Room, RoomId, RoomSaveReq } from "./types";
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
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";

import { Separator } from "@/components/ui/separator";
import { CircleAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "./api";

const roomFormSchema = z.object({
  code: z.string().trim().nonempty(),
  status: z.enum(roomStatusEnum),
  floorNo: z.number().min(2).max(6),
  roomTypeName: z.enum(roomTypeNameEnum),
});

type RoomFormType = z.infer<typeof roomFormSchema>;

const roomFormDefaultValue: RoomFormType = {
  code: "",
  status: "OUT_OF_SERVICE",
  floorNo: 2,
  roomTypeName: "SUITE",
};

interface FormProps {
  mode: FormMode;
  id?: RoomId;
  onSubmit?: (req: RoomSaveReq) => void;
  error?: Error;
}

export default function RoomForm({ mode, id, onSubmit, error }: FormProps) {
  const navigate = useNavigate();

  const {
    data: room,
    isError,
    isLoading,
    error: fetchError,
  } = useQuery<Room, Error>({
    queryKey: ["rooms", id],
    queryFn: () => {
      return getRoom(id!);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled: mode !== "CREATE" && Boolean(id),
  });

  const defaultValues: RoomFormType = useMemo(() => {
    return {
      ...roomFormDefaultValue,
      ...room,
      roomTypeName: room?.roomType.name || roomFormDefaultValue.roomTypeName,
    };
  }, [room]);

  const form = useForm<RoomFormType>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  if (isError) {
    toast.error(fetchError?.message || "Error while fetching entity");
  }

  function onValidSubmit(formData: RoomFormType) {
    onSubmit?.(formData as RoomSaveReq);
  }

  const isReadOnly = mode === "SHOW";

  console.log(form.formState.errors);

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
                    <InputEnum
                      value={field.value}
                      enums={roomStatusEnum}
                      onChange={field.onChange}
                      readOnly={isReadOnly}
                    />

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
                name="roomTypeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type </FormLabel>
                    <InputEnum
                      enums={roomTypeNameEnum}
                      value={field.value}
                      onChange={field.onChange}
                      readOnly={true}
                    />

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
                  onClick={() => navigate("/room")}
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
