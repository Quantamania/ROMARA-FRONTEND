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
  'w-full rounded-lg border border-romara-green/20 bg-white px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink/40 transition-all duration-200 focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20 focus:shadow-lg focus:shadow-romara-green/10'
const labelClasses = 'mb-2 block text-sm font-semibold text-romara-green-dark'
const errorClasses = 'mt-2 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded inline-block'

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
  <div class="relative bg-gradient-to-br from-white via-romara-cream/20 to-romara-cream/40 shadow-2xl shadow-romara-green/10 p-6 sm:p-8 border border-romara-green/10 rounded-2xl overflow-hidden">
    <!-- Creative background elements -->
    <div class="top-0 right-0 absolute bg-romara-green/5 blur-3xl rounded-full w-64 h-64 -translate-y-1/2 translate-x-1/2"></div>
    <div class="bottom-0 left-0 absolute bg-romara-amber/5 blur-3xl rounded-full w-48 h-48 -translate-x-1/2 translate-y-1/2"></div>
    <div class="top-1/4 left-1/4 absolute bg-romara-green/20 rounded-full w-2 h-2"></div>
    <div class="top-1/3 right-1/3 absolute bg-romara-amber/20 rounded-full w-3 h-3"></div>
    <div class="right-1/4 bottom-1/4 absolute bg-romara-green/30 rounded-full w-2 h-2"></div>
    <!-- Confirmation state, replaces the whole form -->
    <div v-if="bookingStore.isSubmitted" class="z-10 relative py-12 text-center">
      <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-romara-green/30 shadow-xl mx-auto rounded-full w-20 h-20 text-white">
        <IconCheckSquare class="w-10 h-10" />
      </div>
      <h2 class="mt-6 font-heading font-bold text-romara-green text-2xl">Booking Request Submitted!</h2>
      <p class="mx-auto mt-3 max-w-md text-romara-ink/70 text-base leading-relaxed">
        Thank you for choosing ROMARA Tours &amp; Travel. A confirmation email is on its way, and our
        reservations team will follow up shortly to finalize your trip.
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-2 bg-romara-green hover:bg-romara-green-dark hover:shadow-lg hover:shadow-romara-green/30 mt-6 px-6 py-3 rounded-lg font-semibold text-white text-sm transition-all"
        @click="bookingStore.resetBooking"
      >
        <IconArrowRight class="w-4 h-4" />
        Start a New Booking
      </button>
    </div>

    <template v-else>
      <!-- Step 1: Trip Details -->
      <div v-if="bookingStore.currentStep === 1" class="z-10 relative">
        <div class="flex items-center gap-4 mb-3">
          <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-lg shadow-romara-green/20 rounded-full w-10 h-10 font-bold text-white text-sm">1</div>
          <div>
            <h2 class="font-heading font-bold text-romara-green-dark text-2xl">Let's Plan Your Trip</h2>
            <div class="bg-gradient-to-r from-romara-green to-romara-amber mt-1 rounded w-16 h-1"></div>
          </div>
        </div>
        <p class="ml-14 text-romara-ink/60 text-sm">Tell us about your travel plans and we'll create the perfect experience for you.</p>

        <div class="space-y-5 mt-6">
          <div class="group">
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

          <div class="gap-5 grid grid-cols-1 sm:grid-cols-2">
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

          <div class="gap-5 grid grid-cols-1 sm:grid-cols-3">
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
      <div v-else-if="bookingStore.currentStep === 2" class="z-10 relative">
        <div class="flex items-center gap-4 mb-3">
          <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-lg shadow-romara-green/20 rounded-full w-10 h-10 font-bold text-white text-sm">2</div>
          <div>
            <h2 class="font-heading font-bold text-romara-green-dark text-2xl">Your Details</h2>
            <div class="bg-gradient-to-r from-romara-green to-romara-amber mt-1 rounded w-16 h-1"></div>
          </div>
        </div>
        <p class="ml-14 text-romara-ink/60 text-sm">So we know who we're preparing this trip for, and how to reach you.</p>

        <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 mt-8">
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
      <div v-else-if="bookingStore.currentStep === 3" class="z-10 relative">
        <div class="flex items-center gap-4 mb-3">
          <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-lg shadow-romara-green/20 rounded-full w-10 h-10 font-bold text-white text-sm">3</div>
          <div>
            <h2 class="font-heading font-bold text-romara-green-dark text-2xl">Additional Information</h2>
            <div class="bg-gradient-to-r from-romara-green to-romara-amber mt-1 rounded w-16 h-1"></div>
          </div>
        </div>
        <p class="ml-14 text-romara-ink/60 text-sm">Optional — but this helps us tailor every detail of your trip.</p>

        <div class="space-y-5 mt-6">
          <div>
            <label :class="labelClasses">Preferred Accommodation Level</label>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="level in (['luxury', 'mid-range', 'budget'] as const)"
                :key="level"
                type="button"
                class="px-5 py-3 rounded-lg font-semibold text-xs uppercase tracking-wide transition-all duration-200"
                :class="
                  bookingStore.additionalInfo.preferredAccommodation === level
                    ? 'bg-romara-green-dark text-white'
                    : 'bg-white text-romara-ink border-2 border-romara-green-dark/30 hover:border-romara-green-dark'
                "
                @click="bookingStore.additionalInfo.preferredAccommodation = level"
              >
                {{ level === 'mid-range' ? 'Mid-Range' : level.charAt(0).toUpperCase() + level.slice(1) }}
              </button>
            </div>
          </div>

          <div class="gap-5 grid grid-cols-1 sm:grid-cols-2">
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

          <label class="flex items-center gap-3 bg-romara-green/5 hover:bg-romara-green/10 p-4 border border-romara-green/20 hover:border-romara-green/40 rounded-lg text-romara-ink/80 text-sm transition-all cursor-pointer">
            <input v-model="bookingStore.additionalInfo.airportPickupRequired" type="checkbox" class="border-romara-green/30 rounded focus:ring-2 focus:ring-romara-green/20 w-5 h-5 text-romara-green" />
            <span class="font-medium">Airport pickup required</span>
          </label>
        </div>
      </div>

      <!-- Step 4: Review & Confirm -->
      <div v-else-if="bookingStore.currentStep === 4" class="z-10 relative">
        <div class="flex items-center gap-4 mb-3">
          <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-lg shadow-romara-green/20 rounded-full w-10 h-10 font-bold text-white text-sm">4</div>
          <div>
            <h2 class="font-heading font-bold text-romara-green-dark text-2xl">Review &amp; Confirm</h2>
            <div class="bg-gradient-to-r from-romara-green to-romara-amber mt-1 rounded w-16 h-1"></div>
          </div>
        </div>
        <p class="ml-14 text-romara-ink/60 text-sm">Please check your details below before submitting your booking request.</p>

        <div class="space-y-6 mt-8">
          <div class="bg-gradient-to-br from-romara-cream to-white shadow-sm p-6 border border-romara-green/10 rounded-xl">
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-romara-amber rounded w-8 h-1"></div>
              <p class="font-bold text-romara-green text-xs uppercase tracking-widest">Trip Details</p>
            </div>
            <dl class="space-y-2 mt-3 text-sm">
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

          <div class="bg-gradient-to-br from-romara-cream to-white shadow-sm p-6 border border-romara-green/10 rounded-xl">
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-romara-amber rounded w-8 h-1"></div>
              <p class="font-bold text-romara-green text-xs uppercase tracking-widest">Your Details</p>
            </div>
            <dl class="space-y-2 mt-3 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Full Name</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.fullName }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Email</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.email }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-romara-ink/60">Phone</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.phone }}</dd></div>
              <div v-if="bookingStore.yourDetails.country" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Country</dt><dd class="font-semibold text-romara-green">{{ bookingStore.yourDetails.country }}</dd></div>
            </dl>
          </div>

          <div
            v-if="bookingStore.additionalInfo.preferredAccommodation || bookingStore.additionalInfo.dietaryRequirements || bookingStore.additionalInfo.celebratingOccasion || bookingStore.additionalInfo.accessibilityRequirements || bookingStore.additionalInfo.airportPickupRequired"
            class="bg-gradient-to-br from-romara-cream to-white shadow-sm p-6 border border-romara-green/10 rounded-xl"
          >
            <div class="flex items-center gap-2 mb-4">
              <div class="bg-romara-amber rounded w-8 h-1"></div>
              <p class="font-bold text-romara-green text-xs uppercase tracking-widest">Additional Information</p>
            </div>
            <dl class="space-y-2 mt-3 text-sm">
              <div v-if="bookingStore.additionalInfo.preferredAccommodation" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Accommodation</dt><dd class="font-semibold text-romara-green capitalize">{{ bookingStore.additionalInfo.preferredAccommodation }}</dd></div>
              <div v-if="bookingStore.additionalInfo.dietaryRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Dietary</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.dietaryRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.celebratingOccasion" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Occasion</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.celebratingOccasion }}</dd></div>
              <div v-if="bookingStore.additionalInfo.accessibilityRequirements" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Accessibility</dt><dd class="font-semibold text-romara-green">{{ bookingStore.additionalInfo.accessibilityRequirements }}</dd></div>
              <div v-if="bookingStore.additionalInfo.airportPickupRequired" class="flex justify-between gap-4"><dt class="text-romara-ink/60">Airport Pickup</dt><dd class="font-semibold text-romara-green">Required</dd></div>
            </dl>
          </div>

          <div class="bg-romara-green/5 p-4 border border-romara-green/20 rounded-lg">
            <label class="flex items-start gap-3 text-romara-ink/80 text-sm">
              <input v-model="bookingStore.agreedToTerms" type="checkbox" class="mt-0.5 border-romara-green/30 rounded focus:ring-2 focus:ring-romara-green/20 w-5 h-5 text-romara-green shrink-0" />
              <span class="leading-relaxed">I confirm the above details are correct and agree to be contacted by ROMARA Tours &amp; Travel regarding this request.</span>
            </label>
            <p v-if="bookingStore.stepErrors.agreedToTerms" :class="errorClasses">{{ bookingStore.stepErrors.agreedToTerms }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="z-10 relative flex justify-between items-center gap-4 mt-10 pt-6 border-romara-green/10 border-t">
        <BaseButton v-if="bookingStore.currentStep > 1" variant="outline" @click="bookingStore.goToPreviousStep">
          Back
        </BaseButton>
        <span v-else />

        <BaseButton v-if="!bookingStore.isLastStep" variant="primary" @click="bookingStore.goToNextStep">
          Next Step
          <IconArrowRight class="w-4 h-4" />
        </BaseButton>
        <BaseButton v-else variant="amber" :disabled="bookingStore.isSubmitting" @click="bookingStore.submitBooking">
          {{ bookingStore.isSubmitting ? 'Submitting...' : 'Submit Booking Request' }}
          <IconArrowRight class="w-4 h-4" />
        </BaseButton>
      </div>

      <div class="z-10 relative flex justify-center items-center gap-2 mt-6 text-romara-ink/50 text-xs">
        <span class="text-romara-green">🔒</span>
        <span>Your booking is secure and your details are protected.</span>
      </div>
    </template>
  </div>
</template>