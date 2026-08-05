<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import PaymentPanel from '@/features/payments/components/PaymentPanel.vue'
import { fleet, fleetByKey, CHAUFFEUR_PER_DAY, type FleetKey } from '@/data/fleet'
import { submitVehicleHire } from '@/features/vehicle-hire/api/vehicleHire.api'
import type { VehicleHireFormData } from '@/features/vehicle-hire/types/vehicleHire.types'

const inputClasses =
  'w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink-soft/50 transition-all duration-200 focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft'
const sectionLabelClasses = 'eyebrow mb-5'

const route = useRoute()
const isSubmitting = ref(false)

// Show the photo; if it's missing, fall back to the stylised SVG graphic. The
// SPA host rewrites unknown paths to index.html (a 200, not a 404), so also treat
// a zero-width "load" as a miss.
const failedImages = ref(new Set<string>())
function onImgError(key: string) {
  failedImages.value.add(key)
}
function onImgLoad(event: Event, key: string) {
  if ((event.target as HTMLImageElement).naturalWidth === 0) failedImages.value.add(key)
}
// 'form' → fill in details, 'payment' → choose how to pay, 'done' → confirmed
const stage = ref<'form' | 'payment' | 'done'>('form')

const today = new Date().toISOString().slice(0, 10)

const formData = reactive<VehicleHireFormData>({
  fullName: '',
  email: '',
  phone: '',
  vehicle: 'cruiser',
  driverOption: 'chauffeur',
  pickupDate: '',
  returnDate: '',
  pickupLocation: '',
  dropoffSameAsPickup: true,
  dropoffLocation: '',
  passengers: 2,
  purpose: 'game-drive',
  additionalRequests: '',
})

// Deep-link from the fleet cards: /vehicle-hire?vehicle=cruiser
onMounted(function preselectVehicle() {
  const requested = route.query.vehicle
  if (typeof requested === 'string' && requested in fleetByKey) {
    formData.vehicle = requested as FleetKey
  }
})

const purposeLabels: Record<string, string> = {
  'game-drive': 'Safari / Game Drive',
  city: 'City & Business',
  'cross-country': 'Cross-Country Tour',
  event: 'Wedding / Event',
  corporate: 'Airport & Corporate',
  other: 'Other',
}

const selectedVehicle = computed(() => fleetByKey[formData.vehicle])

const hireDays = computed(function getHireDays() {
  if (!formData.pickupDate || !formData.returnDate) return 1
  const start = new Date(formData.pickupDate).getTime()
  const end = new Date(formData.returnDate).getTime()
  const diff = Math.round((end - start) / 86_400_000)
  return Math.max(1, diff || 1)
})

const driverPerDay = computed(() => (formData.driverOption === 'chauffeur' ? CHAUFFEUR_PER_DAY : 0))
const vehicleSubtotal = computed(() => selectedVehicle.value.dailyRate * hireDays.value)
const driverSubtotal = computed(() => driverPerDay.value * hireDays.value)
const estimatedTotal = computed(() => vehicleSubtotal.value + driverSubtotal.value)

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

const dropoffLabel = computed(() =>
  formData.dropoffSameAsPickup
    ? formData.pickupLocation || 'Same as pick-up'
    : formData.dropoffLocation || 'Not set yet',
)

async function handleSubmit() {
  isSubmitting.value = true
  try {
    await submitVehicleHire(formData)
  } catch (err) {
    // Non-blocking: the hire request is still captured and a consultant follows
    // up. Don't strand the guest on the form if the DB write hiccups.
    console.error('Vehicle hire request failed to persist:', err)
  } finally {
    isSubmitting.value = false
    stage.value = 'payment'
  }
}

function onPaymentDone() {
  stage.value = 'done'
}

function hireAnother() {
  stage.value = 'form'
}
</script>

<template>
  <!-- Payment state — choose how to pay after the request is submitted -->
  <div v-if="stage === 'payment'" class="mx-auto max-w-2xl">
    <PaymentPanel
      :amount="estimatedTotal"
      :phone="formData.phone"
      reference="Vehicle Hire"
      @complete="onPaymentDone"
      @skip="onPaymentDone"
    />
  </div>

  <!-- Confirmation state -->
  <div v-else-if="stage === 'done'" class="mx-auto max-w-xl rounded-card bg-white p-8 text-center shadow-elevated sm:p-12">
    <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
      <IconCheckSquare class="h-8 w-8" />
    </span>
    <h2 class="mt-6 font-heading text-2xl font-semibold text-romara-green">Your vehicle is reserved.</h2>
    <span class="accent-rule mx-auto mt-4" />
    <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
      Thank you for choosing ROMARA Tours &amp; Travel. Your hire request has been received — a consultant
      will confirm availability, driver details and the final rate shortly.
    </p>
    <button
      type="button"
      class="mt-6 text-sm font-semibold text-romara-green underline hover:text-romara-amber"
      @click="hireAnother"
    >
      Hire another vehicle
    </button>
  </div>

  <!-- Two-column: form + sticky summary -->
  <form v-else class="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px]" @submit.prevent="handleSubmit">
    <div class="space-y-8 rounded-card bg-white p-6 shadow-card sm:p-9">
      <!-- Choose your vehicle -->
      <div>
        <p :class="sectionLabelClasses">Choose Your Vehicle</p>
        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <button
            v-for="vehicle in fleet"
            :key="vehicle.key"
            type="button"
            class="group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ease-out-expo"
            :class="formData.vehicle === vehicle.key
              ? 'border-romara-amber bg-romara-amber/5 ring-1 ring-romara-amber'
              : 'border-romara-green/12 bg-white hover:border-romara-green/30 hover:bg-romara-bone'"
            :aria-pressed="formData.vehicle === vehicle.key"
            @click="formData.vehicle = vehicle.key"
          >
            <span
              class="absolute right-3 top-3 z-10 flex h-5 w-5 items-center justify-center rounded-full border transition-colors"
              :class="formData.vehicle === vehicle.key ? 'border-romara-amber bg-romara-amber text-white' : 'border-romara-green/25 bg-white'"
            >
              <IconCheck v-if="formData.vehicle === vehicle.key" class="h-3 w-3" />
            </span>
            <div class="relative h-44 overflow-hidden bg-romara-bone text-romara-green sm:h-48">
              <img
                v-if="!failedImages.has(vehicle.key)"
                :src="vehicle.image"
                :alt="vehicle.name"
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                @error="onImgError(vehicle.key)"
                @load="onImgLoad($event, vehicle.key)"
              />
              <div v-else class="flex h-full items-center justify-center px-6">
                <div class="w-full max-w-[220px] transition-transform duration-500 ease-out-expo group-hover:scale-105" v-html="vehicle.svg" />
              </div>
              <span class="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-romara-green/95 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                <IconUsers class="h-3 w-3 text-romara-amber-300" />{{ vehicle.capacity }}
              </span>
            </div>
            <div class="flex flex-1 items-center justify-between gap-2 p-4">
              <span class="font-heading text-sm font-semibold text-romara-green">{{ vehicle.name }}</span>
              <span class="shrink-0 text-right leading-none">
                <span class="block text-[10px] font-medium uppercase tracking-[0.1em] text-romara-ink-soft">From</span>
                <span class="mt-0.5 block font-heading text-sm font-semibold text-romara-green">KES {{ formatPrice(vehicle.dailyRate) }}</span>
              </span>
            </div>
          </button>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Driver option -->
      <div>
        <p :class="sectionLabelClasses">Driver</p>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            class="flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ease-out-expo"
            :class="formData.driverOption === 'chauffeur'
              ? 'border-romara-amber bg-romara-amber/5 ring-1 ring-romara-amber'
              : 'border-romara-green/12 bg-white hover:border-romara-green/30 hover:bg-romara-bone'"
            :aria-pressed="formData.driverOption === 'chauffeur'"
            @click="formData.driverOption = 'chauffeur'"
          >
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
              :class="formData.driverOption === 'chauffeur' ? 'bg-romara-amber text-white' : 'bg-romara-green/5 text-romara-green'"
            >
              <IconUserCheck class="h-5 w-5" />
            </span>
            <span class="min-w-0">
              <span class="block font-heading text-sm font-semibold text-romara-green">With Chauffeur</span>
              <span class="mt-0.5 block text-xs text-romara-ink-soft">Professional driver + fuel guidance</span>
            </span>
          </button>

          <button
            type="button"
            class="flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ease-out-expo"
            :class="formData.driverOption === 'self-drive'
              ? 'border-romara-amber bg-romara-amber/5 ring-1 ring-romara-amber'
              : 'border-romara-green/12 bg-white hover:border-romara-green/30 hover:bg-romara-bone'"
            :aria-pressed="formData.driverOption === 'self-drive'"
            @click="formData.driverOption = 'self-drive'"
          >
            <span
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
              :class="formData.driverOption === 'self-drive' ? 'bg-romara-amber text-white' : 'bg-romara-green/5 text-romara-green'"
            >
              <IconCar class="h-5 w-5" />
            </span>
            <span class="min-w-0">
              <span class="block font-heading text-sm font-semibold text-romara-green">Self-Drive</span>
              <span class="mt-0.5 block text-xs text-romara-ink-soft">Drive yourself, licence required</span>
            </span>
          </button>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Personal information -->
      <div>
        <p :class="sectionLabelClasses">Your Details</p>
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
            <input v-model="formData.phone" type="tel" required :class="inputClasses" placeholder="+254 700 123 456" />
          </div>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Hire period -->
      <div>
        <p :class="sectionLabelClasses">Hire Period</p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label :class="labelClasses">Pick-Up Date</label>
            <input v-model="formData.pickupDate" type="date" required :min="today" :class="inputClasses" />
          </div>
          <div>
            <label :class="labelClasses">Return Date</label>
            <input v-model="formData.returnDate" type="date" required :min="formData.pickupDate || today" :class="inputClasses" />
          </div>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Locations -->
      <div>
        <p :class="sectionLabelClasses">Pick-Up &amp; Drop-Off</p>
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label :class="labelClasses">Pick-Up Location</label>
            <input v-model="formData.pickupLocation" type="text" required :class="inputClasses" placeholder="e.g. JKIA, Nairobi CBD, your hotel" />
          </div>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-romara-ink">
            <input v-model="formData.dropoffSameAsPickup" type="checkbox" class="h-4 w-4 rounded border-romara-green/30 text-romara-amber focus:ring-romara-amber/30" />
            Return the vehicle to the same location
          </label>
          <div v-if="!formData.dropoffSameAsPickup">
            <label :class="labelClasses">Drop-Off Location</label>
            <input v-model="formData.dropoffLocation" type="text" :class="inputClasses" placeholder="e.g. Mombasa, Nakuru" />
          </div>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Party & purpose -->
      <div>
        <p :class="sectionLabelClasses">Trip Details</p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label :class="labelClasses">Passengers</label>
            <input v-model.number="formData.passengers" type="number" min="1" :max="selectedVehicle.seats" :class="inputClasses" />
          </div>
          <div>
            <label :class="labelClasses">Purpose of Hire</label>
            <select v-model="formData.purpose" :class="inputClasses">
              <option value="game-drive">Safari / Game Drive</option>
              <option value="city">City &amp; Business</option>
              <option value="cross-country">Cross-Country Tour</option>
              <option value="event">Wedding / Event</option>
              <option value="corporate">Airport &amp; Corporate</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <hr class="border-romara-green/10" />

      <!-- Additional requests -->
      <div>
        <p :class="sectionLabelClasses">Additional Requests</p>
        <textarea
          v-model="formData.additionalRequests"
          rows="3"
          :class="inputClasses"
          placeholder="e.g. child seat, roof rack, camping gear, extra driver, cross-border permit"
        />
      </div>
    </div>

    <!-- Sticky summary — stays visible while the form scrolls -->
    <aside class="lg:sticky lg:top-24 lg:self-start">
      <div class="overflow-hidden rounded-card bg-white shadow-elevated">
        <div class="flex items-center gap-3 bg-green-fade px-6 py-5 text-white">
          <IconCar class="h-5 w-5 text-romara-amber-300" />
          <h2 class="font-heading text-sm font-semibold uppercase tracking-[0.14em]">Hire Summary</h2>
        </div>

        <!-- Selected vehicle preview + details -->
        <div class="border-b border-romara-green/10 bg-romara-bone px-6 py-5 text-romara-green">
          <div class="flex items-center gap-3">
            <img
              v-if="!failedImages.has(selectedVehicle.key)"
              :src="selectedVehicle.image"
              :alt="selectedVehicle.name"
              class="h-12 w-16 shrink-0 rounded-lg object-cover"
              @error="onImgError(selectedVehicle.key)"
              @load="onImgLoad($event, selectedVehicle.key)"
            />
            <div v-else class="h-12 w-16 shrink-0" v-html="selectedVehicle.svg" />
            <div class="min-w-0">
              <p class="font-heading text-sm font-semibold text-romara-green">{{ selectedVehicle.name }}</p>
              <p class="text-xs text-romara-ink-soft">
                From <span class="font-semibold text-romara-green">KES {{ formatPrice(selectedVehicle.dailyRate) }}</span> / day
              </p>
            </div>
          </div>

          <p class="mt-3 text-xs leading-relaxed text-romara-ink-soft">{{ selectedVehicle.desc }}</p>

          <dl class="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            <div class="flex items-center gap-1.5">
              <IconUsers class="h-3.5 w-3.5 text-romara-amber" />
              <dt class="sr-only">Capacity</dt>
              <dd class="text-xs font-medium text-romara-green">{{ selectedVehicle.capacity }}</dd>
            </div>
            <div class="flex items-center gap-1.5">
              <IconUserCheck class="h-3.5 w-3.5 text-romara-amber" />
              <dt class="sr-only">Seats</dt>
              <dd class="text-xs font-medium text-romara-green">Up to {{ selectedVehicle.seats }} seats</dd>
            </div>
          </dl>
        </div>

        <dl class="space-y-4 px-6 py-6 text-sm">
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink-soft">Driver</dt>
            <dd class="text-right font-semibold text-romara-green">
              {{ formData.driverOption === 'chauffeur' ? 'With Chauffeur' : 'Self-Drive' }}
            </dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink-soft">Pick-Up</dt>
            <dd class="max-w-[160px] text-right font-semibold text-romara-green">{{ formData.pickupLocation || 'Not set yet' }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink-soft">Drop-Off</dt>
            <dd class="max-w-[160px] text-right font-semibold text-romara-green">{{ dropoffLabel }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink-soft">Purpose</dt>
            <dd class="text-right font-semibold text-romara-green">{{ purposeLabels[formData.purpose] }}</dd>
          </div>
          <div class="flex items-start justify-between gap-3">
            <dt class="text-romara-ink-soft">Passengers</dt>
            <dd class="text-right font-semibold text-romara-green">{{ formData.passengers }}</dd>
          </div>
        </dl>

        <!-- Rate breakdown -->
        <div class="space-y-2.5 border-t border-romara-green/10 px-6 py-5 text-sm">
          <div class="flex items-center justify-between gap-3 text-romara-ink-soft">
            <span>KES {{ formatPrice(selectedVehicle.dailyRate) }} × {{ hireDays }} day{{ hireDays > 1 ? 's' : '' }}</span>
            <span class="font-semibold text-romara-green">KES {{ formatPrice(vehicleSubtotal) }}</span>
          </div>
          <div v-if="driverPerDay > 0" class="flex items-center justify-between gap-3 text-romara-ink-soft">
            <span>Chauffeur × {{ hireDays }} day{{ hireDays > 1 ? 's' : '' }}</span>
            <span class="font-semibold text-romara-green">KES {{ formatPrice(driverSubtotal) }}</span>
          </div>
        </div>

        <!-- Estimated total -->
        <div class="flex items-center justify-between gap-3 border-t border-romara-green/10 bg-green-fade px-6 py-5 text-white">
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber-300">Estimated Total</p>
            <p class="text-[11px] text-white/55">Confirmed before pick-up</p>
          </div>
          <p class="font-heading text-2xl font-semibold">KES {{ formatPrice(estimatedTotal) }}</p>
        </div>

        <div class="space-y-3 border-t border-romara-green/10 bg-romara-cream/50 px-6 py-6">
          <BaseButton type="submit" variant="primary" block class="justify-center" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Request This Vehicle' }}
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" block class="justify-center">Request a Quote</BaseButton>
          <p class="pt-1 text-center text-xs text-romara-ink-soft">
            A consultant confirms availability and the final rate after you submit.
          </p>
        </div>
      </div>
    </aside>
  </form>
</template>
