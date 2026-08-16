<script setup lang="ts">
import VehicleHireForm from '@/features/vehicle-hire/components/VehicleHireForm.vue'
</script>

<template>
  <section class="bg-romara-bone py-8 sm:py-10">
    <div class="romara-container">
      <nav
        class="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-romara-ink-soft"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-romara-ink-soft/40">/</span>
        <span class="text-romara-green">Vehicle Hire</span>
      </nav>

      <VehicleHireForm />
    </div>
  </section>
</template>
