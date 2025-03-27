import { DayContentProps, isDateRange } from 'react-day-picker'
import { formatNumber } from '~/lib/utils/formatNumber'
import { Calendar, CalendarProps } from '~/lib/components/ui/calendar'
import { cn } from '~/lib/lib/utils'
import { isAfter, isBefore, isEqual, isPast, isToday } from 'date-fns'
import { PriceCalendar } from '#services/pricings_service'

function getRoomPriceByDate(priceCalendar: PriceCalendar, date: Date) {
  return priceCalendar[date.getFullYear()]?.[date.getMonth() + 1]?.[date.getDate()]
}

function RoomPriceDay(
  props: DayContentProps & Pick<RoomPriceCalendarProps, 'selected' | 'priceCalendar'>
) {
  const { date, selected, priceCalendar } = props

  const roomPrice = getRoomPriceByDate(priceCalendar, date)
  let isSelected = false
  let isLastSelected = false

  if (isDateRange(selected)) {
    if (selected.to) {
      isSelected = isEqual(date, selected.to)
      isLastSelected = isSelected
    }
    if (selected.from) isSelected = isSelected || isEqual(date, selected.from)
    if (selected.to && selected.from)
      isSelected = isSelected || (isAfter(date, selected.from) && isBefore(date, selected.to))
  }

  return (
    <>
      <p className="text-sm md:text-md text-center"> {`${date.getDate()}`} </p>

      {!isLastSelected && (
        <p
          className={cn('text-xs text-center text-muted-foreground', isSelected && 'text-inherit')}
        >
          {roomPrice ? (
            <>
              <span className="hidden md:inline">฿</span> {formatNumber(roomPrice, 0)}
            </>
          ) : (
            '-'
          )}
        </p>
      )}
    </>
  )
}

type RoomPriceCalendarProps = CalendarProps & { priceCalendar: PriceCalendar }

export default function RoomPriceCalendar(props: RoomPriceCalendarProps) {
  const { selected, priceCalendar } = props
  return (
    <Calendar
      classNames={{
        root: 'max-w-[600px] w-full max-h-[500px] overflow-hidden',
        caption_start: 'w-full',
        head_cell: 'w-full text-sm md:text-md',
        cell: `w-full overflow-hidden border-[0.5px] hover:bg-primary hover:text-primary-foreground`,
        row: 'flex w-full',
        day: 'w-full h-12 md:h-14 flex flex-col justify-center',
        day_selected: 'bg-primary text-white',
        day_range_middle: 'bg-primary text-white brightness-125',
        // button: 'w-full h-12 md:h-14 flex flex-col justify-center overflow-hidden',
        // table: `w-full`,
        //
      }}
      components={{
        // Day: RoomPriceDay,
        DayContent: (props) => (
          <RoomPriceDay {...props} selected={selected} priceCalendar={priceCalendar} />
        ),
      }}
      disabled={(day) => {
        if (isPast(day) && !isToday(day)) return true
        if (!getRoomPriceByDate(priceCalendar, day)) return true
        // if (isDateRange(selected) && selected?.from && isEqual(selected.from, day)) return true
        return false
      }}
      {...props}
    />
  )
}
