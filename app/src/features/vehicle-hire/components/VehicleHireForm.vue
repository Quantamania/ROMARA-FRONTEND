<script setup lang="ts">
import { computed, nextTick, reactive, ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { fleet, fleetByKey, CHAUFFEUR_PER_DAY, type FleetKey } from '@/data/fleet'
import { vehicleHireRates } from '@/data/vehicleHireRates'
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
// 'form' → fill in details, 'done' → request received.
//
// There is no payment step here on purpose. The total on this form is an
// estimate built from day rates; the real price depends on availability and
// extras, so a consultant confirms it first. The backend refuses to charge a
// hire until an admin has set a quote, and the customer pays from /pay once
// they have it — charging the estimate would be charging a guess.
const stage = ref<'form' | 'done'>('form')

const today = new Date().toISOString().slice(0, 10)

const formData = reactive<VehicleHireFormData>({
  fullName: '',
  email: '',
  phone: '',
  vehicle: null,
  // Every route rate includes a professional chauffeur, so this is fixed.
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
  if (typeof requested === 'string' && (MAIN_VEHICLE_KEYS as string[]).includes(requested)) {
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

const selectedVehicle = computed(() => (formData.vehicle ? fleetByKey[formData.vehicle] : null))

// Vehicle hire leads with the two safari workhorses. The full fleet still lives
// in fleet.ts for the rest of the site.
const MAIN_VEHICLE_KEYS: FleetKey[] = ['cruiser', 'van']
const mainVehicles = computed(() => fleet.filter((v) => MAIN_VEHICLE_KEYS.includes(v.key)))

// The tourist picks an all-inclusive route once a vehicle is chosen. Route rates
// already cover vehicle, fuel, driver and park entry, so a selected route drives
// the estimate directly (no separate vehicle/driver lines added on top).
const selectedRoute = ref<string | null>(null)
const selectedRouteData = computed(
  () => vehicleHireRates.find((r) => r.route === selectedRoute.value) ?? null,
)

// Split "Nairobi → Destination" into an origin + destination so the cards can
// read like a journey. Routes without an arrow (e.g. the day trip) keep the
// whole label as the destination.
const routeOptions = computed(() =>
  vehicleHireRates.map((r) => {
    const i = r.route.indexOf('→')
    return {
      route: r.route,
      priceKES: r.priceKES,
      from: i === -1 ? '' : r.route.slice(0, i).trim(),
      to: i === -1 ? r.route : r.route.slice(i + 1).trim(),
    }
  }),
)

// The route leads the page. Picking one reveals the vehicles and scrolls to them;
// picking a vehicle reveals the booking details and scrolls there.
const vehicleSection = ref<HTMLElement | null>(null)
const detailsSection = ref<HTMLElement | null>(null)

function selectRoute(routeName: string) {
  selectedRoute.value = routeName
  // nextTick so the (v-if) vehicle section is in the DOM before we scroll to it.
  nextTick(() => vehicleSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function selectVehicle(key: FleetKey) {
  formData.vehicle = key
  nextTick(() => detailsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

const hireDays = computed(function getHireDays() {
  if (!formData.pickupDate || !formData.returnDate) return 1
  const start = new Date(formData.pickupDate).getTime()
  const end = new Date(formData.returnDate).getTime()
  const diff = Math.round((end - start) / 86_400_000)
  return Math.max(1, diff || 1)
})

const driverPerDay = computed(() => (formData.driverOption === 'chauffeur' ? CHAUFFEUR_PER_DAY : 0))
const vehicleSubtotal = computed(() => (selectedVehicle.value?.dailyRate ?? 0) * hireDays.value)
const driverSubtotal = computed(() => driverPerDay.value * hireDays.value)
const estimatedTotal = computed(() =>
  selectedRouteData.value
    ? selectedRouteData.value.priceKES * hireDays.value
    : vehicleSubtotal.value + driverSubtotal.value,
)

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-KE').format(amount)
}

const dropoffLabel = computed(() =>
  formData.dropoffSameAsPickup
    ? formData.pickupLocation || 'Same as pick-up'
    : formData.dropoffLocation || 'Not set yet',
)

const driverLabel = computed(() =>
  formData.driverOption === 'chauffeur'
    ? 'With Chauffeur'
    : formData.driverOption === 'self-drive'
      ? 'Self-Drive'
      : null,
)

// A readable pick-up → return line for the summary (dates come in as YYYY-MM-DD).
function formatDate(iso: string) {
  const [, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${Number(d)} ${months[Number(m) - 1]}`
}
const datesLabel = computed(() =>
  formData.pickupDate && formData.returnDate
    ? `${formatDate(formData.pickupDate)} → ${formatDate(formData.returnDate)}`
    : null,
)

// Kept so the confirmation screen can show the customer their reference — it is
// what they quote when they come back to pay after we've priced the hire.
const bookingReference = ref<string | null>(null)
const submitError = ref('')

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''
  try {
    // Fold the chosen route into the notes so the consultant sees it — the
    // submit RPC has no dedicated route field.
    const payload = { ...formData }
    if (selectedRouteData.value) {
      const routeNote = `Route: ${selectedRouteData.value.route} — KES ${formatPrice(selectedRouteData.value.priceKES)}/day (all-inclusive).`
      payload.additionalRequests = payload.additionalRequests
        ? `${routeNote}\n${payload.additionalRequests}`
        : routeNote
    }
    const result = await submitVehicleHire(payload)
    bookingReference.value = result.bookingReference
    stage.value = 'done'
  } catch (err) {
    // Surfaced rather than swallowed: previously a failed write still showed
    // "your vehicle is reserved", so a guest could walk away believing they had
    // booked something that was never recorded.
    console.error('Vehicle hire request failed to persist:', err)
    submitError.value =
      'We could not submit your request just now. Please check your details and try again, or call us.'
  } finally {
    isSubmitting.value = false
  }
}

function hireAnother() {
  bookingReference.value = null
  submitError.value = ''
  stage.value = 'form'
}
</script>

<template>
  <!-- Confirmation state -->
  <div v-if="stage === 'done'" class="mx-auto max-w-xl rounded-card bg-white p-8 text-center shadow-elevated sm:p-12">
    <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
      <IconCheckSquare class="h-8 w-8" />
    </span>
    <h2 class="mt-6 font-heading text-2xl font-semibold text-romara-green">Request received.</h2>
    <span class="accent-rule mx-auto mt-4" />

    <div v-if="bookingReference" class="mx-auto mt-6 inline-block rounded-card bg-romara-bone px-6 py-4">
      <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Your reference</p>
      <p class="mt-1 font-heading text-xl font-semibold text-romara-green">{{ bookingReference }}</p>
    </div>

    <p class="mx-auto mt-5 max-w-md text-sm leading-relaxed text-romara-ink-soft">
      A consultant will confirm availability, driver details and your final rate — then email you a
      link to pay. Keep your reference; you can also pay any time from
      <RouterLink to="/pay" class="font-semibold text-romara-green underline hover:text-romara-amber">the payment page</RouterLink>.
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
  <form v-else class="space-y-8" @submit.prevent="handleSubmit">
    <!-- Step 1 — the ROUTE leads: picking one sets the all-inclusive price and reveals the vehicles. -->
    <section class="rounded-card bg-white p-6 shadow-card sm:p-8">
      <div class="mb-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p class="eyebrow">Step 1 · Choose Your Route</p>
        <span class="text-xs font-medium text-romara-ink-soft">Per day · vehicle, fuel, driver &amp; park entry included</span>
      </div>
      <!-- Once chosen, the long list collapses to a compact bar so the page stays short. -->
      <div
        v-if="selectedRoute && selectedRouteData"
        class="flex items-center justify-between gap-3 rounded-xl border border-romara-amber/40 bg-romara-amber/[0.06] p-4"
      >
        <span class="min-w-0">
          <span class="block text-[10px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Your route</span>
          <span class="mt-0.5 block truncate font-heading text-sm font-semibold text-romara-green">{{ selectedRoute }}</span>
        </span>
        <span class="flex shrink-0 items-center gap-3">
          <span class="text-right leading-none">
            <span class="block font-heading text-sm font-semibold text-romara-amber">KES {{ formatPrice(selectedRouteData.priceKES) }}</span>
            <span class="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.1em] text-romara-ink-soft">per day</span>
          </span>
          <button
            type="button"
            class="rounded-lg border border-romara-green/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-romara-green transition-colors hover:border-romara-amber hover:text-romara-amber"
            @click="selectedRoute = null"
          >Change</button>
        </span>
      </div>

      <template v-else>
        <!-- On mobile the list is a bounded scroll area so 12 routes never take over the page. -->
        <div class="-mx-1 max-h-[52vh] overflow-y-auto px-1 py-1 sm:mx-0 sm:max-h-none sm:overflow-visible sm:p-0">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              v-for="rate in routeOptions"
              :key="rate.route"
              type="button"
              class="group flex items-center justify-between gap-4 rounded-xl border border-romara-green/12 bg-white p-4 text-left transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/40 hover:shadow-card"
              @click="selectRoute(rate.route)"
            >
              <span class="min-w-0">
                <span v-if="rate.from" class="text-xs font-medium text-romara-ink-soft">{{ rate.from }} →</span>
                <span class="mt-0.5 block font-heading text-[15px] font-semibold leading-snug text-romara-green">{{ rate.to }}</span>
              </span>
              <span class="shrink-0 text-right leading-none">
                <span class="block font-heading text-base font-semibold text-romara-amber">KES {{ formatPrice(rate.priceKES) }}</span>
                <span class="mt-1 block text-[10px] font-medium uppercase tracking-[0.1em] text-romara-ink-soft">per day</span>
              </span>
            </button>
          </div>
        </div>
        <p class="mt-4 text-xs leading-relaxed text-romara-ink-soft">
          Rates are indicative averages and may shift with fuel and other economic factors — a consultant confirms your exact price before booking.
        </p>
      </template>
    </section>

    <!-- Step 2 — the vehicle. Revealed once a route is chosen; scrolled to on route click. -->
    <section
      v-if="selectedRoute"
      ref="vehicleSection"
      class="scroll-mt-24 rounded-card bg-white p-6 shadow-card sm:p-8"
    >
      <div class="mb-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p class="eyebrow">Step 2 · Choose Your Vehicle</p>
        <span class="text-xs font-medium text-romara-ink-soft">Your route rate covers the vehicle — pick the one you prefer</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            v-for="vehicle in mainVehicles"
            :key="vehicle.key"
            type="button"
            class="group relative flex flex-col overflow-hidden rounded-card bg-white text-left transition-all duration-300 ease-out-expo"
            :class="formData.vehicle === vehicle.key
              ? 'border-2 border-romara-amber shadow-glow-amber ring-2 ring-romara-amber/25 sm:-translate-y-1'
              : 'border-2 border-romara-green/12 hover:-translate-y-0.5 hover:border-romara-green/40 hover:shadow-card'"
            :aria-pressed="formData.vehicle === vehicle.key"
            @click="selectVehicle(vehicle.key)"
          >
            <!-- Clear 'Selected' flag so the chosen vehicle is obvious at a glance -->
            <span
              v-if="formData.vehicle === vehicle.key"
              class="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-romara-amber px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft"
            >
              <IconCheck class="h-3 w-3 [stroke-width:2.5]" />Selected
            </span>

            <div class="relative h-56 overflow-hidden bg-romara-bone text-romara-green sm:h-64">
              <img
                v-if="!failedImages.has(vehicle.key)"
                :src="vehicle.image"
                :alt="vehicle.name"
                loading="lazy"
                class="h-full w-full object-contain p-3 transition-transform duration-500 ease-out-expo group-hover:scale-105"
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

            <div class="flex flex-1 flex-col gap-1 p-4">
              <span class="font-heading text-base font-semibold text-romara-green">{{ vehicle.name }}</span>
              <p class="text-xs leading-relaxed text-romara-ink-soft">{{ vehicle.desc }}</p>
            </div>
          </button>
        </div>
    </section>

    <!-- Step 3 — booking details on the left, a live summary on the right. Revealed once a vehicle is picked. -->
    <div
      v-if="selectedRoute && selectedVehicle"
      ref="detailsSection"
      class="scroll-mt-24 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]"
    >
      <div class="space-y-8 rounded-card bg-white p-6 shadow-card sm:p-9">
        <!-- Driver option -->
        <div>
          <p :class="sectionLabelClasses">Driver</p>
        <div class="grid grid-cols-1 gap-3">
          <div
            class="flex items-center gap-3.5 rounded-2xl border border-romara-amber bg-romara-amber/5 p-4 ring-1 ring-romara-amber"
          >
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-romara-amber text-white">
              <IconUserCheck class="h-5 w-5" />
            </span>
            <span class="min-w-0">
              <span class="block font-heading text-sm font-semibold text-romara-green">With Chauffeur</span>
              <span class="mt-0.5 block text-xs text-romara-ink-soft">A professional driver is included in every route rate.</span>
            </span>
          </div>
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
            <input v-model.number="formData.passengers" type="number" min="1" :max="selectedVehicle?.seats" :class="inputClasses" />
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
        <div v-if="selectedVehicle" class="border-b border-romara-green/10 bg-romara-bone px-6 py-5 text-romara-green">
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
              <p class="text-xs text-romara-ink-soft">{{ selectedVehicle.capacity }}</p>
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

        <!-- No vehicle chosen yet -->
        <div v-else class="border-b border-romara-green/10 bg-romara-bone px-6 py-6 text-center">
          <span class="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-romara-green/5 text-romara-green/50">
            <IconCar class="h-5 w-5" />
          </span>
          <p class="mt-3 text-sm font-semibold text-romara-green">No vehicle selected yet</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">Choose a vehicle above to see rates and totals.</p>
        </div>

        <div class="px-6 py-5">
          <p class="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft/70">Your trip</p>
          <dl class="divide-y divide-romara-green/[0.07] text-sm">
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Route</dt>
              <dd class="max-w-[175px] text-right font-semibold" :class="selectedRoute ? 'text-romara-green' : 'font-normal italic text-romara-ink-soft/55'">
                {{ selectedRoute ?? 'Not selected' }}
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Driver</dt>
              <dd class="text-right font-semibold" :class="driverLabel ? 'text-romara-green' : 'font-normal italic text-romara-ink-soft/55'">
                {{ driverLabel ?? 'Not selected' }}
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Dates</dt>
              <dd class="text-right font-semibold" :class="datesLabel ? 'text-romara-green' : 'font-normal italic text-romara-ink-soft/55'">
                {{ datesLabel ?? 'Not set yet' }}
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Pick-up</dt>
              <dd class="max-w-[160px] text-right font-semibold" :class="formData.pickupLocation ? 'text-romara-green' : 'font-normal italic text-romara-ink-soft/55'">
                {{ formData.pickupLocation || 'Not set yet' }}
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Drop-off</dt>
              <dd class="max-w-[160px] text-right font-semibold text-romara-green">{{ dropoffLabel }}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Passengers</dt>
              <dd class="text-right font-semibold text-romara-green">{{ formData.passengers }}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="shrink-0 text-romara-ink-soft">Purpose</dt>
              <dd class="text-right font-semibold text-romara-green">{{ purposeLabels[formData.purpose] }}</dd>
            </div>
          </dl>
        </div>

        <!-- Rate breakdown -->
        <div v-if="selectedVehicle" class="space-y-2.5 border-t border-romara-green/10 px-6 py-5 text-sm">
          <template v-if="selectedRouteData">
            <div class="flex items-center justify-between gap-3 text-romara-ink-soft">
              <span>KES {{ formatPrice(selectedRouteData.priceKES) }}/day × {{ hireDays }} day{{ hireDays > 1 ? 's' : '' }}</span>
              <span class="font-semibold text-romara-green">KES {{ formatPrice(selectedRouteData.priceKES * hireDays) }}</span>
            </div>
            <p class="text-[11px] leading-relaxed text-romara-ink-soft/70">All-inclusive — vehicle, fuel, driver &amp; park entry.</p>
          </template>
          <template v-else>
            <div class="flex items-center justify-between gap-3 text-romara-ink-soft">
              <span>KES {{ formatPrice(selectedVehicle.dailyRate) }} × {{ hireDays }} day{{ hireDays > 1 ? 's' : '' }}</span>
              <span class="font-semibold text-romara-green">KES {{ formatPrice(vehicleSubtotal) }}</span>
            </div>
            <div v-if="driverPerDay > 0" class="flex items-center justify-between gap-3 text-romara-ink-soft">
              <span>Chauffeur × {{ hireDays }} day{{ hireDays > 1 ? 's' : '' }}</span>
              <span class="font-semibold text-romara-green">KES {{ formatPrice(driverSubtotal) }}</span>
            </div>
          </template>
        </div>

        <!-- Estimated total -->
        <div class="flex items-center justify-between gap-3 border-t border-romara-green/10 bg-green-fade px-6 py-5 text-white">
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber-300">Estimated Total</p>
            <p class="text-[11px] text-white/55">Confirmed before pick-up</p>
          </div>
          <p v-if="selectedVehicle" class="font-heading text-2xl font-semibold">KES {{ formatPrice(estimatedTotal) }}</p>
          <p v-else class="font-heading text-lg font-semibold text-white/50">—</p>
        </div>

        <div class="space-y-3 border-t border-romara-green/10 bg-romara-cream/50 px-6 py-6">
          <p v-if="submitError" class="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            {{ submitError }}
          </p>
          <BaseButton type="submit" variant="amber" block class="justify-center" :disabled="isSubmitting || !selectedVehicle || !selectedRoute || !formData.driverOption">
            {{ isSubmitting ? 'Submitting...' : !selectedVehicle ? 'Select a Vehicle First' : !selectedRoute ? 'Choose a Route' : !formData.driverOption ? 'Choose a Driver Option' : 'Request This Vehicle' }}
            <IconArrowRight v-if="selectedVehicle && selectedRoute && formData.driverOption" class="h-4 w-4" />
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" block class="justify-center">Request a Quote</BaseButton>
          <p class="pt-1 text-center text-xs text-romara-ink-soft">
            A consultant confirms availability and the final rate after you submit.
          </p>
        </div>
      </div>
    </aside>
    </div>
  </form>
</template>
