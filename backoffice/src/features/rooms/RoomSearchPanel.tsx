import { z } from "zod";
import { roomStatusEnum, roomTypeNameEnum } from "@/core/enums";
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
import InputNumber from "@/components/inputs/InputNumber";
import InputEnum from "@/components/inputs/InputEnum";
import { cleanForm } from "@/core/utils";
import { RoomSearch } from "./types";

const searchFormSchema = z.object({
  code: z.string().max(3).optional(),
  status: z.enum(roomStatusEnum).optional(),
  floorNo: z.number().min(2).optional(),
  roomTypeName: z.enum(roomTypeNameEnum).optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

const searchFormDefaultValue: SearchFormType = {
  code: "",
  floorNo: undefined,
  status: undefined,
  roomTypeName: undefined,
};

interface Props {
  defaultSearch: RoomSearch;
  onSubmit: (search: RoomSearch) => void;
}

export default function RoomSearchPanel({ defaultSearch, onSubmit }: Props) {
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
      onSubmit(cleanForm(formData) as RoomSearch);
    },
    [onSubmit],
  );

  useEffect(() => {
    form.reset(defaultValues);
    onValidSubmit(defaultValues as RoomSearch);
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
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
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
                      <FormControl>
                        <InputNumber
                          value={field.value}
                          onChange={field.onChange}
                          min={2}
                          max={6}
                        />
                      </FormControl>
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
                        enums={roomStatusEnum}
                        value={field.value}
                        onChange={field.onChange}
                      />
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
