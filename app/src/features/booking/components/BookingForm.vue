<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconLock from '@/components/icons/IconLock.vue'
import PaymentPanel from '@/features/payments/components/PaymentPanel.vue'
import { useBookingStore } from '@/features/booking/store/booking.store'
import {
  destinationOptions,
  lengthOfStayOptions,
  serviceOptions,
  travelTypeOptions,
} from '@/features/booking/api/booking.api'

const bookingStore = useBookingStore()

const inputClasses =
  'w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink-soft/50 transition-all duration-200 focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft'
const errorClasses = 'mt-1.5 text-xs font-medium text-red-600'

const adultsOptions = [1, 2, 3, 4, 5, 6, 7]
const childrenOptions = [0, 1, 2, 3, 4]

const serviceLabel = computed(() => serviceOptions.find((o) => o.value === bookingStore.tripDetails.service)?.label ?? '—')
const travelTypeLabel = computed(() => travelTypeOptions.find((o) => o.value === bookingStore.tripDetails.travelType)?.label ?? '—')
const lengthOfStayLabel = computed(() => lengthOfStayOptions.find((o) => o.value === bookingStore.tripDetails.lengthOfStay)?.label ?? '—')

function formatDate(isoDate: string) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

// After the request is submitted, the visitor chooses how to pay before the
// final confirmation screen.
const paymentDone = ref(false)
function onPaymentDone() {
  paymentDone.value = true
}
function startNewBooking() {
  paymentDone.value = false
  bookingStore.resetBooking()
}
</script>

<template>
  <div class="overflow-hidden rounded-card bg-white p-6 shadow-card sm:p-9 lg:p-10">
    <!-- Payment step — choose how to pay after submitting -->
    <div v-if="bookingStore.isSubmitted && !paymentDone" class="py-2">
      <PaymentPanel flat :phone="bookingStore.yourDetails.phone" reference="Trip Booking" @complete="onPaymentDone" @skip="onPaymentDone" />
    </div>

    <!-- Confirmation state, replaces the whole form -->
    <div v-else-if="bookingStore.isSubmitted && paymentDone" class="py-12 text-center">
      <span
        class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-fade text-white shadow-glow-amber"
      >
        <IconCheckSquare class="h-10 w-10" />
      </span>
      <h2 class="mt-6 font-heading text-display-sm font-semibold text-romara-green">Booking Request Submitted!</h2>
      <span class="accent-rule mx-auto mt-4" />
      <p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-romara-ink-soft">
        Thank you for choosing ROMARA Tours &amp; Travel. A confirmation email is on its way, and our
        reservations team will follow up shortly to finalize your trip.
      </p>
      <div class="mt-8 flex justify-center">
        <BaseButton variant="primary" size="lg" @click="startNewBooking">
          Start a New Booking
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <template v-else>
      <!-- Step 1: Trip Details -->
      <div v-if="bookingStore.currentStep === 1">
        <div class="flex items-start gap-4">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade font-heading text-sm font-semibold text-white shadow-soft"
          >
            1
          </span>
          <div>
            <h2 class="font-heading text-2xl font-semibold text-romara-green sm:text-display-sm">Let's Plan Your Trip</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-romara-ink-soft">
              Tell us about your travel plans and we'll create the perfect experience for you.
            </p>
          </div>
        </div>
        <span class="accent-rule mt-6" />

        <div class="mt-8 space-y-6">
          <div>
            <label :class="labelClasses">What would you like to book? *</label>
            <select v-model="bookingStore.tripDetails.service" :class="inputClasses">
              <option value="" disabled>Select an option</option>
              <option v-for="option in serviceOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <p v-if="bookingStore.stepErrors.service" :class="errorClasses">{{ bookingStore.stepErrors.service }}</p>
          </div>

          <div>
            <label :class="labelClasses">Travel Type *</label>
            <select v-model="bookingStore.tripDetails.travelType" :class="inputClasses">
              <option value="" disabled>Select travel type</option>
              <option v-for="option in travelTypeOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
            <p v-if="bookingStore.stepErrors.travelType" :class="errorClasses">{{ bookingStore.stepErrors.travelType }}</p>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label :class="labelClasses">Destination *</label>
              <input
                v-model="bookingStore.tripDetails.destination"
                list="destination-options"
                type="text"
                placeholder="Where would you like to go?"
                :class="inputClasses"
              />
              <datalist id="destination-options">
                <option v-for="destination in destinationOptions" :key="destination" :value="destination" />
              </datalist>
              <p v-if="bookingStore.stepErrors.destination" :class="errorClasses">{{ bookingStore.stepErrors.destination }}</p>
            </div>
            <div>
              <label :class="labelClasses">Preferred Travel Date *</label>
              <input v-model="bookingStore.tripDetails.travelDate" type="date" :class="inputClasses" />
              <p v-if="bookingStore.stepErrors.travelDate" :class="errorClasses">{{ bookingStore.stepErrors.travelDate }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label :class="labelClasses">Number of Adults *</label>
              <select v-model.number="bookingStore.tripDetails.adults" :class="inputClasses">
                <option v-for="n in adultsOptions" :key="n" :value="n">{{ n === 7 ? '7+ Adults' : `${n} Adult${n > 1 ? 's' : ''}` }}</option>
              </select>
              <p v-if="bookingStore.stepErrors.adults" :class="errorClasses">{{ bookingStore.stepErrors.adults }}</p>
            </div>
            <div>
              <label :class="labelClasses">Number of Children</label>
              <select v-model.number="bookingStore.tripDetails.children" :class="inputClasses">
                <option v-for="n in childrenOptions" :key="n" :value="n">
                  {{ n === 0 ? 'None' : n === 4 ? '4+ Children' : `${n} Child${n > 1 ? 'ren' : ''}` }}
                </option>
              </select>
            </div>
            <div>
              <label :class="labelClasses">Length of Stay *</label>
              <select v-model="bookingStore.tripDetails.lengthOfStay" :class="inputClasses">
                <option value="" disabled>Select duration</option>
                <option v-for="option in lengthOfStayOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
              <p v-if="bookingStore.stepErrors.lengthOfStay" :class="errorClasses">{{ bookingStore.stepErrors.lengthOfStay }}</p>
            </div>
          </div>

          <div>
            <label :class="labelClasses">Special Requests</label>
            <textarea
              v-model="bookingStore.tripDetails.specialRequests"
              rows="3"
              placeholder="Tell us about your preferences, special needs or anything else we should know..."
              :class="inputClasses"
            />
          </div>
        </div>
      </div>

      <!-- Step 2: Your Details -->
      <div v-else-if="bookingStore.currentStep === 2">
        <div class="flex items-start gap-4">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade font-heading text-sm font-semibold text-white shadow-soft"
          >
            2
          </span>
          <div>
            <h2 class="font-heading text-2xl font-semibold text-romara-green sm:text-display-sm">Your Details</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-romara-ink-soft">
              So we know who we're preparing this trip for, and how to reach you.
            </p>
          </div>
        </div>
        <span class="accent-rule mt-6" />

        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label :class="labelClasses">Full Name *</label>
            <input v-model="bookingStore.yourDetails.fullName" type="text" placeholder="Jane Wanjiru" :class="inputClasses" />
            <p v-if="bookingStore.stepErrors.fullName" :class="errorClasses">{{ bookingStore.stepErrors.fullName }}</p>
          </div>
          <div>
            <label :class="labelClasses">Email Address *</label>
            <input v-model="bookingStore.yourDetails.email" type="email" placeholder="jane@example.com" :class="inputClasses" />
            <p v-if="bookingStore.stepErrors.email" :class="errorClasses">{{ bookingStore.stepErrors.email }}</p>
          </div>
          <div>
            <label :class="labelClasses">Phone Number *</label>
            <input v-model="bookingStore.yourDetails.phone" type="tel" placeholder="+254 700 123 456" :class="inputClasses" />
            <p v-if="bookingStore.stepErrors.phone" :class="errorClasses">{{ bookingStore.stepErrors.phone }}</p>
          </div>
          <div class="sm:col-span-2">
            <label :class="labelClasses">Country / Nationality</label>
            <input v-model="bookingStore.yourDetails.country" type="text" placeholder="e.g. United Kingdom" :class="inputClasses" />
          </div>
        </div>
      </div>

      <!-- Step 3: Additional Information -->
      <div v-else-if="bookingStore.currentStep === 3">
        <div class="flex items-start gap-4">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade font-heading text-sm font-semibold text-white shadow-soft"
          >
            3
          </span>
          <div>
            <h2 class="font-heading text-2xl font-semibold text-romara-green sm:text-display-sm">Additional Information</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-romara-ink-soft">
              Optional — but this helps us tailor every detail of your trip.
            </p>
          </div>
        </div>
        <span class="accent-rule mt-6" />

        <div class="mt-8 space-y-6">
          <div>
            <label :class="labelClasses">Preferred Accommodation Level</label>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="level in (['luxury', 'mid-range', 'budget'] as const)"
                :key="level"
                type="button"
                class="rounded-lg px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ease-out-expo"
                :class="
                  bookingStore.additionalInfo.preferredAccommodation === level
                    ? 'bg-romara-green text-white shadow-soft'
                    : 'border border-romara-green/15 bg-romara-bone text-romara-ink-soft hover:border-romara-amber/40 hover:text-romara-green'
                "
                @click="bookingStore.additionalInfo.preferredAccommodation = level"
              >
                {{ level === 'mid-range' ? 'Mid-Range' : level.charAt(0).toUpperCase() + level.slice(1) }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label :class="labelClasses">Dietary Requirements</label>
              <input v-model="bookingStore.additionalInfo.dietaryRequirements" type="text" placeholder="e.g. vegetarian, gluten-free" :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Celebrating a Special Occasion?</label>
              <input v-model="bookingStore.additionalInfo.celebratingOccasion" type="text" placeholder="e.g. honeymoon, anniversary" :class="inputClasses" />
            </div>
          </div>

          <div>
            <label :class="labelClasses">Accessibility Requirements</label>
            <input v-model="bookingStore.additionalInfo.accessibilityRequirements" type="text" placeholder="Let us know how we can accommodate you" :class="inputClasses" />
          </div>

          <label class="flex cursor-pointer items-center gap-3 rounded-card border border-romara-green/15 bg-romara-bone p-4 text-sm text-romara-ink transition-all duration-300 ease-out-expo hover:border-romara-amber/30 hover:shadow-soft">
            <input v-model="bookingStore.additionalInfo.airportPickupRequired" type="checkbox" class="h-5 w-5 rounded border-romara-green/30 text-romara-green focus:ring-2 focus:ring-romara-green/20" />
            <span class="font-medium">Airport pickup required</span>
          </label>
        </div>
      </div>

      <!-- Step 4: Review & Confirm -->
      <div v-else-if="bookingStore.currentStep === 4">
        <div class="flex items-start gap-4">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade font-heading text-sm font-semibold text-white shadow-soft"
          >
            4
          </span>
          <div>
            <h2 class="font-heading text-2xl font-semibold text-romara-green sm:text-display-sm">Review &amp; Confirm</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-romara-ink-soft">
              Please check your details below before submitting your booking request.
            </p>
          </div>
        </div>
        <span class="accent-rule mt-6" />

        <div class="mt-8 space-y-6">
          <div class="rounded-card border border-romara-green/10 bg-romara-bone p-6">
            <p class="eyebrow mb-4">
              
              Trip Details
            </p>
            <dl class="space-y-2.5 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Service</dt><dd class="font-semibold text-romara-green">{{ serviceLabel }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Travel Type</dt><dd class="font-semibold text-romara-green">{{ travelTypeLabel }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Destination</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.destination || '—' }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Travel Date</dt><dd class="font-semibold text-romara-green">{{ formatDate(bookingStore.tripDetails.travelDate) }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Adults</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.adults }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Children</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.children }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Length of Stay</dt><dd class="font-semibold text-romara-green">{{ lengthOfStayLabel }}</dd></div>
              <div v-if="bookingStore.tripDetails.specialRequests" class="border-t border-romara-green/10 pt-2.5">
                <dt class="text-romara-ink-soft">Special Requests</dt>
                <dd class="mt-1 leading-relaxed text-romara-ink">{{ bookingStore.tripDetails.specialRequests }}</dd>
              </div>
            </dl>
          </div>

          <div class="rounded-card border border-romara-green/10 bg-romara-bone p-6">
            <p class="eyebrow mb-4">
              
              Your Details
            </p>
            <dl class="space-y-2.5 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Full Name</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.fullName }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Email</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.email }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Phone</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.phone }}</dd></div>
              <div v-if="bookingStore.yourDetails.country" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Country</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.country }}</dd></div>
            </dl>
          </div>

          <div
            v-if="bookingStore.additionalInfo.preferredAccommodation || bookingStore.additionalInfo.dietaryRequirements || bookingStore.additionalInfo.celebratingOccasion || bookingStore.additionalInfo.accessibilityRequirements || bookingStore.additionalInfo.airportPickupRequired"
            class="rounded-card border border-romara-green/10 bg-romara-bone p-6"
          >
            <p class="eyebrow mb-4">
              
              Additional Information
            </p>
            <dl class="space-y-2.5 text-sm">
              <div v-if="bookingStore.additionalInfo.preferredAccommodation" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Accommodation</dt><dd class="font-semibold capitalize text-romara-green">{{ bookingStore.additionalInfo.preferredAccommodation }}</dd></div>
              <div v-if="bookingStore.additionalInfo.dietaryRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Dietary</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.dietaryRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.celebratingOccasion" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Occasion</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.celebratingOccasion }}</dd></div>
              <div v-if="bookingStore.additionalInfo.accessibilityRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Accessibility</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.accessibilityRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.airportPickupRequired" class="flex justify-between gap-4"><dt class="text-romara-ink-soft">Airport Pickup</dt><dd class="font-semibold text-romara-green">Required</dd></div>
            </dl>
          </div>

          <div class="rounded-card border border-romara-green/15 bg-romara-cream p-5">
            <label class="flex items-start gap-3 text-sm text-romara-ink">
              <input v-model="bookingStore.agreedToTerms" type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 rounded border-romara-green/30 text-romara-green focus:ring-2 focus:ring-romara-green/20" />
              <span class="leading-relaxed">I confirm the above details are correct and agree to be contacted by ROMARA Tours &amp; Travel regarding this request.</span>
            </label>
            <p v-if="bookingStore.stepErrors.agreedToTerms" :class="errorClasses">{{ bookingStore.stepErrors.agreedToTerms }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-10 flex items-center justify-between gap-4 border-t border-romara-green/10 pt-8">
        <BaseButton v-if="bookingStore.currentStep > 1" variant="outline" @click="bookingStore.goToPreviousStep">
          Back
        </BaseButton>
        <span v-else />

        <BaseButton v-if="!bookingStore.isLastStep" variant="primary" @click="bookingStore.goToNextStep">
          Next Step
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
        <BaseButton v-else variant="amber" :loading="bookingStore.isSubmitting" :disabled="bookingStore.isSubmitting" @click="bookingStore.submitBooking">
          {{ bookingStore.isSubmitting ? 'Submitting...' : 'Submit Booking Request' }}
          <IconArrowRight v-if="!bookingStore.isSubmitting" class="h-4 w-4" />
        </BaseButton>
      </div>

      <div class="mt-6 flex items-center justify-center gap-2 text-xs text-romara-ink-soft">
        <IconLock class="h-4 w-4 text-romara-green" />
        <span>Your booking is secure and your details are protected.</span>
      </div>
    </template>
  </div>
</template>
