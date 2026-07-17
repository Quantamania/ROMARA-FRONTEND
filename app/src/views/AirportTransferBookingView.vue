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
  <!-- Full page background -->
  <div class="relative min-h-screen">
    <img
      src="/src/assets/images/airport-transfers/airport-van.png"
      alt="Airport transfer background"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-white/75" />

    <!-- Content -->
    <div class="relative">
      <!-- Intro band -->
      <section class="py-16 sm:py-20">
        <div class="romara-container">
          <div class="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
            <!-- Left content -->
            <div class="text-romara-ink">
              <span class="inline-flex justify-center items-center bg-romara-green rounded-full w-14 h-14 text-white">
                <IconSuitcase class="w-7 h-7" />
              </span>

              <p class="mt-5 font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Airport Transfer Booking</p>
              <h1 class="mt-3 font-heading font-bold text-romara-green text-3xl sm:text-4xl leading-tight">
                Travel with Comfort, Safety and Confidence
              </h1>
              <span class="block bg-romara-amber mt-3 rounded w-14 h-1" />

              <p class="mt-5 text-romara-ink/70 text-base leading-relaxed">
                ROMARA Tours &amp; Travel provides reliable, punctual, and professional airport transfer services for stress-free journeys.
              </p>
              <p class="mt-2 text-romara-ink/70 text-base">
                Complete the booking form and we'll confirm your reservation promptly.
              </p>

              <div class="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-8">
                <div v-for="item in reassurances" :key="item.label" class="flex items-center gap-3 bg-white shadow-card p-4 border border-romara-ink/10 rounded-lg">
                  <component :is="item.icon" class="w-5 h-5 text-romara-amber shrink-0" />
                  <span class="font-semibold text-romara-ink text-sm">{{ item.label }}</span>
                </div>
              </div>
            </div>

            <!-- Right content - empty for now -->
            <div class="hidden lg:block"></div>
          </div>
        </div>
      </section>

      <!-- Form -->
      <section class="pb-16 romara-container">
        <TransferBookingForm />
      </section>
    </div>
  </div>
</template>