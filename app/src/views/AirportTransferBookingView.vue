<script setup lang="ts">
import TransferBookingForm from '@/features/airport-transfers/components/TransferBookingForm.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconDollarCircle from '@/components/icons/IconDollarCircle.vue'

interface Reassurance {
  icon: typeof IconShield
  label: string
}

const reassurances: Reassurance[] = [
  { icon: IconShield, label: 'Safe & Secure' },
  { icon: IconClock, label: 'Quick Confirmation' },
  { icon: IconDollarCircle, label: 'No Hidden Fees' },
]
</script>

<template>
  <!-- Hero masthead — lean focused task band -->
  <section class="relative isolate overflow-hidden bg-green-fade text-white">
    <div class="romara-container relative py-12 sm:py-14">
      <nav
        class="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/55"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <a href="/airport-transfers" class="transition-colors hover:text-romara-amber">Airport Transfers</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Book</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance animate-fade-up">
        Travel with Comfort, Safety and Confidence
      </h1>

      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
        Complete the booking form below and we'll confirm your reservation promptly.
      </p>

      <div class="mt-6 flex flex-nowrap gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        <div
          v-for="item in reassurances"
          :key="item.label"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white ring-1 ring-white/15 sm:text-sm"
        >
          <component :is="item.icon" class="h-4 w-4 text-romara-amber-300" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Booking form -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="mb-10 max-w-2xl">
        <p class="eyebrow mb-3">
          
          Reservation Details
        </p>
        <h2 class="font-heading text-display-sm font-semibold text-romara-green">Complete Your Booking</h2>
        <span class="accent-rule mt-4" />
        <p class="mt-4 text-sm leading-relaxed text-romara-ink-soft">
          Fill in the details below and a travel consultant will confirm your reservation promptly. Your live summary
          updates as you go.
        </p>
      </div>

      <TransferBookingForm />
    </div>
  </section>
</template>
