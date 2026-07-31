import { supabase } from '@/shared/api/supabaseClient'

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

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean }> {
  const { error } = await supabase.from('enquiries').insert({
    name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject || 'general',
    message: formData.message,
  })

  if (error) throw error
  return { success: true }
}