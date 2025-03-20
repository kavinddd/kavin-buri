import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";

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
  return (
    <Popover>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal border-input text-foreground",
              !value && "text-muted-foreground",
              readOnly && "cursor-default text-foreground",
            )}
            disabled={readOnly}
            onClick={(e) => readOnly && e.preventDefault()}
          >
            {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            readOnly || date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
