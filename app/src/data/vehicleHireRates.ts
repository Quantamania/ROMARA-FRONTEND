export interface VehicleHireRate {
  route: string
  priceKES: number
}

/**
 * Base average day rates for vehicle hire, supplied by the client.
 *
 * Every rate is PER DAY and inclusive of vehicle hire, fuel, driver, and park
 * entry for the car and driver. They are indicative only — the final price
 * shifts with fuel and other economic factors, so a consultant confirms the
 * rate before booking. (Client typos in place names corrected for display.)
 */
export const vehicleHireRates: VehicleHireRate[] = [
  { route: 'Nairobi → Maasai Mara Game Reserve', priceKES: 30000 },
  { route: 'Nairobi → Amboseli National Park', priceKES: 30000 },
  { route: 'Nairobi → Samburu National Park', priceKES: 35000 },
  { route: 'Nairobi → Tsavo East or West', priceKES: 45000 },
  { route: 'Nairobi → Lake Nakuru National Park', priceKES: 28000 },
  { route: 'Day trip to Nairobi National Park', priceKES: 28000 },
  { route: 'Nairobi → Ol Pejeta Conservancy', priceKES: 33000 },
  { route: 'Nairobi → Aberdare National Park', priceKES: 35000 },
  { route: 'Nairobi → Mombasa', priceKES: 45000 },
  { route: 'Nairobi → Malindi', priceKES: 50000 },
  { route: 'Nairobi → Kakamega', priceKES: 45000 },
  { route: 'Nairobi → Lodwar / Turkana', priceKES: 60000 },
]
