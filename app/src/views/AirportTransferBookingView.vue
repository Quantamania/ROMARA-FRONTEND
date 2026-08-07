<script setup lang="ts">
import TransferBookingForm from '@/features/airport-transfers/components/TransferBookingForm.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconDollarCircle from '@/components/icons/IconDollarCircle.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'
import IconPlaneTakeoff from '@/components/icons/IconPlaneTakeoff.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'

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
  <!-- On-theme header (no hero): editorial title + a boarding-pass style route strip -->
  <section class="border-b border-romara-green/10 bg-romara-bone">
    <div class="romara-container py-8 sm:py-10">
      <nav class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-romara-ink-soft" aria-label="Breadcrumb">
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-romara-ink-soft/40">/</span>
        <a href="/airport-transfers" class="transition-colors hover:text-romara-amber">Airport Transfers</a>
        <span class="text-romara-ink-soft/40">/</span>
        <span class="text-romara-green">Book</span>
      </nav>

      <div class="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
        <!-- Title + trust -->
        <div class="max-w-xl">
          <p class="eyebrow mb-3">Airport Transfer</p>
          <h1 class="font-heading text-display-sm font-semibold text-romara-green">Book Your Transfer</h1>
          <span class="accent-rule mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-romara-ink-soft">
            Fill in the details below and a travel consultant will confirm your reservation promptly — your live
            summary updates as you go.
          </p>

          <div class="mt-6 flex flex-wrap gap-2.5">
            <div
              v-for="item in reassurances"
              :key="item.label"
              class="inline-flex items-center gap-2 rounded-full border border-romara-green/12 bg-white px-3.5 py-2 text-xs font-semibold text-romara-green shadow-soft"
            >
              <component :is="item.icon" class="h-4 w-4 text-romara-amber" />
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Route strip -->
        <div class="w-full rounded-card border border-romara-green/12 bg-white p-5 shadow-soft lg:w-[320px]">
          <p class="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-romara-ink-soft">Your route</p>

          <div class="flex items-center gap-2">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-romara-amber text-white shadow-glow-amber">
              <IconPlaneLanding class="h-5 w-5" />
            </span>

            <div class="route-path relative flex-1">
              <div class="border-t-2 border-dashed border-romara-green/30" />
              <span class="plane absolute top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-romara-amber" aria-hidden="true">
                <IconPlaneTakeoff class="h-4 w-4" />
              </span>
            </div>

            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-romara-green text-romara-amber-300">
              <IconMapPin class="h-5 w-5" />
            </span>
          </div>

          <div class="mt-2.5 flex items-center justify-between px-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-romara-green">
            <span>Airport</span>
            <span>Destination</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Booking form -->
  <section class="section-y bg-romara-bone pt-10 sm:pt-12">
    <div class="romara-container">
      <TransferBookingForm />
    </div>
  </section>
</template>

<style scoped>
/* The plane taxis gently along the dashed flight path — a small on-theme moment. */
.plane {
  left: 45%;
}
@media (prefers-reduced-motion: no-preference) {
  .plane {
    animation: taxi 4.5s ease-in-out infinite alternate;
  }
}
@keyframes taxi {
  from {
    left: 14%;
  }
  to {
    left: 80%;
  }
}
</style>
