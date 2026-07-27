export type BookingService =
  | 'wildlife-safari'
  | 'day-trip'
  | 'multi-day-tour'
  | 'mountain-hiking'
  | 'beach-holiday'
  | 'airport-transfer'
  | 'hotel-booking'
  | 'group-tour'
  | 'corporate-travel'
  | 'custom-tour'

export type TravelType =
  | 'private'
  | 'family'
  | 'group'
  | 'honeymoon'
  | 'solo'
  | 'luxury'
  | 'mid-range'
  | 'budget'
  | 'corporate'

export type LengthOfStay = 'day-trip' | '2d1n' | '3d2n' | '4d3n' | '5d4n' | '6d5n' | '7d6n' | '7plus'

export type AccommodationLevel = 'luxury' | 'mid-range' | 'budget' | ''

export interface TripDetails {
  service: BookingService | ''
  travelType: TravelType | ''
  destination: string
  travelDate: string
  adults: number
  children: number
  lengthOfStay: LengthOfStay | ''
  specialRequests: string
}

export interface YourDetails {
  fullName: string
  email: string
  phone: string
  country: string
}

export interface AdditionalInfo {
  preferredAccommodation: AccommodationLevel
  dietaryRequirements: string
  airportPickupRequired: boolean
  celebratingOccasion: string
  accessibilityRequirements: string
}

export interface BookingRequest {
  tripDetails: TripDetails
  yourDetails: YourDetails
  additionalInfo: AdditionalInfo
}