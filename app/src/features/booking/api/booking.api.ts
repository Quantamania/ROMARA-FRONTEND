import type { BookingRequest, BookingService, LengthOfStay, TravelType } from '@/features/booking/types/booking.types'

export const serviceOptions: { value: BookingService; label: string }[] = [
  { value: 'wildlife-safari', label: 'Wildlife Safari' },
  { value: 'day-trip', label: 'Day Trip' },
  { value: 'multi-day-tour', label: 'Multi-Day Tour' },
  { value: 'mountain-hiking', label: 'Mountain Hiking' },
  { value: 'beach-holiday', label: 'Beach Holiday' },
  { value: 'airport-transfer', label: 'Airport Transfer' },
  { value: 'hotel-booking', label: 'Hotel Booking' },
  { value: 'group-tour', label: 'Group Tour' },
  { value: 'corporate-travel', label: 'Corporate Travel' },
  { value: 'custom-tour', label: 'Customized Tour Package' },
]

export const travelTypeOptions: { value: TravelType; label: string }[] = [
  { value: 'private', label: 'Private Tour' },
  { value: 'family', label: 'Family Holiday' },
  { value: 'group', label: 'Group Tour' },
  { value: 'honeymoon', label: 'Couple / Honeymoon' },
  { value: 'solo', label: 'Solo Traveller' },
  { value: 'luxury', label: 'Luxury Experience' },
  { value: 'mid-range', label: 'Mid-Range Safari' },
  { value: 'budget', label: 'Budget Safari' },
  { value: 'corporate', label: 'Corporate Travel' },
]

export const destinationOptions: string[] = [
  'Maasai Mara National Reserve',
  'Amboseli National Park',
  'Tsavo East National Park',
  'Tsavo West National Park',
  'Lake Nakuru National Park',
  'Samburu National Reserve',
  'Nairobi National Park',
  'Mount Kenya',
  "Hell's Gate National Park",
  'Lake Naivasha',
  'Diani Beach',
  'Watamu',
  'Malindi',
  'Mombasa',
  'Custom Destination',
]

export const lengthOfStayOptions: { value: LengthOfStay; label: string }[] = [
  { value: 'day-trip', label: 'Day Trip' },
  { value: '2d1n', label: '2 Days / 1 Night' },
  { value: '3d2n', label: '3 Days / 2 Nights' },
  { value: '4d3n', label: '4 Days / 3 Nights' },
  { value: '5d4n', label: '5 Days / 4 Nights' },
  { value: '6d5n', label: '6 Days / 5 Nights' },
  { value: '7d6n', label: '7 Days / 6 Nights' },
  { value: '7plus', label: 'More than 7 Days' },
]

/**
 * Submits a booking request.
 * No backend endpoint exists yet — this stub resolves after a short delay so
 * the wizard's loading/success states can be built and tested now. Swap the
 * body for a real POST /api/v1/bookings call once the backend is ready,
 * following the same pattern as
 * features/airport-transfers/api/transfers.api.ts.
 */
export async function submitBookingRequest(request: BookingRequest): Promise<{ success: boolean }> {
  return new Promise(function resolveAfterDelay(resolve) {
    window.setTimeout(function markSubmitted() {
      console.info('Booking request submitted (mock):', request)
      resolve({ success: true })
    }, 700)
  })
}