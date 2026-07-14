<template><div>Transfer booking form</div></template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { submitTransferBooking } from '@/features/airport-transfers/api/transfers.api'
import type { TransferBookingFormData } from '@/features/airport-transfers/types/transfer.types'

const inputClasses =
  'w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm text-romara-ink placeholder:text-romara-ink/40 focus:border-romara-green focus:outline-none'
const labelClasses = 'mb-1.5 block text-sm font-medium text-romara-ink'

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
    <div v-if="isSubmitted" class="rounded-lg bg-romara-cream p-8 text-center sm:p-10">
      <h2 class="text-xl font-bold text-romara-green">Thank you for choosing ROMARA Tours &amp; Travel.</h2>
      <p class="mt-3 text-sm leading-relaxed text-romara-ink/70">
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
    <form v-else class="space-y-10" @submit.prevent="handleSubmit">
      <!-- Personal Information -->
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Personal Information</legend>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Transfer Details</legend>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Destination</legend>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Number of Travellers</legend>
        <div class="mt-4 grid grid-cols-3 gap-4">
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
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Luggage</legend>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Vehicle Preference</legend>
        <div class="mt-4">
          <select v-model="formData.vehiclePreference" :class="inputClasses">
            <option value="sedan">Standard Sedan</option>
            <option value="suv">Executive SUV</option>
            <option value="luxury">Luxury Vehicle</option>
            <option value="van">Family Van</option>
            <option value="shuttle">Group Shuttle</option>
            <option value="bus">Bus</option>
          </select>
        </div>
      </fieldset>

      <!-- Additional Requests -->
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Additional Requests</legend>
        <div class="mt-4">
          <textarea
            v-model="formData.additionalRequests"
            rows="3"
            :class="inputClasses"
            placeholder="e.g. child seat required, wheelchair assistance, meet & greet service, multiple stops"
          />
        </div>
      </fieldset>

      <!-- Payment Preference -->
      <fieldset>
        <legend class="text-lg font-bold text-romara-green">Payment Preference</legend>
        <div class="mt-4">
          <select v-model="formData.paymentPreference" :class="inputClasses">
            <option value="pay-on-arrival">Pay on Arrival</option>
            <option value="mpesa">M-Pesa</option>
            <option value="bank-transfer">Bank Transfer</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>
      </fieldset>

      <div class="flex flex-wrap gap-3">
        <BaseButton type="submit" variant="primary" size="lg" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Book My Transfer' }}
        </BaseButton>
        <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
      </div>
    </form>
  </div>
</template>