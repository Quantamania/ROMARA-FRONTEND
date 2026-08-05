<script setup lang="ts">
import VehicleHireForm from '@/features/vehicle-hire/components/VehicleHireForm.vue'
</script>

<template>
  <!-- Hire form -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <nav
        class="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-romara-ink-soft"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-romara-ink-soft/40">/</span>
        <span class="text-romara-green">Vehicle Hire</span>
      </nav>

      <div class="mb-10 max-w-2xl">
        <p class="eyebrow mb-3">Vehicle Hire</p>
        <h1 class="font-heading text-display-sm font-semibold text-romara-green">Build Your Hire Request</h1>
        <span class="accent-rule mt-4" />
        <p class="mt-4 text-sm leading-relaxed text-romara-ink-soft">
          Pick your vehicle, choose a driver or self-drive, and your live summary — including an indicative
          total — updates as you go. A consultant confirms availability and the final rate before pick-up.
        </p>
      </div>

      <VehicleHireForm />
    </div>
  </section>
</template>
