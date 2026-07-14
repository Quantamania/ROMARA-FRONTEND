<script setup lang="ts">
import TransferBookingForm from '@/features/airport-transfers/components/TransferBookingForm.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
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
  <!-- Intro band -->
  <section class="bg-romara-cream py-16 sm:py-20">
    <div class="romara-container">
      <div class="mx-auto max-w-2xl text-center">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-romara-green text-white">
          <IconSuitcase class="h-7 w-7" />
        </span>

        <p class="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Airport Transfer Booking</p>
        <h1 class="mt-3 font-heading text-3xl font-bold text-romara-green sm:text-4xl">
          Travel with Comfort, Safety and Confidence
        </h1>
        <span class="mx-auto mt-3 block h-1 w-14 rounded bg-romara-amber" />

        <p class="mt-5 text-sm leading-relaxed text-romara-ink/70">
          Whether you're arriving in Kenya or departing for your next destination, ROMARA Tours &amp; Travel
          provides reliable, punctual, and professional airport transfer services designed to make every
          journey stress-free.
        </p>
        <p class="mt-2 text-sm text-romara-ink/70">
          Complete the booking form below and our team will confirm your reservation promptly.
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <div v-for="item in reassurances" :key="item.label" class="flex items-center gap-2 text-xs font-semibold text-romara-green">
            <component :is="item.icon" class="h-4 w-4 text-romara-amber" />
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Form, overlapping the cream band slightly for a smooth transition -->
  <section class="romara-container relative z-10 -mt-8 pb-16 sm:-mt-10">
    <TransferBookingForm />
  </section>
</template>