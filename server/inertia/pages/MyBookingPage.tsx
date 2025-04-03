import Booking from '#models/booking'
import { Head, router } from '@inertiajs/react'
import { CircleCheckIcon, CircleXIcon, SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { MainLayout } from '~/components/MainLayout'
import { Button } from '~/lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '~/lib/components/ui/card'
import { Input } from '~/lib/components/ui/input'

export default function MyBookingPage({
  booking,
  confirmNo,
}: {
  booking?: Booking
  confirmNo: string
}) {
  const [search, setSearch] = useState(confirmNo || '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    router.get(`/myBooking/${search}`)
  }

  function handleConfirm() {
    if (!booking) return
    router.get(`/myBooking/confirm/${booking.confirmBookingNo}`)
  }

  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <p className="text-2xl text-primary text-center">My Booking</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Input
              className="flex-1"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Booking confirm number"
            />
            <Button variant="ghost">
              <SearchIcon />
            </Button>
          </div>
        </form>
        {booking ? (
          booking.status === 'NON-CONFIRMED' ? (
            <Card>
              <CardHeader>
                <p className="text-primary">Your Booking Detail</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="px-2 grid grid-cols-2 max-w-[600px] gap-2">
                    <p className="text-muted-foreground">Name: </p>
                    <p>{booking.contactName}</p>
                    <p className="text-muted-foreground">Tel No: </p>
                    <p>{booking.contactNumber}</p>
                    <p className="text-muted-foreground">Check-in date: </p>
                    <p>{booking.checkInDate.toString()}</p>
                    <p className="text-muted-foreground">Check-out date:</p>
                    <p> {booking.checkOutDate.toString()}</p>
                    <p className="text-muted-foreground">Room Type: </p>
                    <p> {booking.roomType?.name}</p>
                    <p className="text-muted-foreground">Total Price: </p>
                    <p>{booking.roomPrice} Baht</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="text-end" onClick={handleConfirm}>
                  Confirm Booking
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <div className="text-center py-12">
                  <CircleCheckIcon className="text-green-600 h-20 w-20 mx-auto" />
                  <p className="text-green-700 mt-6">Your booking has already been confirmed</p>
                </div>
              </CardContent>
            </Card>
          )
        ) : (
          <>
            {confirmNo && (
              <Card className="pt-6">
                <CardContent>
                  <div className="text-center py-12">
                    <CircleXIcon className="text-red-600 h-20 w-20 mx-auto" />
                    <p className="text-center text-red-500 mt-6">
                      Sorry! We couldn't find booking you are looking for, please try again
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </MainLayout>
    </>
  )
}
