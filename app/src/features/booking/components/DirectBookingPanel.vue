<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import PaymentPanel from '@/features/payments/components/PaymentPanel.vue'
import { createTourBooking, endDateFor } from '@/features/booking/api/tourBooking.api'
import type { SafariPackage } from '@/types/package.types'

const props = defineProps<{ pkg: SafariPackage }>()

const inputClasses =
  'w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink-soft/50 transition-all duration-200 focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft'

type Stage = 'form' | 'payment' | 'done'
const stage = ref<Stage>('form')

const form = reactive({
  startDate: '',
  travellers: 1,
  fullName: '',
  email: '',
  phone: '',
})

const submitting = ref(false)
const errorMessage = ref('')
const booking = ref<{ bookingId: number; bookingReference: string } | null>(null)

const today = new Date().toISOString().slice(0, 10)

// book_tour_seats caps a party at 20; never offer more than is actually left.
const maxTravellers = computed(() => Math.min(20, props.pkg.availableSlots ?? 0))
const soldOut = computed(() => (props.pkg.availableSlots ?? 0) < 1)

const total = computed(() => props.pkg.priceFromKES * Math.max(1, form.travellers))
const endDate = computed(() =>
  form.startDate ? endDateFor(form.startDate, props.pkg.durationDays) : '',
)

function money(amount: number) {
  return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`
}

function prettyDate(iso: string) {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

async function reserve() {
  // tourId is absent when the page is showing bundled fallback content, whose
  // ids point at different tours in the database. Refusing here is the last
  // guard against selling somebody the wrong safari.
  if (!props.pkg.tourId) {
    errorMessage.value = 'Online booking is unavailable for this safari right now. Please contact us and we will arrange it.'
    return
  }

  errorMessage.value = ''
  submitting.value = true

  try {
    booking.value = await createTourBooking({
      tourId: props.pkg.tourId,
      startDate: form.startDate,
      endDate: endDate.value,
      travellers: form.travellers,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
    })
    stage.value = 'payment'
  } catch (err) {
    errorMessage.value = (err as Error).message
  } finally {
    submitting.value = false
  }
}

// The seats are held either way — payment can be completed later from /pay.
function finish() {
  stage.value = 'done'
}
</script>

<template>
  <div class="rounded-card bg-white p-6 shadow-elevated sm:p-8">
    <!-- Confirmed -->
    <div v-if="stage === 'done'" class="py-4 text-center">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
        <IconCheckSquare class="h-8 w-8" />
      </span>
      <h3 class="mt-5 font-heading text-2xl font-semibold text-romara-green">Your seats are booked</h3>
      <span class="accent-rule mx-auto mt-4" />

      <div v-if="booking" class="mx-auto mt-6 inline-block rounded-card bg-romara-bone px-6 py-4">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Your reference</p>
        <p class="mt-1 font-heading text-xl font-semibold text-romara-green">{{ booking.bookingReference }}</p>
      </div>

      <p class="mx-auto mt-5 max-w-md text-sm leading-relaxed text-romara-ink-soft">
        We've emailed your confirmation. If you still have a balance you can settle it any time from
        <RouterLink :to="`/pay?ref=${booking?.bookingReference ?? ''}`" class="font-semibold text-romara-green underline hover:text-romara-amber">
          the payment page</RouterLink>.
      </p>
    </div>

    <!-- Pay -->
    <div v-else-if="stage === 'payment' && booking">
      <div class="mb-5 rounded-2xl bg-romara-bone px-5 py-4">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">Seats held — reference</p>
        <p class="mt-0.5 font-heading text-lg font-semibold text-romara-green">{{ booking.bookingReference }}</p>
        <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">
          {{ form.travellers }} traveller{{ form.travellers > 1 ? 's' : '' }} ·
          {{ prettyDate(form.startDate) }} – {{ prettyDate(endDate) }}
        </p>
      </div>

      <PaymentPanel
        flat
        :target="{ bookingId: booking.bookingId }"
        :amount="total"
        :reference="booking.bookingReference"
        :phone="form.phone"
        @complete="finish"
        @skip="finish"
      />
    </div>

    <!-- Reserve -->
    <template v-else>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">Book this safari</h3>
          <p class="mt-1.5 text-sm text-romara-ink-soft">
            {{ pkg.durationDays }} days · {{ money(pkg.priceFromKES) }} per person
          </p>
        </div>
        <span
          v-if="!soldOut"
          class="inline-flex items-center gap-1.5 rounded-full bg-romara-green/5 px-3 py-1.5 text-xs font-semibold text-romara-green"
        >
          <IconUsers class="h-3.5 w-3.5 text-romara-amber" />
          {{ pkg.availableSlots }} seat{{ (pkg.availableSlots ?? 0) === 1 ? '' : 's' }} left
        </span>
      </div>

      <!-- Sold out, or content served from the offline fallback -->
      <div v-if="soldOut || !pkg.tourId" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <p class="text-sm leading-relaxed text-romara-ink-soft">
          {{ soldOut
            ? 'This departure is fully booked. Tell us your dates and we will find you the next one.'
            : 'Online booking is unavailable for this safari at the moment — but we can still arrange it for you.' }}
        </p>
        <BaseButton as="a" href="/booking" variant="primary" block size="lg" class="mt-4 justify-center">
          Enquire about dates
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>

      <form v-else class="mt-6 space-y-5" @submit.prevent="reserve">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label :class="labelClasses" for="book-start">Start date</label>
            <input id="book-start" v-model="form.startDate" type="date" required :min="today" :class="inputClasses" />
            <p v-if="endDate" class="mt-1.5 text-xs text-romara-ink-soft">
              Returns {{ prettyDate(endDate) }}
            </p>
          </div>
          <div>
            <label :class="labelClasses" for="book-travellers">Travellers</label>
            <select id="book-travellers" v-model.number="form.travellers" :class="inputClasses">
              <option v-for="n in maxTravellers" :key="n" :value="n">
                {{ n }} traveller{{ n > 1 ? 's' : '' }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label :class="labelClasses" for="book-name">Full name</label>
            <input id="book-name" v-model="form.fullName" type="text" required placeholder="Jane Wanjiru" :class="inputClasses" />
          </div>
          <div>
            <label :class="labelClasses" for="book-email">Email</label>
            <input id="book-email" v-model="form.email" type="email" required placeholder="jane@example.com" :class="inputClasses" />
          </div>
          <div>
            <label :class="labelClasses" for="book-phone">Phone</label>
            <input id="book-phone" v-model="form.phone" type="tel" required placeholder="07XX XXX XXX" :class="inputClasses" />
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 rounded-2xl bg-green-fade px-5 py-4 text-white">
          <div>
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber-300">Total</p>
            <p class="mt-0.5 text-[11px] text-white/60">
              {{ money(pkg.priceFromKES) }} × {{ form.travellers }}
            </p>
          </div>
          <p class="font-heading text-2xl font-semibold">{{ money(total) }}</p>
        </div>

        <p v-if="errorMessage" class="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium leading-relaxed text-red-700">
          {{ errorMessage }}
        </p>

        <BaseButton
          type="submit"
          variant="amber"
          block
          size="lg"
          class="justify-center"
          :loading="submitting"
          :disabled="submitting"
        >
          {{ submitting ? 'Holding your seats…' : 'Reserve & pay' }}
          <IconArrowRight v-if="!submitting" class="h-4 w-4" />
        </BaseButton>

        <p class="text-center text-xs leading-relaxed text-romara-ink-soft">
          Your seats are held as soon as you reserve. You can pay now or later from the payment page.
        </p>
      </form>
    </template>
  </div>
</template>
