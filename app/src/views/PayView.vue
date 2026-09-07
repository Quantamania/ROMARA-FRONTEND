<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconShield from '@/components/icons/IconShield.vue'
import PaymentPanel from '@/features/payments/components/PaymentPanel.vue'
import { lookupPayable, type Payable } from '@/features/payments/api/payments.api'

const route = useRoute()

const reference = ref('')
const email = ref('')
const looking = ref(false)
const searched = ref(false)
const notFound = ref(false)
const payable = ref<Payable | null>(null)

const inputClasses =
  'w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink-soft/50 transition-all duration-200 focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20'
const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft'

function money(amount: number) {
  return `KES ${new Intl.NumberFormat('en-KE').format(amount)}`
}

async function find() {
  looking.value = true
  notFound.value = false
  payable.value = null

  try {
    const result = await lookupPayable(reference.value, email.value)
    if (result) payable.value = result
    else notFound.value = true
  } catch {
    notFound.value = true
  } finally {
    looking.value = false
    searched.value = true
  }
}

function startOver() {
  payable.value = null
  searched.value = false
  notFound.value = false
}

// Emailed links carry the reference so the customer only types their email.
onMounted(() => {
  const fromLink = route.query.ref
  if (typeof fromLink === 'string') reference.value = fromLink
})
</script>

<template>
  <section class="bg-romara-cream/40 py-14 sm:py-20">
    <div class="mx-auto max-w-xl px-5 sm:px-6">
      <div class="text-center">
        <p class="eyebrow">Secure Payment</p>
        <h1 class="mt-2 font-heading text-3xl font-semibold text-romara-green sm:text-display-sm">
          Pay for your trip
        </h1>
        <span class="accent-rule mx-auto mt-4" />
        <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
          Enter the reference from your confirmation email and we'll bring up what's outstanding.
        </p>
      </div>

      <!-- Lookup -->
      <div v-if="!payable" class="mt-8 rounded-card bg-white p-6 shadow-elevated sm:p-8">
        <form class="space-y-5" @submit.prevent="find">
          <div>
            <label :class="labelClasses" for="pay-reference">Booking reference</label>
            <input
              id="pay-reference"
              v-model="reference"
              type="text"
              required
              placeholder="RMR-20260907-A1B2"
              autocomplete="off"
              spellcheck="false"
              :class="inputClasses"
            />
          </div>
          <div>
            <label :class="labelClasses" for="pay-email">Email address</label>
            <input
              id="pay-email"
              v-model="email"
              type="email"
              required
              placeholder="the email you booked with"
              autocomplete="email"
              :class="inputClasses"
            />
          </div>

          <p v-if="notFound" class="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-medium leading-relaxed text-red-700">
            We couldn't find anything matching that reference and email. Check both against your
            confirmation email — or contact us and we'll help.
          </p>

          <BaseButton
            type="submit"
            variant="primary"
            block
            size="lg"
            class="justify-center"
            :loading="looking"
            :disabled="looking || !reference.trim() || !email.trim()"
          >
            {{ looking ? 'Looking…' : 'Find my booking' }}
          </BaseButton>
        </form>

        <p class="mt-5 flex items-start gap-2 text-xs leading-relaxed text-romara-ink-soft">
          <IconShield class="mt-0.5 h-4 w-4 shrink-0 text-romara-green" />
          We ask for both so nobody can pull up your booking with the reference alone.
        </p>
      </div>

      <!-- Found -->
      <template v-else>
        <div class="mt-8 overflow-hidden rounded-card bg-white shadow-elevated">
          <div class="bg-green-fade px-6 py-5 text-white">
            <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-amber-300">
              {{ payable.description }}
            </p>
            <p class="mt-1 font-heading text-lg font-semibold">{{ payable.reference }}</p>
          </div>

          <dl class="divide-y divide-romara-green/[0.07] px-6 py-4 text-sm">
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="text-romara-ink-soft">Total</dt>
              <dd class="font-semibold text-romara-green">
                {{ payable.total > 0 ? money(payable.total) : 'Awaiting quote' }}
              </dd>
            </div>
            <div v-if="payable.paid > 0" class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="text-romara-ink-soft">Already paid</dt>
              <dd class="font-semibold text-romara-green">{{ money(payable.paid) }}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-3 py-2.5">
              <dt class="font-semibold text-romara-ink">Outstanding</dt>
              <dd class="font-heading text-lg font-semibold text-romara-amber-600">
                {{ money(payable.outstanding) }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Nothing to pay: quote pending, cancelled, or settled -->
        <div v-if="!payable.payable" class="mt-5 rounded-card bg-white p-6 text-center shadow-card">
          <p class="text-sm leading-relaxed text-romara-ink-soft">
            {{ payable.reason ?? 'There is nothing outstanding on this booking.' }}
          </p>
          <BaseButton variant="outline" class="mt-5 justify-center" @click="startOver">
            Look up another reference
          </BaseButton>
        </div>

        <div v-else class="mt-5">
          <PaymentPanel
            :target="payable.kind === 'booking'
              ? { bookingId: payable.targetId }
              : { vehicleHireId: payable.targetId }"
            :amount="payable.outstanding"
            :reference="payable.reference"
            @complete="startOver"
            @skip="startOver"
          />
        </div>
      </template>
    </div>
  </section>
</template>
