<script setup lang="ts">
import TransferBookingForm from '@/features/airport-transfers/components/TransferBookingForm.vue'
import PageHero from '@/components/ui/PageHero.vue'
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
  <!-- Hero masthead -->
  <PageHero
    eyebrow="Airport Transfer Booking"
    title="Travel with Comfort, Safety and Confidence"
    subtitle="ROMARA Tours &amp; Travel provides reliable, punctual, and professional airport transfer services for stress-free journeys. Complete the booking form and we'll confirm your reservation promptly."
    image="/src/assets/images/airport-transfers/airport-van.png"
    size="md"
    :breadcrumbs="[
      { label: 'Home', href: '/' },
      { label: 'Airport Transfers', href: '/airport-transfers' },
      { label: 'Book' },
    ]"
  >
    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in reassurances"
        :key="item.label"
        class="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold text-white"
      >
        <component :is="item.icon" class="h-4 w-4 text-romara-amber-300" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </PageHero>

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
