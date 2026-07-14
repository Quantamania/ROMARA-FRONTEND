import transferServicesData from '@/data/transferServices.json'
import type { TransferBookingFormData, TransferService } from '@/features/airport-transfers/types/transfer.types'

export async function getAllTransferServices(): Promise<TransferService[]> {
  return transferServicesData as TransferService[]
}

export async function getTransferServiceBySlug(slug: string): Promise<TransferService | undefined> {
  const services = await getAllTransferServices()
  return services.find((service) => service.slug === slug)
}

/**
 * Submits a transfer booking request.
 * No backend endpoint exists yet — this stub just resolves after a short delay
 * so the form's loading/success states can be built and tested now. Swap the
 * body for a real POST /api/v1/transfer-bookings call once the backend is ready.
 */
export async function submitTransferBooking(formData: TransferBookingFormData): Promise<{ success: boolean }> {
  return new Promise(function resolveAfterDelay(resolve) {
    window.setTimeout(function markSubmitted() {
      console.info('Transfer booking submitted (mock):', formData)
      resolve({ success: true })
    }, 600)
  })
}
