export type EnquirySubject = 'booking' | 'airport-transfer' | 'custom-tour' | 'partnership' | 'general'

export interface ContactFormData {
  fullName: string
  email: string
  phone: string
  subject: EnquirySubject | ''
  message: string
  agreedToPrivacyPolicy: boolean
}

export interface OfficeInfo {
  name: string
  addressLines: string[]
  phone: string
  email: string
  hours: string
  website: string
  mapEmbedSrc: string
}

export const romaraOffice: OfficeInfo = {
  name: 'ROMARA Tours & Travel',
  addressLines: ['Delta Corner, Office Suite 5', 'Westlands Road, Nairobi, Kenya'],
  phone: '+254 700 123 456',
  email: 'info@romaratours.com',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM EAT',
  website: 'www.romaratours.com',
  mapEmbedSrc: 'https://www.google.com/maps?q=Westlands+Road,+Nairobi,+Kenya&output=embed',
}

/**
 * Submits a contact enquiry.
 * No backend endpoint exists yet — this stub resolves after a short delay so
 * the form's loading/success states can be built and tested now. Swap the
 * body for a real POST /api/v1/contact-enquiries call once the backend is
 * ready, following the same pattern as
 * features/airport-transfers/api/transfers.api.ts.
 */
export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean }> {
  return new Promise(function resolveAfterDelay(resolve) {
    window.setTimeout(function markSubmitted() {
      console.info('Contact enquiry submitted (mock):', formData)
      resolve({ success: true })
    }, 600)
  })
}