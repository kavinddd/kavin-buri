import { useMemo } from "react";
import { MultiSelect } from "../ui/multi-select";

interface InputEnumProps {
  value: string[];
  // defaultValue: string[];
  enums: readonly string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function InputEnumMulti({
  value,
  // defaultValue,
  enums,
  onChange,
  placeholder = "Select values",
  readOnly,
}: InputEnumProps) {
  const options = useMemo(
    () =>
      enums.map((it) => ({
        value: it,
        label: it,
      })),
    [enums],
  );
  //
  // const key = useMemo(
  //   () => defaultValue.join(",") || "default",
  //   [defaultValue],
  // );

  return (
    <MultiSelect
      // key={key}
      options={options}
      placeholder={placeholder}
      onValueChange={onChange}
      defaultValue={value}
      disabled={readOnly}
      variant="default"
    />
  );
}
