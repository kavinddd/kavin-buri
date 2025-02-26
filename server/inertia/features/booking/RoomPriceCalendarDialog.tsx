import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DateRange } from 'react-day-picker'
import { cn } from '~/lib/lib/utils'
import { differenceInDays, format, isEqual } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import RoomPriceCalendar from './RoomPriceCalendar'
import { useState } from 'react'

type RoomPriceCalendarDialogProps = {
  placeholder: string
  value: DateRange | undefined
  onSubmit: (value: DateRange | undefined) => void
  showFrom?: boolean
  showTo?: boolean
}

export default function RoomPriceCalendarDialog({
  placeholder = 'Pick a date',
  value,
  onSubmit,
  showFrom = true,
  showTo = true,
}: RoomPriceCalendarDialogProps) {
  const [internalValue, setInternalValue] = useState<typeof value>(value)

  function handleSubmitDialog() {
    onSubmit(internalValue)
  }

  function handleSelect(day: DateRange | undefined) {
    console.log(day?.to === day?.from)
    if (day?.to && day?.from && isEqual(day.to, day.from)) return
    setInternalValue(day)
  }

  const checkInDateString = internalValue?.from?.toLocaleDateString('th') || 'Select check-in date'
  const checkOutDateString = internalValue?.to?.toLocaleDateString('th') || 'Select check-out date'
  const diffNightsString =
    internalValue?.from && internalValue?.to
      ? `(${differenceInDays(internalValue.to, internalValue.from)} nights)`
      : ''

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          {!value && placeholder}
          {showFrom && !showTo && value?.from && format(value.from, 'PPP')}
          {showTo && !showFrom && value?.to && format(value.to, 'PPP')}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-2xl px-2 py-4 md:p-6 items-center">
        <DialogDescription className="sr-only">
          Select a date range to get the best room price.
        </DialogDescription>
        <DialogTitle className="text-primary">Get the best rate now!</DialogTitle>
        <RoomPriceCalendar
          mode="range"
          selected={internalValue}
          onSelect={handleSelect}
          initialFocus
        />
        <DialogFooter className="flex-row justify-between md:justify-between w-full px-2">
          <p className="hidden md:block flex-1 text-green-800">{`${checkInDateString} - ${checkOutDateString} ${diffNightsString}`}</p>
          <div className="w-full md:w-auto flex justify-between gap-2">
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size="sm" onClick={handleSubmitDialog}>
                Confirm
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
