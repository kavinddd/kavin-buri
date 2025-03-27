import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  bookingSourceEnum,
  bookingStatusEnum,
  roomTypeNameEnum,
} from "@/core/enums";
import { FormMode } from "@/core/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Booking, BookingId, BookingSaveReq } from "./types";
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
import { getBooking } from "./api";
import { Checkbox } from "@/components/ui/checkbox";
import GuestListFormTable from "./GuestListFormTable";
import InputDropdown from "@/components/inputs/InputDropdown";
import { listRoomDropdown } from "../rooms/api";

const bookingFormSchema = z
  .object({
    roomTypeName: z.enum(roomTypeNameEnum),

    email: z.string().trim().nonempty(),
    contactName: z.string().trim().nonempty(),
    contactNumber: z.string().trim().nonempty(),

    checkInDate: z.date(),
    checkOutDate: z.date(),

    source: z.enum(bookingSourceEnum),
    status: z.enum(bookingStatusEnum),

    roomPrice: z.number().positive(),
    numAdult: z.number().positive(),
    numChildren: z.number().min(0),

    hasAbf: z.boolean(),
    hasTransportation: z.boolean(),

    guests: z
      .object({
        citizenId: z.string().trim().nonempty(),
        firstName: z.string().trim().nonempty(),
        lastName: z.string().trim().nonempty(),
        nationality: z.string().trim().nonempty(),
        dateOfBirth: z.date(),
      })
      .array(),

    roomId: z.number().min(0).optional(),
  })
  .refine((data) => data.checkOutDate > data.checkInDate, {
    message: "Check-out date must be after check-in date",
    path: ["checkOutDate"], // Point the error to the checkOutDate field
  });
export type BookingFormType = z.infer<typeof bookingFormSchema>;

const bookingFormDefaultValue: BookingFormType = {
  roomTypeName: "SUPERIOR_TWIN",
  email: "",
  contactName: "",
  contactNumber: "",
  checkInDate: new Date(),
  checkOutDate: addDays(new Date(), 1),

  source: "WALK-IN",
  status: "RESERVED",

  numChildren: 0,
  numAdult: 1,
  roomPrice: 2000,
  hasAbf: false,
  hasTransportation: false,

  guests: [],
};

interface FormProps {
  mode: FormMode;
  id?: BookingId;
  onSubmit?: (req: BookingSaveReq) => void;
  error?: Error;
  isLoading?: boolean;
  showRoom?: boolean;
  showGuests?: boolean;
}

export default function BookingForm({
  mode,
  id,
  onSubmit,
  error,
  isLoading = false,
  showRoom = false,
  showGuests = false,
}: FormProps) {
  const navigate = useNavigate();

  const {
    data: booking,
    isError,
    isFetching,
    error: fetchError,
  } = useQuery<Booking, Error>({
    queryKey: ["bookings", id],
    queryFn: () => {
      return getBooking(id!);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled: mode !== "CREATE" && Boolean(id),
  });

  const defaultValues: BookingFormType = useMemo(() => {
    const guests =
      booking?.guests?.map((guest) => ({
        ...guest,
        dateOfBirth: new Date(guest.dateOfBirth),
      })) || [];
    return {
      ...bookingFormDefaultValue,
      ...booking,
      roomTypeName: booking?.roomType?.name
        ? booking.roomType.name
        : bookingFormDefaultValue.roomTypeName,
      checkInDate: booking
        ? new Date(booking?.checkInDate)
        : bookingFormDefaultValue.checkInDate,
      checkOutDate: booking
        ? new Date(booking?.checkOutDate)
        : bookingFormDefaultValue.checkOutDate,
      guests: guests,
      roomId: booking?.room?.id,
    };
  }, [booking]);

  const form = useForm<BookingFormType>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  if (isError) {
    toast.error(fetchError?.message || "Error while fetching entity");
  }

  function onValidSubmit(formData: BookingFormType) {
    const req: BookingSaveReq = {
      ...formData,
    };
    onSubmit?.(req);
  }

  const isReadOnly = mode === "SHOW";

  const [numAdults, numChildrens] = form.watch(["numAdult", "numChildren"]);
  const maxGuests = numAdults + numChildrens;

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
            <CardContent className="p-8 ">
              <div className="grid grid-cols-3 grid-rows-4 gap-y-4 gap-x-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <InputEnum
                        value={field.value}
                        enums={bookingStatusEnum}
                        onChange={field.onChange}
                        readOnly={true}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <InputEnum
                        value={field.value}
                        enums={bookingSourceEnum}
                        onChange={field.onChange}
                        readOnly={isReadOnly || isFetching || isLoading}
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
                      <FormLabel>Room Type</FormLabel>
                      <InputEnum
                        value={field.value ?? ""}
                        enums={roomTypeNameEnum}
                        onChange={field.onChange}
                        readOnly={isReadOnly || isFetching || isLoading}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in Date</FormLabel>
                      <InputDate
                        onChange={field.onChange}
                        value={field.value}
                        readOnly={isReadOnly || isFetching || isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOutDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out Date</FormLabel>
                      <InputDate
                        onChange={field.onChange}
                        value={field.value}
                        readOnly={isReadOnly || isFetching || isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Price</FormLabel>
                      <InputNumber
                        onChange={field.onChange}
                        value={field.value}
                        readOnly={isReadOnly || isFetching || isLoading}
                        min={0}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          readOnly={isReadOnly || isFetching || isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          readOnly={isReadOnly || isFetching || isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          readOnly={isReadOnly || isFetching || isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numAdult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel># Adult</FormLabel>
                      <InputNumber
                        onChange={field.onChange}
                        value={field.value}
                        readOnly={isReadOnly || isFetching || isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel># Children</FormLabel>
                      <InputNumber
                        onChange={field.onChange}
                        value={field.value}
                        readOnly={isReadOnly || isFetching || isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <span />

                <FormField
                  control={form.control}
                  name="hasAbf"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 items-center">
                        <FormLabel>Incl. ABF</FormLabel>
                        <Checkbox
                          className="h-6 w-6"
                          checked={field.value}
                          onCheckedChange={
                            isReadOnly ? undefined : field.onChange
                          }
                          disabled={isReadOnly || isFetching || isLoading}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasTransportation"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex  gap-2 items-center">
                        <FormLabel>Incl. Transportation</FormLabel>
                        <Checkbox
                          className="h-6 w-6"
                          checked={field.value}
                          onCheckedChange={
                            isReadOnly ? undefined : field.onChange
                          }
                          disabled={isReadOnly || isFetching || isLoading}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <span />

                {showRoom && (
                  <FormField
                    control={form.control}
                    name="roomId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room</FormLabel>
                        <InputDropdown
                          value={field.value}
                          onChange={field.onChange}
                          apis={listRoomDropdown}
                          apiKey="rooms"
                          search={{
                            roomTypeName: form.watch("roomTypeName"),
                            status: "AVAILABLE",
                          }}
                          readOnly={isReadOnly}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              {showGuests && (
                <>
                  <Separator className="my-8 w-80 mx-auto" />
                  <p className="text-primary">Guests</p>
                  <GuestListFormTable
                    form={form}
                    isReadOnly={isReadOnly}
                    isLoading={isFetching || isLoading}
                    max={maxGuests}
                  />
                </>
              )}
            </CardContent>

            <Separator className="my-4" />
            <CardFooter className="justify-between">
              {!isReadOnly && (
                <Button
                  variant="destructive"
                  className="px-6"
                  onClick={() => form.reset()}
                  type="reset"
                  disabled={isLoading || isFetching}
                >
                  Reset
                </Button>
              )}

              <div className="space-x-4">
                <Button
                  variant="outline"
                  className="px-6"
                  onClick={() => navigate("/booking")}
                  type="button"
                  disabled={isLoading || isFetching}
                >
                  Cancel
                </Button>

                {!isReadOnly && (
                  <Button
                    type="submit"
                    className="px-6"
                    disabled={isLoading || isFetching}
                  >
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
