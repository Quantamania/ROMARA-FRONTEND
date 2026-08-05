import type { FleetKey } from '@/data/fleet'

export type DriverOption = 'chauffeur' | 'self-drive'

export interface VehicleHireFormData {
  fullName: string
  email: string
  phone: string
  vehicle: FleetKey
  driverOption: DriverOption
  pickupDate: string
  returnDate: string
  pickupLocation: string
  dropoffSameAsPickup: boolean
  dropoffLocation: string
  passengers: number
  purpose: string
  additionalRequests: string
}
