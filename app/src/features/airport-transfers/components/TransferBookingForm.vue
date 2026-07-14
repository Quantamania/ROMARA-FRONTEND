<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconDollarCircle from '@/components/icons/IconDollarCircle.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { submitTransferBooking } from '@/features/airport-transfers/api/transfers.api'
import type { TransferBookingFormData } from '@/features/airport-transfers/types/transfer.types'

const inputClasses =
  'w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-romara-ink placeholder:text-romara-ink/40 transition-colors focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/15'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-romara-ink/60'

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const formData = reactive<TransferBookingFormData>({
  fullName: '',
  email: '',
  phone: '',
  transferType: 'pickup',
  airport: 'jkia',
  flightNumber: '',
  airline: '',
  travelDate: '',
  travelTime: '',
  destinationType: 'hotel',
  destinationAddress: '',
  adults: 1,
  children: 0,
  infants: 0,
  handLuggage: 0,
  mediumBags: 0,
  largeSuitcases: 0,
  specialEquipment: '',
  vehiclePreference: 'sedan',
  additionalRequests: '',
  paymentPreference: 'pay-on-arrival',
})

async function handleSubmit() {
  isSubmitting.value = true
  await submitTransferBooking(formData)
  isSubmitting.value = false
  isSubmitted.value = true
}

function bookAnotherTransfer() {
  isSubmitted.value = false
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <!-- Confirmation state -->
    <div v-if="isSubmitted" class="rounded-2xl bg-white p-8 text-center shadow-card sm:p-12">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-romara-cream text-romara-green">
        <IconCheckSquare class="h-7 w-7" />
      </span>
      <h2 class="mt-5 text-xl font-bold text-romara-green">Thank you for choosing ROMARA Tours &amp; Travel.</h2>
      <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-romara-ink/70">
        Your booking request has been received successfully. A travel consultant will contact you shortly to
        confirm your reservation and provide payment instructions (where applicable).
      </p>
      <button
        type="button"
        class="mt-6 text-sm font-semibold text-romara-green underline hover:text-romara-amber"
        @click="bookAnotherTransfer"
      >
        Book another transfer
      </button>
    </div>

    <!-- Booking form -->
    <form v-else class="overflow-hidden rounded-2xl bg-white shadow-card" @submit.prevent="handleSubmit">
      <div class="space-y-6 p-6 sm:p-8">
        <!-- Personal Information -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconUser class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Personal Information</legend>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label :class="labelClasses">Full Name</label>
              <input v-model="formData.fullName" type="text" required :class="inputClasses" placeholder="Jane Wanjiru" />
            </div>
            <div>
              <label :class="labelClasses">Email Address</label>
              <input v-model="formData.email" type="email" required :class="inputClasses" placeholder="jane@example.com" />
            </div>
            <div>
              <label :class="labelClasses">Phone Number (WhatsApp preferred)</label>
              <input v-model="formData.phone" type="tel" required :class="inputClasses" placeholder="+254 700 000 000" />
            </div>
          </div>
        </fieldset>

        <!-- Transfer Details -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconPlaneLanding class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Transfer Details</legend>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label :class="labelClasses">Transfer Type</label>
              <select v-model="formData.transferType" :class="inputClasses">
                <option value="pickup">Airport Pick-Up</option>
                <option value="dropoff">Airport Drop-Off</option>
                <option value="return">Return Transfer</option>
              </select>
            </div>
            <div>
              <label :class="labelClasses">Airport</label>
              <select v-model="formData.airport" :class="inputClasses">
                <option value="jkia">Jomo Kenyatta International Airport (JKIA)</option>
                <option value="wilson">Wilson Airport</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label :class="labelClasses">Flight Number</label>
              <input v-model="formData.flightNumber" type="text" :class="inputClasses" placeholder="KQ100" />
            </div>
            <div>
              <label :class="labelClasses">Airline</label>
              <input v-model="formData.airline" type="text" :class="inputClasses" placeholder="Kenya Airways" />
            </div>
            <div>
              <label :class="labelClasses">Arrival / Departure Date</label>
              <input v-model="formData.travelDate" type="date" required :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Arrival / Departure Time</label>
              <input v-model="formData.travelTime" type="time" required :class="inputClasses" />
            </div>
          </div>
        </fieldset>

        <!-- Destination -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconMapPin class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Destination</legend>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label :class="labelClasses">Destination Type</label>
              <select v-model="formData.destinationType" :class="inputClasses">
                <option value="hotel">Hotel</option>
                <option value="residence">Residence</option>
                <option value="office">Office</option>
                <option value="custom">Custom Address</option>
              </select>
            </div>
            <div>
              <label :class="labelClasses">Address / Hotel Name</label>
              <input v-model="formData.destinationAddress" type="text" required :class="inputClasses" placeholder="e.g. Sarova Stanley, Nairobi" />
            </div>
          </div>
        </fieldset>

        <!-- Number of Travellers -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconUsers class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Number of Travellers</legend>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label :class="labelClasses">Adults</label>
              <input v-model.number="formData.adults" type="number" min="0" :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Children</label>
              <input v-model.number="formData.children" type="number" min="0" :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Infants</label>
              <input v-model.number="formData.infants" type="number" min="0" :class="inputClasses" />
            </div>
          </div>
        </fieldset>

        <!-- Luggage -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconSuitcase class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Luggage</legend>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label :class="labelClasses">Hand Luggage</label>
              <input v-model.number="formData.handLuggage" type="number" min="0" :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Medium Bags</label>
              <input v-model.number="formData.mediumBags" type="number" min="0" :class="inputClasses" />
            </div>
            <div>
              <label :class="labelClasses">Large Suitcases</label>
              <input v-model.number="formData.largeSuitcases" type="number" min="0" :class="inputClasses" />
            </div>
            <div class="sm:col-span-3">
              <label :class="labelClasses">Special Equipment</label>
              <input v-model="formData.specialEquipment" type="text" :class="inputClasses" placeholder="e.g. golf clubs, surfboard" />
            </div>
          </div>
        </fieldset>

        <!-- Vehicle Preference -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconCar class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Vehicle Preference</legend>
          </div>
          <select v-model="formData.vehiclePreference" :class="inputClasses">
            <option value="sedan">Standard Sedan</option>
            <option value="suv">Executive SUV</option>
            <option value="luxury">Luxury Vehicle</option>
            <option value="van">Family Van</option>
            <option value="shuttle">Group Shuttle</option>
            <option value="bus">Bus</option>
          </select>
        </fieldset>

        <!-- Additional Requests -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconCheckSquare class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Additional Requests</legend>
          </div>
          <textarea
            v-model="formData.additionalRequests"
            rows="3"
            :class="inputClasses"
            placeholder="e.g. child seat required, wheelchair assistance, meet & greet service, multiple stops"
          />
        </fieldset>

        <!-- Payment Preference -->
        <fieldset class="rounded-xl bg-romara-cream/50 p-5 sm:p-6">
          <div class="mb-5 flex items-center gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-green text-white">
              <IconDollarCircle class="h-5 w-5" />
            </span>
            <legend class="text-base font-bold text-romara-green">Payment Preference</legend>
          </div>
          <select v-model="formData.paymentPreference" :class="inputClasses">
            <option value="pay-on-arrival">Pay on Arrival</option>
            <option value="mpesa">M-Pesa</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </fieldset>
      </div>

      <!-- Submit bar -->
      <div class="flex flex-col gap-3 border-t border-black/5 bg-romara-cream/30 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p class="text-xs text-romara-ink/50">
          A travel consultant will confirm your reservation shortly after you submit.
        </p>
        <div class="flex flex-wrap gap-3">
          <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
          <BaseButton type="submit" variant="primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Book My Transfer' }}
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>