import type { VehicleHireFormData } from '@/features/vehicle-hire/types/vehicleHire.types'
import { supabase } from '@/shared/api/supabaseClient'

export interface VehicleHireResult {
  success: boolean
  requestId: number | null
  /** Shown to the customer and quoted when they come back to pay. */
  bookingReference: string | null
}

/**
 * Submits the hire request.
 *
 * Goes through an RPC rather than a table insert because anon deliberately has
 * INSERT but not SELECT on vehicle_hire_requests — a submitter must not be able
 * to read the queue back by guessing. That also means a plain insert can never
 * return the new row, so there would be no way to show the customer their own
 * reference. The function returns that one row's id and reference, nothing else.
 */
export async function submitVehicleHire(
  formData: VehicleHireFormData,
): Promise<VehicleHireResult> {
  const { data, error } = await supabase.rpc('submit_vehicle_hire', {
    p_full_name: formData.fullName,
    p_email: formData.email,
    p_phone: formData.phone,
    p_vehicle: formData.vehicle,
    p_driver_option: formData.driverOption,
    p_pickup_date: formData.pickupDate,
    p_return_date: formData.returnDate || null,
    p_pickup_location: formData.pickupLocation,
    p_dropoff_location: formData.dropoffSameAsPickup
      ? formData.pickupLocation
      : formData.dropoffLocation,
    p_passengers: formData.passengers,
    p_purpose: formData.purpose,
    p_additional_requests: formData.additionalRequests,
  })

  if (error) throw error

  const row = (data as { request_id: number; booking_reference: string }[] | null)?.[0]

  return {
    success: true,
    requestId: row?.request_id ?? null,
    bookingReference: row?.booking_reference ?? null,
  }
}
