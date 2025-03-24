import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, isValid, parse, startOfMonth } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type InputDateProps = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  readOnly?: boolean;
};
export default function InputDate({
  value,
  onChange,
  readOnly,
}: InputDateProps) {
  const [inputValue, setInputValue] = useState<string>(
    value ? format(value, "yyyy-MM-dd") : "",
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setInputValue(value ? format(value, "yyyy-MM-dd") : "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue.length < "yyyy-MM-dd".length) return;

    try {
      const parsedDate = parse(newValue, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        const utcDate = new Date(
          Date.UTC(
            parsedDate.getFullYear(),
            parsedDate.getMonth(),
            parsedDate.getDate(),
          ),
        );
        onChange(utcDate);
      } else {
        onChange(undefined);
      }
    } catch {
      onChange(undefined);
    }
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      );
      onChange(utcDate);
      setInputValue(format(utcDate, "yyyy-MM-dd"));
    } else {
      onChange(undefined);
      setInputValue("");
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <FormControl>
          <Input
            className={cn(readOnly && "cursor-default text-foreground")}
            type="text"
            value={inputValue}
            onChange={readOnly ? undefined : handleInputChange}
            disabled={readOnly}
          />
        </FormControl>

        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            disabled={readOnly}
            className="absolute right-0 top-0 h-full w-8 p-0"
          >
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleCalendarSelect}
          defaultMonth={value ? startOfMonth(value) : undefined}
          disabled={(date) =>
            readOnly || date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
