<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconStopwatch from '@/components/icons/IconStopwatch.vue'
import IconShield from '@/components/icons/IconShield.vue'
import { startStkPush, type PaymentTarget } from '@/features/payments/api/payments.api'
import { usePollPaymentStatus } from '@/features/payments/composables/usePollPaymentStatus'

interface Props {
  /**
   * What to charge against. Without it there is nothing to pay for yet — a
   * quote-based request has no confirmed price until a consultant sets one —
   * and the panel offers to arrange payment instead of pretending to take it.
   */
  target?: PaymentTarget | null
  amount?: number
  reference?: string
  phone?: string
  flat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  target: null,
  amount: undefined,
  reference: undefined,
  phone: '',
  flat: false,
})

const emit = defineEmits<{ complete: [method: string]; skip: [] }>()

type Method = 'mpesa' | 'bank' | 'later'
const payable = computed(() => props.target != null && (props.amount ?? 0) > 0)

const method = ref<Method>('mpesa')
const mpesaPhone = ref(props.phone)

const sending = ref(false)
const errorMessage = ref('')
const { status, isPolling, timedOut, start: pollStatus } = usePollPaymentStatus()

const methods = computed(() => [
  { key: 'mpesa' as const, label: 'M-Pesa', desc: 'Prompt sent straight to your phone', icon: IconPhone },
  { key: 'bank' as const, label: 'Bank Transfer', desc: 'Pay by EFT using your reference', icon: IconWallet },
  { key: 'later' as const, label: 'Pay Later', desc: 'Reserve now, pay on confirmation', icon: IconClock },
])

const formattedAmount = computed(() =>
  props.amount != null ? `KES ${new Intl.NumberFormat('en-KE').format(props.amount)}` : null,
)

// Three outcomes worth distinguishing, because they mean different things to
// the customer: the prompt is live, the money landed but nobody has checked it,
// and an admin has confirmed it.
const awaitingPhone = computed(() => isPolling.value && !status.value?.settled)
const received = computed(() => status.value?.moneyReceived === true)
const confirmed = computed(() => status.value?.paid === true)
const declined = computed(() => status.value?.settled === true && !status.value?.moneyReceived)

async function payWithMpesa() {
  if (!props.target) return

  errorMessage.value = ''
  sending.value = true

  const result = await startStkPush(props.target, mpesaPhone.value.trim(), props.amount)

  sending.value = false

  if (!result.success || !result.checkoutRequestId) {
    errorMessage.value = result.error ?? 'We could not start the payment. Please try again.'
    return
  }

  await pollStatus(result.checkoutRequestId)
}

function retry() {
  errorMessage.value = ''
  status.value = null
  timedOut.value = false
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
    <!-- Confirmed by an admin. The only place we say a payment succeeded. -->
    <div v-if="confirmed" class="py-6 text-center">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-fade text-white shadow-glow-amber">
        <IconCheckSquare class="h-8 w-8" />
      </span>
      <h3 class="mt-5 font-heading text-2xl font-semibold text-romara-green">Payment confirmed</h3>
      <span class="accent-rule mx-auto mt-4" />
      <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
        Your payment is confirmed and your receipt is on its way to your email.
      </p>
      <p v-if="status?.mpesaReceiptNumber" class="mt-3 text-sm font-semibold text-romara-green">
        M-Pesa code {{ status.mpesaReceiptNumber }}
      </p>
      <div class="mt-7 flex justify-center">
        <BaseButton variant="primary" size="lg" @click="emit('complete', 'mpesa')">
          Continue
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <!-- Money landed, but nobody has checked it yet. Say exactly that. -->
    <div v-else-if="received" class="py-6 text-center">
      <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-romara-green/10 text-romara-green">
        <IconShield class="h-8 w-8" />
      </span>
      <h3 class="mt-5 font-heading text-2xl font-semibold text-romara-green">Payment received</h3>
      <span class="accent-rule mx-auto mt-4" />
      <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
        We have your payment and our team is confirming it now. Your receipt follows by email —
        usually within a few minutes.
      </p>
      <p v-if="status?.mpesaReceiptNumber" class="mt-4 inline-block rounded-lg bg-romara-bone px-4 py-2 text-sm text-romara-ink">
        Keep your M-Pesa code
        <span class="font-semibold text-romara-green">{{ status.mpesaReceiptNumber }}</span>
        as proof of payment.
      </p>
      <div class="mt-7 flex justify-center">
        <BaseButton variant="primary" size="lg" @click="emit('complete', 'mpesa')">
          Continue
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <template v-else>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">
            {{ payable ? 'Choose how to pay' : 'Payment' }}
          </h3>
          <p class="mt-1.5 text-sm text-romara-ink-soft">
            {{ payable
              ? 'Your booking is held while you complete payment.'
              : 'Nothing to pay yet — we confirm your price first.' }}
          </p>
        </div>
        <span
          v-if="formattedAmount"
          class="inline-flex items-center rounded-full bg-romara-green px-4 py-2 text-sm font-bold text-white"
        >
          {{ formattedAmount }}
        </span>
      </div>

      <!--
        Quote-based request: no confirmed price exists, so there is nothing
        honest to charge. Taking money here would be taking it on a guess.
      -->
      <div v-if="!payable" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
        <p class="text-sm leading-relaxed text-romara-ink-soft">
          A consultant confirms availability and your final price, then sends a secure payment link
          by email. No payment is taken now.
        </p>
        <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" @click="emit('complete', 'later')">
          Got it
          <IconArrowRight class="h-4 w-4" />
        </BaseButton>
      </div>

      <template v-else>
        <!-- Method chooser -->
        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            v-for="m in methods"
            :key="m.key"
            type="button"
            :disabled="isPolling || sending"
            class="group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ease-out-expo disabled:opacity-50"
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

        <!-- M-Pesa -->
        <div v-if="method === 'mpesa'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
          <!-- Prompt is live on the phone -->
          <div v-if="awaitingPhone" class="py-4 text-center">
            <span class="mx-auto flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-romara-green/10 text-romara-green">
              <IconStopwatch class="h-7 w-7" />
            </span>
            <p class="mt-4 font-heading text-base font-semibold text-romara-green">Check your phone</p>
            <p class="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-romara-ink-soft">
              {{ status?.message ?? 'Enter your M-Pesa PIN on the prompt we just sent to complete the payment.' }}
            </p>
            <p class="mt-3 text-xs text-romara-ink-soft/80">Keep this page open while we confirm.</p>
          </div>

          <!-- Declined, cancelled or timed out -->
          <div v-else-if="declined" class="py-2 text-center">
            <p class="font-heading text-base font-semibold text-romara-green">Payment not completed</p>
            <p class="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-romara-ink-soft">
              {{ status?.message ?? 'The payment did not go through.' }}
            </p>
            <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" @click="retry">
              Try again
            </BaseButton>
          </div>

          <!-- We stopped waiting, but the payment may still be in flight -->
          <div v-else-if="timedOut" class="py-2 text-center">
            <p class="font-heading text-base font-semibold text-romara-green">Still waiting on M-Pesa</p>
            <p class="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-romara-ink-soft">
              We haven't heard back yet. If you completed the payment it will still be recorded, and
              we'll email your receipt. Don't pay twice.
            </p>
            <BaseButton variant="outline" block size="lg" class="mt-4 justify-center" @click="emit('complete', 'mpesa')">
              Continue
            </BaseButton>
          </div>

          <!-- Entry -->
          <template v-else>
            <label class="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-romara-ink-soft">
              M-Pesa phone number
            </label>
            <input
              v-model="mpesaPhone"
              type="tel"
              inputmode="tel"
              placeholder="07XX XXX XXX"
              :disabled="sending"
              class="w-full rounded-lg border border-romara-green/15 bg-white px-4 py-3 text-sm text-romara-ink focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/20"
            />
            <p class="mt-2 text-xs text-romara-ink-soft">
              You'll get a prompt on this number — enter your PIN to confirm.
            </p>
            <p v-if="errorMessage" class="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {{ errorMessage }}
            </p>
            <BaseButton
              variant="primary"
              block
              size="lg"
              class="mt-4 justify-center"
              :loading="sending"
              :disabled="sending || !mpesaPhone.trim()"
              @click="payWithMpesa"
            >
              {{ sending ? 'Sending request…' : `Pay ${formattedAmount ?? 'with M-Pesa'}` }}
            </BaseButton>
          </template>
        </div>

        <!-- Bank transfer: details only. We cannot see an EFT arrive, so this
             records nothing and promises nothing until the team matches it. -->
        <div v-else-if="method === 'bank'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
          <dl class="space-y-2.5 text-sm">
            <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Bank</dt><dd class="font-semibold text-romara-green">{{ bank.bank }}</dd></div>
            <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Account name</dt><dd class="text-right font-semibold text-romara-green">{{ bank.name }}</dd></div>
            <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Account no.</dt><dd class="font-semibold text-romara-green">{{ bank.account }}</dd></div>
            <div class="flex justify-between gap-3"><dt class="text-romara-ink-soft">Branch</dt><dd class="font-semibold text-romara-green">{{ bank.branch }}</dd></div>
            <div v-if="reference" class="flex justify-between gap-3 border-t border-romara-green/10 pt-2.5"><dt class="text-romara-ink-soft">Reference</dt><dd class="font-semibold text-romara-amber">{{ reference }}</dd></div>
          </dl>
          <p class="mt-3 text-xs leading-relaxed text-romara-ink-soft">
            Quote the reference so we can match your transfer. We'll email your receipt once it clears —
            usually the next working day.
          </p>
          <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" @click="emit('complete', 'bank')">
            I'll pay by transfer
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
        </div>

        <!-- Pay later -->
        <div v-else-if="method === 'later'" class="mt-6 rounded-2xl border border-romara-green/10 bg-romara-bone p-5">
          <p class="text-sm leading-relaxed text-romara-ink-soft">
            We'll hold your booking and send a secure payment link once your trip is confirmed.
            No payment is taken now.
          </p>
          <BaseButton variant="primary" block size="lg" class="mt-4 justify-center" @click="emit('complete', 'later')">
            Reserve &amp; pay later
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
        </div>
      </template>

      <button
        v-if="!isPolling && !sending"
        type="button"
        class="mt-5 block w-full text-center text-xs font-semibold text-romara-ink-soft underline-offset-2 hover:text-romara-green hover:underline"
        @click="emit('skip')"
      >
        Skip payment for now
      </button>
    </template>
  </div>
</template>
