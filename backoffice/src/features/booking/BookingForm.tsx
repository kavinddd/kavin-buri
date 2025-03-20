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
  roomStatusEnum,
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

const bookingFormSchema = z.object({
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
});

type BookingFormType = z.infer<typeof bookingFormSchema>;

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
};

interface FormProps {
  mode: FormMode;
  id?: BookingId;
  onSubmit?: (req: BookingSaveReq) => void;
  error?: Error;
}

// function mapBookingToFormData(booking: Booking): BookingFormType{
//
//   return {
//   roomTypeName: booking.roomType,
//   email: booking.email,
//   contactName: booking.contactName,
//   checkInDate: booking.checkInDate,
//   checkOutDate: booking.checkOutDate,
//   source: booking.source,
//   numChildren: 0,
//   numAdult: 1,
//   roomPrice: 2000,
//   }
//
// }
//
// function mapFormDataToSaveReq() {}

export default function BookingForm({ mode, id, onSubmit, error }: FormProps) {
  const navigate = useNavigate();

  const {
    data: booking,
    isError,
    isLoading,
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
    toast.error(fetchError?.message || "Error while etching entity");
  }

  function onValidSubmit(formData: BookingFormType) {
    onSubmit?.(formData as BookingSaveReq);
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
                      readOnly={isReadOnly}
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
                      readOnly={isReadOnly}
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
                      readOnly={isReadOnly}
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
                      readOnly={isReadOnly}
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
                      readOnly={isReadOnly}
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
                      <Input type="text" readOnly={isReadOnly} {...field} />
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
                      <Input type="text" readOnly={isReadOnly} {...field} />
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
                      <Input type="email" readOnly={isReadOnly} {...field} />
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
                      readOnly={isReadOnly}
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
                      readOnly={isReadOnly}
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
                    <div className="flex mt-4 gap-2 items-center">
                      <FormLabel>Incl. ABF</FormLabel>
                      <Checkbox
                        className="h-6 w-6"
                        checked={field.value}
                        onCheckedChange={
                          isReadOnly ? undefined : field.onChange
                        }
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
                    <div className="flex mt-4 gap-2 items-center">
                      <FormLabel>Incl. Transportation</FormLabel>
                      <Checkbox
                        className="h-6 w-6"
                        checked={field.value}
                        onCheckedChange={
                          isReadOnly ? undefined : field.onChange
                        }
                      />
                      <FormMessage />
                    </div>
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
                  onClick={() => navigate("/booking")}
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
