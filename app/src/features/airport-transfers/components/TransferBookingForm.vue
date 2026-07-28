<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { submitTransferBooking } from '@/features/airport-transfers/api/transfers.api'
import type { TransferBookingFormData } from '@/features/airport-transfers/types/transfer.types'

const inputClasses =
  'w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-romara-ink placeholder:text-romara-ink/40 transition-colors focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/15'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-romara-ink/60'
const sectionLabelClasses = 'mb-4 text-xs font-bold uppercase tracking-[0.15em] text-romara-amber'

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

const transferTypeLabels: Record<string, string> = {
  pickup: 'Airport Pick-Up',
  dropoff: 'Airport Drop-Off',
  return: 'Return Transfer',
}
const airportLabels: Record<string, string> = {
  jkia: 'JKIA',
  wilson: 'Wilson Airport',
  other: 'Other',
}
const vehicleLabels: Record<string, string> = {
  sedan: 'Standard Sedan',
  suv: 'Executive SUV',
  luxury: 'Luxury Vehicle',
  van: 'Family Van',
  shuttle: 'Group Shuttle',
  bus: 'Bus',
}
const paymentLabels: Record<string, string> = {
  'pay-on-arrival': 'Pay on Arrival',
  mpesa: 'M-Pesa',
  'bank-transfer': 'Bank Transfer',
  card: 'Credit/Debit Card',
}

const totalTravellers = computed(function getTotalTravellers() {
  return formData.adults + formData.children + formData.infants
})

const formattedDateTime = computed(function getFormattedDateTime() {
  if (!formData.travelDate) return 'Not set yet'
  const date = new Date(`${formData.travelDate}T${formData.travelTime || '00:00'}`)
  const datePart = date.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
  return formData.travelTime ? `${datePart}, ${formData.travelTime}` : datePart
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
  <!-- Confirmation state -->
  <div v-if="isSubmitted" class="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-card sm:p-12">
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

  <!-- Two-column: form + sticky summary -->
  <form v-else class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]" @submit.prevent="handleSubmit">
    <div class="space-y-8 rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <!-- Personal Information -->
      <div>
        <p :class="sectionLabelClasses">Personal Information</p>
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
      </div>

      <hr class="border-black/5" />

      <!-- Transfer Details -->
      <div>
        <p :class="sectionLabelClasses">Transfer Details</p>
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
      </div>

      <hr class="border-black/5" />

      <!-- Destination -->
      <div>
        <p :class="sectionLabelClasses">Destination</p>
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
      </div>

      <hr class="border-black/5" />

      <!-- Number of Travellers -->
      <div>
        <p :class="sectionLabelClasses">Number of Travellers</p>
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
      </div>

      <hr class="border-black/5" />

      <!-- Luggage -->
      <div>
        <p :class="sectionLabelClasses">Luggage</p>
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
      </div>

      <hr class="border-black/5" />

      <!-- Vehicle Preference -->
      <div>
        <p :class="sectionLabelClasses">Vehicle Preference</p>
        <select v-model="formData.vehiclePreference" :class="inputClasses">
          <option value="sedan">Standard Sedan</option>
          <option value="suv">Executive SUV</option>
          <option value="luxury">Luxury Vehicle</option>
          <option value="van">Family Van</option>
          <option value="shuttle">Group Shuttle</option>
          <option value="bus">Bus</option>
        </select>
      </div>

      <hr class="border-black/5" />

      <!-- Additional Requests -->
      <div>
        <p :class="sectionLabelClasses">Additional Requests</p>
        <textarea
          v-model="formData.additionalRequests"
          rows="3"
          :class="inputClasses"
          placeholder="e.g. child seat required, wheelchair assistance, meet & greet service, multiple stops"
        />
      </div>

      <hr class="border-black/5" />

      <!-- Payment Preference -->
      <div>
        <p :class="sectionLabelClasses">Payment Preference</p>
        <select v-model="formData.paymentPreference" :class="inputClasses">
          <option value="pay-on-arrival">Pay on Arrival</option>
          <option value="mpesa">M-Pesa</option>
          <option value="bank-transfer">Bank Transfer</option>
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>
    </div>

    <!-- Sticky summary -->
    <aside class="lg:self-start">
      <div class="lg:h-fit overflow-hidden rounded-2xl bg-white shadow-card" style="position: sticky; top: 6rem;">
        <div class="flex items-center gap-3 bg-romara-green px-6 py-5 text-white">
          <IconSuitcase class="h-5 w-5 text-romara-amber" />
          <h2 class="text-sm font-bold uppercase tracking-wide">Booking Summary</h2>
        </div>

        <dl class="space-y-4 px-6 py-6 text-sm">
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Transfer Type</dt>
            <dd class="text-right font-semibold text-romara-green">{{ transferTypeLabels[formData.transferType] }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Airport</dt>
            <dd class="text-right font-semibold text-romara-green">{{ airportLabels[formData.airport] }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Date &amp; Time</dt>
            <dd class="text-right font-semibold text-romara-green">{{ formattedDateTime }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Destination</dt>
            <dd class="max-w-[160px] text-right font-semibold text-romara-green">
              {{ formData.destinationAddress || 'Not set yet' }}
            </dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Travellers</dt>
            <dd class="text-right font-semibold text-romara-green">{{ totalTravellers }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Vehicle</dt>
            <dd class="text-right font-semibold text-romara-green">{{ vehicleLabels[formData.vehiclePreference] }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink/50">Payment</dt>
            <dd class="text-right font-semibold text-romara-green">{{ paymentLabels[formData.paymentPreference] }}</dd>
          </div>
        </dl>

        <div class="space-y-3 border-t border-black/5 bg-romara-cream/40 px-6 py-6">
          <BaseButton type="submit" variant="primary" class="w-full justify-center" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Book My Transfer' }}
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" class="w-full justify-center">Request a Quote</BaseButton>
          <p class="pt-1 text-center text-xs text-romara-ink/50">
            A travel consultant will confirm your reservation shortly after you submit.
          </p>
        </div>
      </div>
    </aside>
  </form>
</template>