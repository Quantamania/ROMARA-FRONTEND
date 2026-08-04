<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconCard from '@/components/icons/IconCard.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  /** Fixed amount in KES, if known. Quote-based bookings can leave this out. */
  amount?: number
  /** Booking reference to show + pass to the gateway. */
  reference?: string
  /** Pre-fill the M-Pesa number from the booking form. */
  phone?: string
  /** Drop the card chrome when embedded inside another card surface. */
  flat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  amount: undefined,
  reference: undefined,
  phone: '',
  flat: false,
})

const emit = defineEmits<{ complete: [method: string]; skip: [] }>()

type Method = 'mpesa' | 'card' | 'bank' | 'later'
const method = ref<Method | null>('mpesa')
const processing = ref(false)
const paid = ref(false)

const mpesaPhone = ref(props.phone)
const customAmount = ref<number | null>(props.amount ?? null)
const card = ref({ name: '', number: '', expiry: '', cvc: '' })

const methods: { key: Method; label: string; desc: string; icon: typeof IconPhone }[] = [
  { key: 'mpesa', label: 'M-Pesa', desc: 'Instant STK push to your phone', icon: IconPhone },
  { key: 'card', label: 'Card', desc: 'Visa, Mastercard', icon: IconCard },
  { key: 'bank', label: 'Bank Transfer', desc: 'Direct deposit / EFT', icon: IconWallet },
  { key: 'later', label: 'Pay Later', desc: 'Reserve now, pay on confirmation', icon: IconClock },
]

const formattedAmount = computed(() =>
  props.amount != null ? `KES ${new Intl.NumberFormat('en-KE').format(props.amount)}` : null,
)

function fmt(n: number | null) {
  return n != null && n > 0 ? `KES ${new Intl.NumberFormat('en-KE').format(n)}` : ''
}

// NOTE: front-end flow only. Wire these to a real gateway (M-Pesa Daraja STK push
// / Stripe / bank webhook) via features/payments/api/payments.api.ts before going live.
async function pay() {
  processing.value = true
  await new Promise((r) => window.setTimeout(r, 1600))
  processing.value = false
  paid.value = true
}

function confirmLater() {
  emit('complete', 'later')
}

function finishPaid() {
  emit('complete', method.value ?? 'mpesa')
}

const bank = {
  bank: 'Equity Bank Kenya',
  name: 'ROMARA Tours & Travel Ltd',
  account: '0123 4567 8910',
  branch: 'Nairobi CBD',
}
</script>

<template>
  <div :class="flat ? '' : 'rounded-card bg-white p-6 shadow-elevated sm:p-8'">
    <!-- Paid confirmation -->
    <div v-if="paid" class="py-6 text-center">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade text-white shadow-glow-amber">
        <IconCheckSquare class="h-8 w-8" />
      </span>
      <h3 class="mt-5 font-heading text-2xl font-semibold text-romara-green">Payment received</h3>
      <span class="accent-rule mx-auto mt-4" />
      <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
        Thank you — your payment has been received and your booking is confirmed. A receipt and full
        confirmation are on their way to your email.
      </p>
      <div class="mt-7 flex justify-center">
        <BaseButton variant="primary" size="lg" @click="finishPaid">
          Continue
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <template v-else>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">Choose how to pay</h3>
          <p class="mt-1.5 text-sm text-romara-ink-soft">
            Your booking is held while you complete payment. It's quick and secure.
          </p>
        </div>
        <span
          v-if="formattedAmount"
          class="inline-flex items-center rounded-full bg-romara-green px-4 py-2 text-sm font-bold text-white"
        >
          {{ formattedAmount }}
        </span>
      </div>

      <!-- Method chooser -->
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          v-for="m in methods"
          :key="m.key"
          type="button"
          class="group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ease-out-expo"
          :class="method === m.key
            ? 'border-romara-amber bg-romara-amber/5 ring-1 ring-romara-amber'
            : 'border-romara-green/12 bg-white hover:border-romara-green/30 hover:bg-romara-bone'"
          @click="method = m.key"
        >
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors"
            :class="method === m.key ? 'bg-romara-amber text-white' : 'bg-romara-green/5 text-romara-green'"
          >
            <component :is="m.icon" class="h-5 w-5" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block font-heading text-sm font-semibold text-romara-green">{{ m.label }}</span>
            <span class="mt-0.5 block text-xs leading-snug text-romara-ink-soft">{{ m.desc }}</span>
          </span>
          <span
            class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors"
            :class="method === m.key ? 'border-romara-amber bg-romara-amber text-white' : 'border-romara-green/25'"
          >
            <IconCheck v-if="method === m.key" class="h-3 w-3" />
          </span>
        </button>
      </div>

      <!-- Optional amount (quote-based bookings) -->
      <div v-if="amount == null && method !== 'later'" class="mt-6">
        <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">
          Amount to pay (KES)
        </label>
        <input
          v-model.number="customAmount"
          type="number"
          min="0"
          placeholder="Deposit or full amount"
          class="w-full rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-3 text-sm text-romara-ink focus:border-romara-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-romara-green/20"
        />
        <p class="mt-1.5 text-xs text-romara-ink-soft/80">Pay a deposit to secure your booking, or the full amount.</p>
      </div>

      <!-- M-Pesa -->
      <div v-if="method === 'mpesa'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">M-Pesa phone number</label>
        <input
          v-model="mpesaPhone"
          type="tel"
          placeholder="+254 7XX XXX XXX"
          class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm text-romara-ink focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20"
        />
        <p class="mt-2 text-xs text-romara-ink-soft">You'll get an STK push on this number — enter your PIN to confirm.</p>
        <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" :loading="processing" :disabled="processing || !mpesaPhone" @click="pay">
          {{ processing ? 'Sending request…' : `Pay ${fmt(amount ?? customAmount) || 'with M-Pesa'}` }}
        </BaseButton>
      </div>

      <!-- Card -->
      <div v-else-if="method === 'card'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">Name on card</label>
            <input v-model="card.name" type="text" placeholder="Jane Wanjiru" class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20" />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">Card number</label>
            <input v-model="card.number" type="text" inputmode="numeric" placeholder="1234 5678 9012 3456" class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20" />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">Expiry</label>
            <input v-model="card.expiry" type="text" placeholder="MM / YY" class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20" />
          </div>
          <div>
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">CVC</label>
            <input v-model="card.cvc" type="text" inputmode="numeric" placeholder="123" class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20" />
          </div>
        </div>
        <p class="mt-3 flex items-center gap-1.5 text-xs text-romara-ink-soft">
          <IconLock class="h-3.5 w-3.5 text-romara-green" />
          Encrypted &amp; secure. Processed by our payment provider.
        </p>
        <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" :loading="processing" :disabled="processing" @click="pay">
          {{ processing ? 'Processing…' : `Pay ${fmt(amount ?? customAmount) || 'securely'}` }}
        </BaseButton>
      </div>

      <!-- Bank transfer -->
      <div v-else-if="method === 'bank'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <dl class="space-y-2.5 text-sm">
          <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Bank</dt><dd class="font-semibold text-romara-green">{{ bank.bank }}</dd></div>
          <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Account name</dt><dd class="text-right font-semibold text-romara-green">{{ bank.name }}</dd></div>
          <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Account no.</dt><dd class="font-semibold text-romara-green">{{ bank.account }}</dd></div>
          <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Branch</dt><dd class="font-semibold text-romara-green">{{ bank.branch }}</dd></div>
          <div v-if="reference" class="flex justify-between gap-3 border-t border-romara-green/10 pt-2.5"><dt class="text-romara-ink-soft">Reference</dt><dd class="font-semibold text-romara-amber">{{ reference }}</dd></div>
        </dl>
        <p class="mt-3 text-xs text-romara-ink-soft">Use the reference above so we can match your payment, then confirm below.</p>
        <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" :loading="processing" @click="pay">
          {{ processing ? 'Confirming…' : "I've made the transfer" }}
        </BaseButton>
      </div>

      <!-- Pay later -->
      <div v-else-if="method === 'later'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <p class="text-sm leading-relaxed text-romara-ink-soft">
          No problem — we'll hold your booking and a travel consultant will send you a secure payment link
          once your trip is confirmed. No payment is taken now.
        </p>
        <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" @click="confirmLater">
          Reserve &amp; pay later
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>

      <button type="button" class="mt-5 block w-full text-center text-xs font-semibold text-romara-ink-soft underline-offset-2 hover:text-romara-green hover:underline" @click="emit('skip')">
        Skip payment for now
      </button>
    </template>
  </div>
</template>
