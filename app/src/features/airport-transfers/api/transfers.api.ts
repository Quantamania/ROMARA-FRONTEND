import transferServicesData from '@/data/transferServices.json'
import type { TransferBookingFormData, TransferService } from '@/features/airport-transfers/types/transfer.types'
import { supabase } from '@/shared/api/supabaseClient'

export async function getAllTransferServices(): Promise<TransferService[]> {
  return transferServicesData as TransferService[]
}

export async function getTransferServiceBySlug(slug: string): Promise<TransferService | undefined> {
  const services = await getAllTransferServices()
  return services.find((service) => service.slug === slug)
}

export async function submitTransferBooking(formData: TransferBookingFormData): Promise<{ success: boolean }> {
  const { error } = await supabase.from('transfer_bookings').insert({
    full_name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    transfer_type: formData.transferType,
    airport: formData.airport,
    flight_number: formData.flightNumber,
    airline: formData.airline,
    travel_date: formData.travelDate,
    travel_time: formData.travelTime,
    destination_type: formData.destinationType,
    destination_address: formData.destinationAddress,
    adults: formData.adults,
    children: formData.children,
    infants: formData.infants,
    hand_luggage: formData.handLuggage,
    medium_bags: formData.mediumBags,
    large_suitcases: formData.largeSuitcases,
    special_equipment: formData.specialEquipment,
    vehicle_preference: formData.vehiclePreference,
    additional_requests: formData.additionalRequests,
    payment_preference: formData.paymentPreference,
  })

  if (error) throw error
  return { success: true }
}