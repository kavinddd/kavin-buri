import { z } from "zod";
import { BookingSearch } from "./types";
import {
  bookingSourceEnum,
  bookingStatusEnum,
  roomTypeNameEnum,
} from "@/core/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import InputDate from "@/components/inputs/InputDate";
import InputNumber from "@/components/inputs/InputNumber";
import InputEnum from "@/components/inputs/InputEnum";
import { cleanForm } from "@/core/utils";

const searchFormSchema = z.object({
  email: z.string().optional(),
  contactName: z.string().optional(),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
  roomPrice: z.number().positive().optional(),
  numAdult: z.number().positive().optional(),
  numChildren: z.number().positive().optional(),
  source: z.enum(bookingSourceEnum).optional(),
  status: z.enum(bookingStatusEnum).optional(),

  roomTypeName: z.enum(roomTypeNameEnum).optional(),
  roomCode: z.string().trim().optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

const searchFormDefaultValue: SearchFormType = {
  email: "",
  contactName: "",
  checkInDate: undefined, // or new Date() if you want a default date
  checkOutDate: undefined, // or new Date()
  roomPrice: undefined, // or undefined if your form can handle it
  numAdult: undefined, // or undefined
  numChildren: undefined, // or undefined
  source: undefined, // or a default enum value like bookingSourceEnum[0]
  status: undefined, // or a default enum value like bookingStatusEnum[0]};
  roomTypeName: undefined,
  roomCode: "",
};

interface Props {
  defaultSearch: BookingSearch;
  onSubmit: (search: BookingSearch) => void;
}

export default function BookingSearchPanel({ defaultSearch, onSubmit }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const defaultValues: SearchFormType = useMemo(() => {
    return {
      ...searchFormDefaultValue,
      ...(defaultSearch as SearchFormType),
    };
  }, [defaultSearch]);

  const form = useForm<SearchFormType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: defaultValues,
  });

  const onValidSubmit = useCallback(
    (formData: SearchFormType) => {
      onSubmit(cleanForm(formData) as BookingSearch);
    },
    [onSubmit],
  );

  useEffect(() => {
    form.reset(defaultValues);
    onValidSubmit(defaultValues as BookingSearch);
  }, [form, onValidSubmit, defaultValues]);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-4 cursor-pointer hover:bg-muted">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between items-center ">
              <p className="text-muted-foreground text-sm">Advanced Search</p>
              <Button variant="ghost" className="text-primary">
                {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Button>
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onValidSubmit)}>
              <CardContent className="m-0 mt-2 grid grid-cols-3 xl:grid-cols-6 gap-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                        <Input type="email" {...field} />
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
                      <FormLabel>Check-In</FormLabel>
                      <InputDate
                        onChange={field.onChange}
                        value={field.value}
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
                      <FormLabel>Check-Out</FormLabel>
                      <InputDate
                        onChange={field.onChange}
                        value={field.value}
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
                        enums={roomTypeNameEnum}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <InputEnum
                        enums={bookingStatusEnum}
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roomCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Code</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="justify-end space-x-4">
                <Button
                  type="reset"
                  variant="outline"
                  className="px-6"
                  onClick={() => form.reset(defaultValues)}
                >
                  Reset
                </Button>

                <Button type="submit" className="px-10">
                  <SearchIcon />
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
