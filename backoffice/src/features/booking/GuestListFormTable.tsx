import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIcon, PlusIcon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { BookingFormType } from "./BookingForm";
import { useCallback } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputDate from "@/components/inputs/InputDate";

export default function GuestListFormTable({
  form,
  isReadOnly,
  isLoading,
  max,
}: {
  form: UseFormReturn<BookingFormType>;
  isReadOnly: boolean;
  isLoading: boolean;
  max: number;
}) {
  const {
    fields: guests,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "guests",
  });

  const handleAddGuest = useCallback(() => {
    append({
      firstName: "",
      lastName: "",
      citizenId: "",
      nationality: "",
      dateOfBirth: new Date(),
    });
  }, [append]);

  return (
    <Table className="w-full max-w-[1200px] mx-auto table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="w-20"></TableHead>
          <TableHead>Citizen Id</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead>Date Of Birth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {guests.map((guest, idx) => (
          <TableRow key={guest.id}>
            <TableCell>
              {!isReadOnly && (
                <Button
                  variant="destructive"
                  onClick={() => remove(idx)}
                  disabled={isLoading}
                >
                  <DeleteIcon />
                </Button>
              )}
            </TableCell>

            <TableCell>
              <FormField
                control={form.control}
                name={`guests.${idx}.citizenId`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>

            <TableCell>
              <FormField
                control={form.control}
                name={`guests.${idx}.firstName`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>

            <TableCell>
              <FormField
                control={form.control}
                name={`guests.${idx}.lastName`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>

            <TableCell>
              <FormField
                control={form.control}
                name={`guests.${idx}.nationality`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>

            <TableCell>
              <FormField
                control={form.control}
                name={`guests.${idx}.dateOfBirth`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputDate
                        value={field.value}
                        onChange={field.onChange}
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
        ))}

        {!isReadOnly && (
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-center">
                <Button
                  onClick={handleAddGuest}
                  disabled={isLoading || guests.length === max}
                  type="button"
                >
                  <PlusIcon /> Add guest
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
