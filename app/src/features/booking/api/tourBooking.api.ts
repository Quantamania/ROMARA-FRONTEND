import { supabase } from '@/shared/api/supabaseClient'

export interface TourBookingInput {
  tourId: number
  startDate: string
  endDate: string
  travellers: number
  fullName: string
  email: string
  phone: string
}

export interface TourBooking {
  bookingId: number
  bookingReference: string
}

/**
 * Reserves seats on a fixed-price safari and returns a real, payable booking.
 *
 * This is the only path that creates a `bookings` row. The multi-step wizard
 * writes a `booking_requests` row instead — a quote enquiry with no tour and no
 * price, which by design can never be paid for. Packages carry a price and live
 * inventory, so they can be booked and paid for outright.
 *
 * book_tour_seats decrements available_slots inside the same transaction that
 * writes the booking, under a row lock, so two people racing for the last seat
 * cannot both get it.
 */
export async function createTourBooking(input: TourBookingInput): Promise<TourBooking> {
  const { data, error } = await supabase.rpc('book_tour_seats', {
    p_tour_id: input.tourId,
    p_start_date: input.startDate,
    p_end_date: input.endDate,
    p_num_travelers: input.travellers,
    p_full_name: input.fullName.trim(),
    p_email: input.email.trim(),
    p_phone: input.phone.trim(),
  })

  if (error) {
    // The function raises with messages written to be read by a customer
    // ("Not enough seats available. Only 2 left"), so pass them through rather
    // than replacing them with something vaguer.
    throw new Error(error.message || 'We could not complete your booking. Please try again.')
  }

  const row = (data as { booking_id: number; booking_reference: string }[] | null)?.[0]
  if (!row) throw new Error('We could not complete your booking. Please try again.')

  return { bookingId: row.booking_id, bookingReference: row.booking_reference }
}

/**
 * Last night of the trip. A 3-day safari starting Monday ends Wednesday, so the
 * span is duration - 1 nights, and a single-day trip starts and ends together.
 */
export function endDateFor(startDate: string, durationDays: number): string {
  const start = new Date(`${startDate}T00:00:00`)
  start.setDate(start.getDate() + Math.max(0, durationDays - 1))
  return start.toISOString().slice(0, 10)
}
