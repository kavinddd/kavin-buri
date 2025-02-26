import { DayContentProps, isDateRange } from 'react-day-picker'
import { formatNumber } from '~/lib/utils/formatNumber'
import { Calendar, CalendarProps } from '~/lib/components/ui/calendar'
import { cn } from '~/lib/lib/utils'
import { isAfter, isBefore, isEqual, isPast, isToday } from 'date-fns'

type Year = number
type Month = number
type Day = number
type RoomPrice = number
type PriceCalendar = Record<Year, Record<Month, Record<Day, RoomPrice>>>

const tempData: PriceCalendar = {
  2025: {
    1: {
      1: 1550,
      2: 2460,
      3: 2700,
      4: 1980,
      5: 2320,
      6: 1670,
      7: 2130,
      8: 2250,
      9: 1580,
      10: 2430,
      11: 2200,
      12: 1790,
      13: 1950,
      14: 2090,
      15: 1800,
      16: 2380,
      17: 1620,
      18: 1850,
      19: 2020,
      20: 2300,
      21: 1600,
      22: 2140,
      23: 2400,
      24: 1700,
      25: 2500,
      26: 1900,
      27: 2200,
      28: 2340,
      29: 1890,
    },

    2: {
      1: 1550,
      2: 2460,
      3: 2700,
      4: 1980,
      5: 2320,
      6: 1670,
      7: 2130,
      8: 2250,
      9: 1580,
      10: 2430,
      11: 2200,
      12: 1790,
      13: 1950,
      14: 2090,
      15: 1800,
      16: 2380,
      17: 1620,
      18: 1850,
      19: 2020,
      20: 2300,
      21: 1600,
      22: 2140,
      23: 2400,
      24: 1700,
      25: 2500,
      26: 1900,
      27: 2200,
      28: 2340,
      29: 1890,
      30: 1890,
      31: 1600,
    },
    3: {
      1: 1550,
      2: 2460,
      3: 2700,
      4: 1980,
      5: 2320,
      6: 1670,
      7: 2130,
      8: 2250,
      9: 1580,
      10: 2430,
      11: 2200,
      12: 1790,
      13: 1950,
      14: 2090,
      15: 1800,
      16: 2380,
      17: 1620,
      18: 1850,
      19: 2020,
      20: 2300,
      21: 1600,
      22: 2140,
      23: 2400,
      24: 1700,
      25: 2500,
      26: 1900,
      27: 2200,
      28: 2340,
      29: 1890,
      30: 1500,
      31: 1600,
    },
  },
}

function getRoomPriceByDate(date: Date) {
  return tempData[date.getFullYear()]?.[date.getMonth() + 1]?.[date.getDate()]
}

function RoomPriceDay(props: DayContentProps & Pick<CalendarProps, 'selected'>) {
  const { date, selected } = props
  const roomPrice = getRoomPriceByDate(date)

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

export default function RoomPriceCalendar(props: CalendarProps) {
  const { selected } = props

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
        DayContent: (props) => <RoomPriceDay {...props} selected={selected} />,
      }}
      disabled={(day) => {
        if (isPast(day) && !isToday(day)) return true
        if (!getRoomPriceByDate(day)) return true
        // if (isDateRange(selected) && selected?.from && isEqual(selected.from, day)) return true
        return false
      }}
      {...props}
    />
  )
}
