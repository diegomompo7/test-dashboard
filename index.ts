import { Room } from "./rooms"
import { Booking } from "./bookings"

const room1 = new Room(
    "Deluxe-Room - 215",
    189,
    30,
)

const bookings = {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "check_in": "2023-12-10",
        "check_out": "2023-12-15",
        "discount": 10,
}

  const booking1 = new Booking(bookings.name, bookings.email, bookings.check_in, bookings.check_out, 101, room1)