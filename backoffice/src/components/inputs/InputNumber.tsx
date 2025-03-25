import { cn } from "@/lib/utils";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

type InputNumberProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  readOnly?: boolean;
};
export default function InputNumber({
  value,
  onChange,
  min,
  max,
  readOnly,
}: InputNumberProps) {
  return (
    <FormControl>
      <Input
        type="text"
        className={cn(readOnly && "cursor-auto")}
        value={value ?? ""}
        onChange={
          readOnly
            ? undefined
            : (e) => {
                const value = e.target.value;

                if (value === "") {
                  onChange(undefined);
                  return;
                }

                const numValue = Number(value);

                if (isNaN(numValue)) {
                  onChange(undefined);
                  return;
                }

                onChange(value === "" ? undefined : Number(value));
              }
        }
        min={min}
        max={max}
        readOnly={readOnly}
      />
    </FormControl>
  );
}
