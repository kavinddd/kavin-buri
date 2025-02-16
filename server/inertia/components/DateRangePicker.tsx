import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/lib/components/ui/button'
import { cn } from '~/lib/lib/utils'
import { Calendar } from '~/lib/components/ui/calendar'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

type DateRangePickerProps = {
  placeholder: string
  value: DateRange | undefined
  onChange: SelectRangeEventHandler
  showFrom?: boolean
  showTo?: boolean
}
export function DateRangePicker({
  placeholder = 'Pick a date',
  value,
  onChange,
  showFrom = true,
  showTo = true,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className=" p-0 border-secondary border-2 bg-zinc-200">
        <Calendar mode="range" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
