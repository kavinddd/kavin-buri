import { useCallback, useMemo } from "react";
import { MultiSelect } from "../ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { ListDropdown } from "@/core/dropdown";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface InputDropdownMultiProps<IdType, SearchType> {
  value: IdType[];
  // defaultValue: string[];
  apis: (q?: string, search?: SearchType) => Promise<ListDropdown<IdType>>;
  onChange: (value: IdType[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  maxCount?: number;
  search?: SearchType;
}

export default function InputDropdownMulti<IdType, SearchType>({
  value,
  // defaultValue,
  apis,
  onChange,
  placeholder = "Select values",
  readOnly,
  maxCount,
}: InputDropdownMultiProps<IdType, SearchType>) {
  const {
    data: listDropdown,
    isError,
    isLoading,
    error: fetchError,
  } = useQuery<ListDropdown<IdType>, Error>({
    queryKey: ["roleGroups", "dropdown"],
    queryFn: () => apis(),
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
    // enabled: mode !== "CREATE" && Boolean(id),
  });

  const options = useMemo(() => {
    if (!listDropdown) return [];
    return listDropdown.data.map((it) => ({
      value: it.id as string,
      label: it.label,
    }));
  }, [listDropdown]);

  const handleValueChange = useCallback(
    (value: string[]) => {
      onChange(value as IdType[]);
    },
    [onChange],
  );

  if (isError) {
    toast.error(fetchError.message);
  }

  if (isLoading) {
    <Input disabled={true} readOnly={true} />;
  }

  return (
    <MultiSelect
      options={options}
      placeholder={placeholder}
      onValueChange={handleValueChange}
      defaultValue={value as string[]}
      disabled={readOnly}
      variant="default"
      maxCount={maxCount}
    />
  );
}
