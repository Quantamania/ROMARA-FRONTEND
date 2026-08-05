import type { VehicleHireFormData } from '@/features/vehicle-hire/types/vehicleHire.types'
import { supabase } from '@/shared/api/supabaseClient'

export async function submitVehicleHire(formData: VehicleHireFormData): Promise<{ success: boolean }> {
  const { error } = await supabase.from('vehicle_hire_requests').insert({
    full_name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    vehicle: formData.vehicle,
    driver_option: formData.driverOption,
    pickup_date: formData.pickupDate,
    return_date: formData.returnDate,
    pickup_location: formData.pickupLocation,
    dropoff_location: formData.dropoffSameAsPickup ? formData.pickupLocation : formData.dropoffLocation,
    passengers: formData.passengers,
    purpose: formData.purpose,
    additional_requests: formData.additionalRequests,
  })

  if (error) throw error
  return { success: true }
}
