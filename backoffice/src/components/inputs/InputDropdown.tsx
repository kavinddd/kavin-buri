import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ListDropdown } from "@/core/dropdown";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { toast } from "sonner";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

interface InputDropdownProps<IdType, SearchType> {
  value: IdType | undefined;
  // defaultValue: string[];
  apiKey: string;
  apis: (q?: string, search?: SearchType) => Promise<ListDropdown<IdType>>;
  onChange: (value: IdType) => void;
  placeholder?: string;
  readOnly?: boolean;
  search?: SearchType;
}

export default function InputDropdown<IdType, SearchType>({
  value,
  // defaultValue,
  apiKey,
  apis,
  onChange,
  placeholder = "Select values",
  readOnly,
  search,
}: InputDropdownProps<IdType, SearchType>) {
  const [q, setQ] = useState("");
  const {
    data: listDropdown = { data: [] },
    isError,
    isLoading,
    error: errorFetching,
  } = useQuery<ListDropdown<IdType>, Error>({
    queryKey: [apiKey, "dropdown", q, search],
    queryFn: () => apis(q, search),
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
  });

  if (isError) {
    toast.error(errorFetching.message);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between border-input text-foreground",
              value && "text-foreground",
            )}
            disabled={readOnly}
          >
            {value
              ? listDropdown?.data.find(({ id }) => id == value)?.label
              : placeholder}
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search"
            className="h-9"
            value={q}
            onValueChange={setQ}
            readOnly={readOnly}
          />

          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading .." : "Not found."}
            </CommandEmpty>

            <CommandGroup>
              {listDropdown.data.map(({ id, label }) => (
                <CommandItem
                  value={id as string}
                  key={id as string}
                  onSelect={() => onChange(id)}
                >
                  {label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      id === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
