import Booking from '#models/booking'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { MainLayout } from '~/components/MainLayout'
import { Button } from '~/lib/components/ui/button'
import { Input } from '~/lib/components/ui/input'

export default function MyBookingPage({
  booking,
  confirmNo,
}: {
  booking?: Booking
  confirmNo: string
}) {
  const { props: serverProps } = usePage()
  const [search, setSearch] = useState(confirmNo || '')
  search

  function handleSearch() {
    router.visit(`/myBooking/${search}`)
  }

  function handleConfirm() {
    if (!booking) return
    router.visit(`/myBooking/confirm/${booking.confirmBookingNo}`)
  }

  console.log(booking?.status)

  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <Button onClick={() => toast.success('Test')}>Test</Button>
        <div className="flex gap-4">
          <Input
            className="flex-1"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button variant="ghost" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>
        {booking ? (
          booking.status === 'NON-CONFIRMED' ? (
            <>
              <p>Your Booking</p>
              <p>Name: {booking.contactName}</p>
              <p>Tel No: {booking.contactNumber}</p>
              <p>Check in: {booking.checkInDate.toString()}</p>
              <p>Check Out: {booking.checkInDate.toString()}</p>
              <p>Room Type: {booking.roomType?.name || 'TODO'}</p>
              <p>Total Price: {booking.roomPrice}</p>
              <Button onClick={handleConfirm}>Confirm Booking</Button>
            </>
          ) : (
            <p>Your booking has already been confirmed.</p>
          )
        ) : (
          <>{confirmNo ? <p>No Booking found</p> : <p>Search your booking</p>}</>
        )}
      </MainLayout>
    </>
  )
}
