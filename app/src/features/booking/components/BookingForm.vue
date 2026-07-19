<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import { useBookingStore } from '@/features/booking/store/booking.store'
import {
  destinationOptions,
  lengthOfStayOptions,
  serviceOptions,
  travelTypeOptions,
} from '@/features/booking/api/booking.api'

const bookingStore = useBookingStore()

const inputClasses =
  'w-full rounded-md border border-black/10 bg-white px-4 py-2.5 text-sm text-romara-ink placeholder:text-romara-ink/40 transition-colors focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/15'
const labelClasses = 'mb-1.5 block text-sm text-romara-ink'
const errorClasses = 'mt-1 text-xs text-red-600'

const adultsOptions = [1, 2, 3, 4, 5, 6, 7]
const childrenOptions = [0, 1, 2, 3, 4]

const serviceLabel = computed(() => serviceOptions.find((o) => o.value === bookingStore.tripDetails.service)?.label ?? '—')
const travelTypeLabel = computed(() => travelTypeOptions.find((o) => o.value === bookingStore.tripDetails.travelType)?.label ?? '—')
const lengthOfStayLabel = computed(() => lengthOfStayOptions.find((o) => o.value === bookingStore.tripDetails.lengthOfStay)?.label ?? '—')

function formatDate(isoDate: string) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="rounded-lg bg-white p-6 shadow-card sm:p-8">
    <!-- Confirmation state, replaces the whole form -->
    <div v-if="bookingStore.isSubmitted" class="py-6 text-center">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-romara-cream text-romara-green">
        <IconCheckSquare class="h-7 w-7" />
      </span>
      <h2 class="mt-4 text-xl font-bold text-romara-green">Booking request submitted!</h2>
      <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-romara-ink/70">
        Thank you for choosing ROMARA Tours &amp; Travel. A confirmation email is on its way, and our
        reservations team will follow up shortly to finalize your trip.
      </p>
      <button
        type="button"
        class="mt-5 text-sm font-semibold text-romara-green underline hover:text-romara-amber"
        @click="bookingStore.resetBooking"
      >
        Start a new booking
      </button>
    </div>

    <template v-else>
      <!-- Step 1: Trip Details -->
      <div v-if="bookingStore.currentStep === 1">
        <h2 class="text-xl font-bold text-romara-green">Let's Plan Your Trip</h2>
        <p class="mt-1 text-sm text-romara-ink/60">Tell us about your travel plans and we'll create the perfect experience for you.</p>

        <div class="mt-6 space-y-5">
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

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
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
        <h2 class="text-xl font-bold text-romara-green">Your Details</h2>
        <p class="mt-1 text-sm text-romara-ink/60">So we know who we're preparing this trip for, and how to reach you.</p>

        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
            <input v-model="bookingStore.yourDetails.phone" type="tel" placeholder="+254 700 000 000" :class="inputClasses" />
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
        <h2 class="text-xl font-bold text-romara-green">Additional Information</h2>
        <p class="mt-1 text-sm text-romara-ink/60">Optional — but this helps us tailor every detail of your trip.</p>

        <div class="mt-6 space-y-5">
          <div>
            <label :class="labelClasses">Preferred Accommodation Level</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="level in (['luxury', 'mid-range', 'budget'] as const)"
                :key="level"
                type="button"
                class="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
                :class="
                  bookingStore.additionalInfo.preferredAccommodation === level
                    ? 'bg-romara-green text-white'
                    : 'bg-white text-romara-ink border border-black/10 hover:border-romara-green'
                "
                @click="bookingStore.additionalInfo.preferredAccommodation = level"
              >
                {{ level === 'mid-range' ? 'Mid-Range' : level.charAt(0).toUpperCase() + level.slice(1) }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

          <label class="flex items-center gap-2.5 text-sm text-romara-ink/70">
            <input v-model="bookingStore.additionalInfo.airportPickupRequired" type="checkbox" class="h-4 w-4 rounded border-black/20 text-romara-green focus:ring-romara-green" />
            Airport pickup required
          </label>
        </div>
      </div>

      <!-- Step 4: Review & Confirm -->
      <div v-else-if="bookingStore.currentStep === 4">
        <h2 class="text-xl font-bold text-romara-green">Review &amp; Confirm</h2>
        <p class="mt-1 text-sm text-romara-ink/60">Please check your details below before submitting your booking request.</p>

        <div class="mt-6 space-y-6">
          <div class="rounded-lg bg-romara-cream p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-romara-amber">Trip Details</p>
            <dl class="mt-3 space-y-2 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Service</dt><dd class="font-semibold text-romara-green">{{ serviceLabel }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Travel Type</dt><dd class="font-semibold text-romara-green">{{ travelTypeLabel }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Destination</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.destination || '—' }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Travel Date</dt><dd class="font-semibold text-romara-green">{{ formatDate(bookingStore.tripDetails.travelDate) }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Adults</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.adults }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Children</dt><dd class="font-semibold text-romara-green">{{ bookingStore.tripDetails.children }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Length of Stay</dt><dd class="font-semibold text-romara-green">{{ lengthOfStayLabel }}</dd></div>
              <div v-if="bookingStore.tripDetails.specialRequests" class="pt-1">
                <dt class="text-romara-ink/60">Special Requests</dt>
                <dd class="mt-1 text-romara-ink/80">{{ bookingStore.tripDetails.specialRequests }}</dd>
              </div>
            </dl>
          </div>

          <div class="rounded-lg bg-romara-cream p-5">
            <p class="text-xs font-bold uppercase tracking-wide text-romara-amber">Your Details</p>
            <dl class="mt-3 space-y-2 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Full Name</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.fullName }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Email</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.email }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Phone</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.phone }}</dd></div>
              <div v-if="bookingStore.yourDetails.country" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Country</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.country }}</dd></div>
            </dl>
          </div>

          <div
            v-if="bookingStore.additionalInfo.preferredAccommodation || bookingStore.additionalInfo.dietaryRequirements || bookingStore.additionalInfo.celebratingOccasion || bookingStore.additionalInfo.accessibilityRequirements || bookingStore.additionalInfo.airportPickupRequired"
            class="rounded-lg bg-romara-cream p-5"
          >
            <p class="text-xs font-bold uppercase tracking-wide text-romara-amber">Additional Information</p>
            <dl class="mt-3 space-y-2 text-sm">
              <div v-if="bookingStore.additionalInfo.preferredAccommodation" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Accommodation</dt><dd class="font-semibold capitalize text-romara-green">{{ bookingStore.additionalInfo.preferredAccommodation }}</dd></div>
              <div v-if="bookingStore.additionalInfo.dietaryRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Dietary</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.dietaryRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.celebratingOccasion" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Occasion</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.celebratingOccasion }}</dd></div>
              <div v-if="bookingStore.additionalInfo.accessibilityRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Accessibility</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.accessibilityRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.airportPickupRequired" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Airport Pickup</dt><dd class="font-semibold text-romara-green">Required</dd></div>
            </dl>
          </div>

          <div>
            <label class="flex items-start gap-2.5 text-sm text-romara-ink/70">
              <input v-model="bookingStore.agreedToTerms" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-romara-green focus:ring-romara-green" />
              <span>I confirm the above details are correct and agree to be contacted by ROMARA Tours &amp; Travel regarding this request.</span>
            </label>
            <p v-if="bookingStore.stepErrors.agreedToTerms" :class="errorClasses">{{ bookingStore.stepErrors.agreedToTerms }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="mt-8 flex items-center justify-between gap-3">
        <BaseButton v-if="bookingStore.currentStep > 1" variant="outline" @click="bookingStore.goToPreviousStep">
          Back
        </BaseButton>
        <span v-else />

        <BaseButton v-if="!bookingStore.isLastStep" variant="primary" @click="bookingStore.goToNextStep">
          Next Step
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
        <BaseButton v-else variant="amber" :disabled="bookingStore.isSubmitting" @click="bookingStore.submitBooking">
          {{ bookingStore.isSubmitting ? 'Submitting...' : 'Submit Booking Request' }}
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>

      <p class="mt-4 text-center text-xs text-romara-ink/50">🔒 Your booking is secure and your details are protected.</p>
    </template>
  </div>
</template>