import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID, UUID } from 'node:crypto'

type BookingId = UUID
type RoomId = string

type BookingStatus = 'UNPAID' | 'PAID'

interface Booking {
  id: BookingId
  roomId: RoomId
  status: BookingStatus
  firstName: string
  lastName: string
}

const bookings: Booking[] = []

export default class BookingsController {
  async list() {
    return bookings
  }
  async store({ request, response, inertia }: HttpContext) {
    const newBooking: Booking = {
      id: randomUUID(),
      roomId: randomUUID(),
      firstName: request.input('firstName'),
      lastName: request.input('lastName'),
      status: 'UNPAID',
    }

    bookings.push(newBooking)

    return inertia.render('BookingPage')
  }
}
