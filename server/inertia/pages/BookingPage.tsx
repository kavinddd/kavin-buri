import { Head, useForm } from '@inertiajs/react'
import { Label } from '@radix-ui/react-label'
import { CircleArrowRightIcon, CircleChevronRightIcon, CircleChevronUpIcon } from 'lucide-react'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DateRangePicker } from '~/components/DateRangePicker'
import { MainLayout } from '~/components/MainLayout'
import BookingAccordions from '~/features/booking/BookingAccordions'
import HotelCarousel, { RoomType } from '~/features/booking/HotelCarousel'
import RoomCarousel from '~/features/booking/RoomCarousel'
import RoomPriceCalendar from '~/features/booking/RoomPriceCalendar'
import { Button } from '~/lib/components/ui/button'
import { Calendar } from '~/lib/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/lib/components/ui/card'
import { Input } from '~/lib/components/ui/input'
import { Separator } from '~/lib/components/ui/separator'

export default function BookingPage() {
  return (
    <>
      <Head title="Book a room" />
      <MainLayout>
        <p className="mt-2 text-center text-lg md:text-xl text-primary font-bold uppercase tracking-wider">
          Online Booking
        </p>
        <BookingForm />
        <RoomPriceCalendar />
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
  firstName: string
  lastName: string
  email: string
  telNum: string
  numAdult: number
  numChildren: number
  checkInDate: string
  checkOutDate: string
  roomType: RoomType
}

const defaultFormData: BookingFormType = {
  firstName: '',
  lastName: '',
  email: '',
  telNum: '',
  numAdult: 1,
  numChildren: 0,
  checkInDate: '',
  checkOutDate: '',
  roomType: 'DELUXE',
}

function BookingForm() {
  const { data, setData, post, processing, errors } = useForm<BookingFormType>(defaultFormData)

  const [dateRange, setDateRange] = useState<DateRange>()

  function handleSubmit(e: React.FormEvent) {
    console.log('submit form')
    e.preventDefault()
    e.stopPropagation()

    post('/bookings', {
      preserveScroll: true,
      onError: (e) => console.error(e),
      onSuccess: () => console.log('create booking successfully'),
    })
  }

  //TODO: add confirm modal
  //

  console.log(errors)

  return (
    <Card className="mx-auto w-full md:p-4 lg:p-6 max-w-[1200px]">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardDescription>
            Get the <span className="font-bold">best rate </span>by directly book on our website
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <Input type="text" disabled={true} readOnly={true} value={data.roomType} />
                <RoomCarousel onSelect={(roomType) => setData('roomType', roomType)} />

                <div className="flex flex-col xl:flex-row gap-2 xl:gap-4 items-center">
                  <DateRangePicker
                    placeholder="Check-In"
                    showTo={false}
                    showFrom={true}
                    value={dateRange}
                    onChange={setDateRange}
                  />
                  <span className="hidden xl:inline text-muted-foreground"> to </span>
                  <DateRangePicker
                    placeholder="Check-Out"
                    showTo={true}
                    showFrom={false}
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </div>
            </div>
            <div className="flex mx-4 p-1 py-3">
              <Separator className="hidden md:block" orientation="vertical" />
              <Separator className="md:hidden" orientation="horizontal" />
            </div>
            <div className="flex flex-1 max-w-xl flex-col justify-between">
              <p className="hidden md:block text-center text-primary text-lg mb-2 lg:mb-6">
                Booking Detail
              </p>
              <div className="flex flex-col gap-2 lg:gap-6 flex-1">
                <Input
                  type="text"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={(e) => setData('firstName', e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={(e) => setData('lastName', e.target.value)}
                  required
                />
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
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Children"
                    max={6}
                    min={1}
                    value={data.numChildren}
                    onChange={(e) => setData('numChildren', Number(e.target.value))}
                    required
                    className="pr-20"
                  />
                  <span className="absolute right-4 top-1/2 text-sm transform -translate-y-1/2 text-muted-foreground ">
                    Children
                  </span>
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
