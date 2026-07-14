export interface TransferService {
  id: string
  slug: string
  name: string
  image: string
  description: string
  features: string[]
  iconName: 'plane-landing' | 'plane-takeoff' | 'car' | 'users'
}

export type TransferType = 'pickup' | 'dropoff' | 'return'
export type AirportOption = 'jkia' | 'wilson' | 'other'
export type DestinationType = 'hotel' | 'residence' | 'office' | 'custom'
export type VehiclePreference = 'sedan' | 'suv' | 'luxury' | 'van' | 'shuttle' | 'bus'
export type PaymentPreference = 'pay-on-arrival' | 'mpesa' | 'bank-transfer' | 'card'

export interface TransferBookingFormData {
  fullName: string
  email: string
  phone: string
  transferType: TransferType
  airport: AirportOption
  flightNumber: string
  airline: string
  travelDate: string
  travelTime: string
  destinationType: DestinationType
  destinationAddress: string
  adults: number
  children: number
  infants: number
  handLuggage: number
  mediumBags: number
  largeSuitcases: number
  specialEquipment: string
  vehiclePreference: VehiclePreference
  additionalRequests: string
  paymentPreference: PaymentPreference
}