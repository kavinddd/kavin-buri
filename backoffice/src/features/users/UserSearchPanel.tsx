import { z } from "zod";
import { BookingSearch as userSearch } from "./types";
import { bookingSourceEnum, bookingStatusEnum } from "@/core/enums";
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
import { cleanForm } from "@/core/utils";
import { InputEnumBoolean } from "@/components/inputs/InputEnumBoolean";
import InputDropdownMulti from "@/components/inputs/InputDropdownMulti";
import { listRoleGroupDropdown } from "../roleGroups/api";

const searchFormSchema = z.object({
  fullName: z.string().optional(),
  username: z.string().optional(),
  isActive: z.boolean().optional(),
  roleGroupIds: z.number().array(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;

const searchFormDefaultValue: SearchFormType = {
  fullName: "",
  username: "",
  isActive: undefined,
  roleGroupIds: [],
};

interface Props {
  defaultSearch: userSearch;
  onSubmit: (search: userSearch) => void;
}

export default function UserSearchPanel({ defaultSearch, onSubmit }: Props) {
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
      onSubmit(cleanForm(formData) as userSearch);
    },
    [onSubmit],
  );

  useEffect(() => {
    form.reset(defaultValues);
    onValidSubmit(defaultValues as userSearch);
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
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roleGroupIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Group</FormLabel>
                      <FormControl>
                        <InputDropdownMulti
                          apis={listRoleGroupDropdown}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active</FormLabel>
                      <FormControl>
                        <InputEnumBoolean
                          value={field.value}
                          onChange={field.onChange}
                        />
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
