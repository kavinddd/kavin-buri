import type { HttpContext } from '@adonisjs/core/http'

type BookingId = string
type RoomId = string
type BookingStatus = 'PAID'

interface Booking {
  id: BookingId
  roomId: RoomId
  status: BookingStatus
}
const bookings = []
export default class BookingsController {
  async store({ request, response }: HttpContext) {
    return
  }
}
