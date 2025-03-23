import { z } from "zod";
import { RoleGroupSearch } from "./types";
import { roleNameEnum } from "@/core/enums";
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
import InputEnumMulti from "@/components/inputs/InputEmumMulti";

const searchFormSchema = z.object({
  name: z.string().optional(),
  roles: z.enum(roleNameEnum).array().optional(),
});

type SearchFormType = z.infer<typeof searchFormSchema>;
const searchFormDefaultValue: SearchFormType = {
  name: "",
  roles: [],
};

interface Props {
  defaultSearch: RoleGroupSearch;
  onSubmit: (search: RoleGroupSearch) => void;
}

export default function RoleGroupSearchPanel({
  defaultSearch,
  onSubmit,
}: Props) {
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
      onSubmit(cleanForm(formData) as RoleGroupSearch);
    },
    [onSubmit],
  );

  useEffect(() => {
    form.reset(defaultValues);
    onValidSubmit(defaultValues);
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
              <CardContent className="m-0 mt-2 grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                      <FormLabel>Roles</FormLabel>
                      <FormControl>
                        <InputEnumMulti
                          enums={roleNameEnum}
                          value={field.value || []}
                          onChange={field.onChange}
                          // defaultValue={defaultValues.roles || []}
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
