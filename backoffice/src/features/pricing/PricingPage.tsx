import InputEnum from "@/components/inputs/InputEnum";
import InputNumber from "@/components/inputs/InputNumber";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { roomTypeNameEnum } from "@/core/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDaysInMonth } from "date-fns";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { DayContentProps } from "react-day-picker";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  PricingGetReq,
  PricingSaveReq,
  RoomTypePrice,
  RoomTypePriceId,
} from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { createPricing, getPricing } from "./apis";
import { toast } from "sonner";

const pricingFormSchema = z.object({
  year: z.number().int(),
  month: z.number().int().min(1).max(12),
  roomTypeName: z.enum(roomTypeNameEnum),

  roomPrices: z
    .object({
      day: z.number().int().min(1).max(31),
      price: z.number().int().optional(),
    })
    .array(),
});

type PricingFormSchema = z.infer<typeof pricingFormSchema>;

export default function PricingPage() {
  const queryClient = useQueryClient();

  const defaultValues: PricingFormSchema = useMemo(() => {
    const today = new Date();
    const days = getDaysInMonth(today);

    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      roomTypeName: "SUPERIOR_TWIN",
      roomPrices: Array.from({ length: days }).map((_, idx) => ({
        day: idx + 1,
        price: undefined,
      })),
    };
  }, []);

  const form = useForm<PricingFormSchema>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: defaultValues,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [month, year, roomTypeName, roomPrices] = form.watch([
    "month",
    "year",
    "roomTypeName",
    "roomPrices",
  ]);

  const setMonth = useCallback(
    (date: Date) => {
      form.setValue("month", date.getMonth() + 1);

      if (year !== date.getFullYear())
        form.setValue("year", date.getFullYear());
    },
    [form, year],
  );

  const {
    data: roomTypePrices,
    isLoading,
    isError,
    error,
  } = useQuery<RoomTypePrice[], Error>({
    queryKey: ["roomTypePrices", month, year, roomTypeName],
    queryFn: () => {
      const req: PricingGetReq = {
        month,
        year,
        roomTypeName,
      };
      return getPricing(req);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    enabled:
      month !== undefined && year !== undefined && roomTypeName !== undefined,
  });

  useEffect(() => {
    const year = form.getValues("year");
    const month = form.getValues("month");
    const days = getDaysInMonth(new Date(year, month - 1, 1));

    if (roomTypePrices === undefined || roomTypePrices.length === 0) {
      form.reset({
        ...form.getValues(),
        roomPrices: Array.from({ length: days }).map((_, idx) => ({
          day: idx + 1,
          price: undefined,
        })),
      });
      return;
    }

    form.reset({
      ...form.getValues(),
      roomPrices: roomTypePrices?.map((roomTypePrice) => ({
        day: new Date(roomTypePrice.date).getDate(),
        price: roomTypePrice.price,
      })),
    });
  }, [defaultValues.roomPrices, form, roomTypePrices]);

  const {
    mutate,
    isPending,
    error: errorMutate,
    isError: isErrorMutate,
  } = useMutation<RoomTypePriceId[], Error, PricingSaveReq>({
    mutationFn: (req: PricingSaveReq) => createPricing(req),
    onSuccess: () => {
      toast.success("Room is succesfully updated.");

      queryClient.invalidateQueries({
        queryKey: ["roomTypePrices", month, year, roomTypeName],
      });

      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Error updating pricing:", error.message);
      toast.error(error.message);
    },
  });

  if (isError) toast.error(error.message);
  if (isErrorMutate) toast.error(errorMutate.message);

  const onValidSubmit = useCallback(
    (formData: PricingFormSchema) => {
      console.log("valid submit");
      const req: PricingSaveReq = {
        month: formData.month,
        year: formData.year,
        roomTypeName: formData.roomTypeName,
        roomPrices: formData.roomPrices.filter(
          (it) => it.price !== undefined,
        ) as {
          day: number;
          price: number;
        }[],
      };
      mutate(req);
    },
    [mutate],
  );

  const memoCalendar = useMemo(
    () => (
      <Calendar
        initialFocus
        classNames={{
          root: "w-full  overflow-hidden",
          caption_start: "w-full",
          head_cell: "w-full text-sm md:text-md",
          cell: `w-full overflow-hidden border-[0.5px] hover:bg-primary `,
          row: "flex w-full",
          day: "w-full h-20 flex flex-col justify-center",
          day_selected: "bg-primary text-white",
          day_range_middle: "bg-primary text-white brightness-125",
        }}
        components={{
          DayContent: (props) => (
            <DayContent
              {...props}
              form={form}
              currentMonth={month}
              currentYear={year}
              readOnly={!isEditing || isLoading || isPending}
            />
          ),
        }}
        onMonthChange={setMonth}
        month={new Date(year, month - 1, 1)}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, isEditing, isLoading, isPending, month, setMonth, year, roomPrices], // roomTypePrice is set explicitly, otherwise, it won't rerender properly, so including this ensuring it re-renders every fetching
  );

  return (
    <Card className="max-w-screen-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit)}>
          <CardHeader>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <InputNumber
                      value={field.value}
                      onChange={field.onChange}
                      min={defaultValues.year}
                      readOnly={isLoading || isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <InputNumber
                      value={field.value}
                      onChange={field.onChange}
                      min={defaultValues.month}
                      readOnly={isLoading || isPending}
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
                      value={field.value}
                      onChange={field.onChange}
                      enums={roomTypeNameEnum}
                      readOnly={isLoading || isPending}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardHeader>

          <CardContent>{memoCalendar}</CardContent>

          <CardFooter>
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                type="button"
                disabled={isLoading || isPending}
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>

              <div className="text-end flex gap-2">
                {isEditing && (
                  <>
                    <Button type="submit" disabled={isLoading || isPending}>
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

function DayContent({
  form,
  currentYear,
  currentMonth,
  readOnly,
  ...props
}: DayContentProps & {
  form: UseFormReturn<PricingFormSchema>;
  currentYear: number;
  currentMonth: number;
  readOnly?: boolean;
}) {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();

  const isSameYearAndMonth = year === currentYear && month === currentMonth;

  if (!isSameYearAndMonth)
    return <p className="text-xs text-muted-foreground text-center">{day}</p>;

  return <InputDay {...props} form={form} day={day} readOnly={readOnly} />;
}

function InputDay({
  form,
  day,
  readOnly,
  ...props
}: DayContentProps & {
  day: number;
  form: UseFormReturn<PricingFormSchema>;
  readOnly?: boolean;
}) {
  return (
    <FormField
      key={props.date.toString()}
      control={form.control}
      name={`roomPrices.${day - 1}.price`}
      render={({ field }) => (
        <FormItem>
          <div className="p-2">
            <FormLabel className="text-text-primary ">{day}</FormLabel>
            <InputNumber
              value={field.value}
              onChange={field.onChange}
              min={0}
              readOnly={readOnly}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
