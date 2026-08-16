import type { FleetKey } from '@/data/fleet'

export type DriverOption = 'chauffeur' | 'self-drive'

export interface VehicleHireFormData {
  fullName: string
  email: string
  phone: string
  /** null until the guest picks a vehicle (or arrives via ?vehicle=key). */
  vehicle: FleetKey | null
  /** null until the guest chooses chauffeur or self-drive. */
  driverOption: DriverOption | null
  pickupDate: string
  returnDate: string
  pickupLocation: string
  dropoffSameAsPickup: boolean
  dropoffLocation: string
  passengers: number
  purpose: string
  additionalRequests: string
}
