import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InputEnumProps {
  value: string | undefined;
  enums: readonly string[];
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function InputEnum({
  value,
  enums,
  onChange,
  placeholder = "Select value",
  readOnly,
}: InputEnumProps) {
  return (
    <Select
      disabled={readOnly}
      value={value || ""}
      onValueChange={onChange}
      defaultValue={value}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {enums.map((it) => (
          <SelectItem key={it} value={it}>
            {it}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
