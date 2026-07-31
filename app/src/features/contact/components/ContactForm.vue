<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import { submitContactForm } from '@/features/contact/api/contact.api'
import type { ContactFormData, EnquirySubject } from '@/features/contact/api/contact.api'

const inputClasses =
  'w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink-soft/50 transition-all duration-200 focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft'
const errorClasses = 'mt-1.5 text-xs font-medium text-red-600'

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const formData = reactive<ContactFormData>({
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agreedToPrivacyPolicy: false,
})

const errors = reactive<Record<string, string>>({})

const subjectOptions: { value: EnquirySubject; label: string }[] = [
  { value: 'booking', label: 'Booking Enquiry' },
  { value: 'airport-transfer', label: 'Airport Transfer' },
  { value: 'custom-tour', label: 'Custom Tour' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'general', label: 'General Enquiry' },
]

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[+\d][\d\s-]{6,}$/.test(phone.trim())
}

function validateForm() {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.'
  if (!formData.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!formData.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }
  if (!formData.subject) errors.subject = 'Please select a subject.'
  if (!formData.message.trim()) errors.message = 'Please enter your message.'
  if (!formData.agreedToPrivacyPolicy) errors.agreedToPrivacyPolicy = 'Please agree to the privacy policy.'

  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true
  await submitContactForm(formData)
  isSubmitting.value = false
  isSubmitted.value = true
}

function sendAnotherMessage() {
  isSubmitted.value = false
  formData.fullName = ''
  formData.email = ''
  formData.phone = ''
  formData.subject = ''
  formData.message = ''
  formData.agreedToPrivacyPolicy = false
}
</script>

<template>
  <div>
    <!-- Confirmation state -->
    <div v-if="isSubmitted" class="rounded-lg bg-romara-cream p-8 text-center">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-romara-green shadow-sm">
        <IconCheckSquare class="h-7 w-7" />
      </span>
      <h3 class="mt-4 text-lg font-bold text-romara-green">Message sent successfully!</h3>
      <p class="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-romara-ink/70">
        Thank you for reaching out. A member of our team will get back to you as soon as possible.
      </p>
      <button
        type="button"
        class="mt-5 text-sm font-semibold text-romara-green underline hover:text-romara-amber"
        @click="sendAnotherMessage"
      >
        Send another message
      </button>
    </div>

    <!-- Form -->
    <form v-else class="space-y-5" novalidate @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label :class="labelClasses">Full Name *</label>
          <input v-model="formData.fullName" type="text" :class="inputClasses" placeholder="Jane Wanjiru" />
          <p v-if="errors.fullName" :class="errorClasses">{{ errors.fullName }}</p>
        </div>
        <div>
          <label :class="labelClasses">Email Address *</label>
          <input v-model="formData.email" type="email" :class="inputClasses" placeholder="jane@example.com" />
          <p v-if="errors.email" :class="errorClasses">{{ errors.email }}</p>
        </div>
        <div>
          <label :class="labelClasses">Phone Number *</label>
          <input v-model="formData.phone" type="tel" :class="inputClasses" placeholder="+254 700 000 000" />
          <p v-if="errors.phone" :class="errorClasses">{{ errors.phone }}</p>
        </div>
        <div>
          <label :class="labelClasses">Subject *</label>
          <select v-model="formData.subject" :class="inputClasses">
            <option value="" disabled>Select a subject</option>
            <option v-for="option in subjectOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <p v-if="errors.subject" :class="errorClasses">{{ errors.subject }}</p>
        </div>
      </div>

      <div>
        <label :class="labelClasses">Your Message *</label>
        <textarea v-model="formData.message" rows="5" :class="inputClasses" placeholder="Tell us about your travel plans..." />
        <p v-if="errors.message" :class="errorClasses">{{ errors.message }}</p>
      </div>

      <div>
        <label class="flex items-start gap-2.5 text-sm text-romara-ink/70">
          <input v-model="formData.agreedToPrivacyPolicy" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-romara-green focus:ring-romara-green" />
          <span>
            I agree to the
            <a href="/privacy-policy" class="font-semibold text-romara-green underline hover:text-romara-amber">privacy policy</a>.
          </span>
        </label>
        <p v-if="errors.agreedToPrivacyPolicy" :class="errorClasses">{{ errors.agreedToPrivacyPolicy }}</p>
      </div>

      <BaseButton type="submit" variant="primary" size="lg" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        <IconArrowRight class="h-4 w-4" />
      </BaseButton>
    </form>
  </div>
</template>