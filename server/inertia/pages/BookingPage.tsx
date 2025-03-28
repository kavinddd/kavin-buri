import { Head, useForm, usePage } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'
import { CircleChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { MainLayout } from '~/components/MainLayout'
import BookingAccordions from '~/features/booking/BookingAccordions'
import RoomCarousel, { RoomType } from '~/features/booking/RoomCarousel'
import RoomPriceCalendarDialog from '~/features/booking/RoomPriceCalendarDialog'
import { Button } from '~/lib/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '~/lib/components/ui/card'
import { Input } from '~/lib/components/ui/input'
import { Separator } from '~/lib/components/ui/separator'
import { BookingSourceType, RoomTypeNameType } from '../../app/types'
import { addDays } from 'date-fns'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type BookingsController from '#controllers/bookings_controller'
import { BookingIndexProps } from '#controllers/bookings_controller'
import { toast } from 'sonner'

export default function BookingPage(props: BookingIndexProps) {
  return (
    <>
      <Head title="Book a room" />
      <MainLayout>
        <p className="mt-2 text-center text-lg md:text-xl text-primary font-bold uppercase tracking-wider">
          Online Booking
        </p>
        <BookingForm />
        <Separator className="hidden md:block md:w-2/3 self-center mt-4" />
        <section className="my-2">
          <p className="text-center md:text-left text-primary text-lg uppercase tracking-widest">
            FAQ
          </p>
          <BookingAccordions />
        </section>
      </MainLayout>
    </>
  )
}

type BookingFormType = {
  contactName: string
  email: string
  contactNumber: string
  checkInDate?: Date
  checkOutDate?: Date
  numAdult: number
  numChildren: number
  roomPrice: number
  roomTypeName: RoomTypeNameType
  hasAbf: boolean
  hasTransportation: boolean
  source: BookingSourceType
}

const defaultFormData: BookingFormType = {
  contactName: '',
  email: '',
  contactNumber: '',
  numAdult: 1,
  numChildren: 0,
  checkInDate: undefined,
  checkOutDate: undefined,
  roomPrice: 0,
  roomTypeName: 'DELUXE',
  hasAbf: false,
  hasTransportation: false,
  source: 'WEBSITE',
}

function BookingForm() {
  const { props } = usePage<BookingIndexProps>()
  const { data, setData, post, processing, errors } = useForm<BookingFormType>(defaultFormData)

  console.log('errors')
  console.log(errors)

  const [dateRange, setDateRange] = useState<DateRange>()

  function handleDateRangeChange(dateRange: DateRange | undefined) {
    if (dateRange?.from) setData('checkInDate', dateRange.from)
    if (dateRange?.to) setData('checkOutDate', dateRange.to)
    setDateRange(dateRange)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()

    post('/booking', {
      preserveScroll: true,
    })
  }

  const priceCalendar = props.priceCalendarByRoomType[data.roomTypeName]

  return (
    <Card className="mx-auto w-full md:p-4 lg:p-6 max-w-[1200px]">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardDescription>
            Get the <span className="font-bold">best rate </span>by directly book on our website
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <Input type="text" disabled={true} readOnly={true} value={data.roomTypeName} />
                <RoomCarousel onSelect={(roomTypeName) => setData('roomTypeName', roomTypeName)} />

                <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 items-center">
                  <RoomPriceCalendarDialog
                    priceCalendar={priceCalendar}
                    placeholder="Check-In"
                    showTo={false}
                    showFrom={true}
                    value={dateRange}
                    onSubmit={handleDateRangeChange}
                  />
                  <span className="hidden xl:inline text-muted-foreground"> to </span>
                  <RoomPriceCalendarDialog
                    priceCalendar={priceCalendar}
                    placeholder="Check-Out"
                    showTo={true}
                    showFrom={false}
                    value={dateRange}
                    onSubmit={handleDateRangeChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex mx-4 p-1 py-3">
              <Separator className="hidden lg:block" orientation="vertical" />
              <Separator className="lg:hidden" orientation="horizontal" />
            </div>
            <div className="flex flex-1 lg:max-w-md flex-col justify-between">
              <p className="hidden lg:block text-center text-primary text-lg mb-2 lg:mb-6">
                Booking Detail
              </p>
              <div className="flex flex-col gap-2 lg:gap-6 flex-1">
                <Input
                  type="text"
                  placeholder="Contact Name"
                  value={data.contactName}
                  onChange={(e) => setData('contactName', e.target.value)}
                  required
                />
                {errors.contactName && <p>{errors.contactName}</p>}

                <Input
                  type="text"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                {errors.email && <p>{errors.email}</p>}
                <Input
                  type="text"
                  placeholder="Contact Number"
                  value={data.contactNumber}
                  onChange={(e) => setData('contactNumber', e.target.value)}
                  required
                />
                {errors.contactNumber && <p>{errors.contactNumber}</p>}
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Adults"
                    max={6}
                    min={1}
                    value={data.numAdult}
                    onChange={(e) => setData('numAdult', Number(e.target.value))}
                    required
                    className="pr-20"
                  />
                  <span className="absolute right-4 top-1/2 text-sm transform -translate-y-1/2 text-muted-foreground ">
                    Adults
                  </span>
                  {errors.numAdult && <p>{errors.numAdult}</p>}
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Children"
                    max={6}
                    min={0}
                    value={data.numChildren}
                    onChange={(e) => setData('numChildren', Number(e.target.value))}
                    required
                    className="pr-20"
                  />
                  <span className="absolute right-4 top-1/2 text-sm transform -translate-y-1/2 text-muted-foreground ">
                    Children
                  </span>
                  {errors.numChildren && <p>{errors.numChildren}</p>}
                </div>

                <div className="flex flex-col md:flex-row md:gap-6 text-muted-foreground text-sm md:text-md">
                  <div className="flex items-center gap-2">
                    <Label>Include Breakfast</Label>
                    <Input className="w-5 m:w-6 block" type="checkbox" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label>Pickup at Udon Thani Airport</Label>
                    <Input className="w-5 md:w-6 block" type="checkbox" />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={processing}
                className="w-full md:w-auto tracking-wide mt-4"
              >
                Confirm Booking
                <CircleChevronRightIcon />
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
