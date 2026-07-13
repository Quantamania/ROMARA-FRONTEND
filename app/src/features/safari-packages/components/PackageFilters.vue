<script setup lang="ts">
import { computed } from 'vue'
import { usePackagesStore } from '@/features/safari-packages/store/packages.store'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'

const packagesStore = usePackagesStore()

const isAllPackagesActive = computed(function checkIfAllPackagesActive() {
  return (
    packagesStore.durationFilter === 'all' &&
    packagesStore.destinationFilter === 'all' &&
    packagesStore.searchQuery === ''
  )
})

function showAllPackages() {
  packagesStore.resetFilters()
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="isAllPackagesActive ? 'bg-romara-green text-white' : 'bg-white text-romara-ink border border-black/10 hover:border-romara-green'"
      @click="showAllPackages"
    >
      All Packages
    </button>

    <div class="relative">
      <select
        v-model="packagesStore.durationFilter"
        class="appearance-none rounded-md border border-black/10 bg-white py-2 pl-4 pr-9 text-xs font-semibold uppercase tracking-wide text-romara-ink focus:border-romara-green focus:outline-none"
      >
        <option value="all">Duration</option>
        <option value="short">1–3 Days</option>
        <option value="medium">4–6 Days</option>
        <option value="long">7+ Days</option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
    </div>

    <div class="relative">
      <select
        v-model="packagesStore.destinationFilter"
        class="appearance-none rounded-md border border-black/10 bg-white py-2 pl-4 pr-9 text-xs font-semibold uppercase tracking-wide text-romara-ink focus:border-romara-green focus:outline-none"
      >
        <option value="all">Destinations</option>
        <option v-for="destination in packagesStore.destinationOptions.filter((d) => d !== 'all')" :key="destination" :value="destination">
          {{ destination }}
        </option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
    </div>

    <!-- Type filter is a placeholder until package data includes a `type` field
         (e.g. luxury / mid-range / budget, per the brief). Wire it up the same
         way as Duration/Destination once that field exists on SafariPackage. -->
    <div class="relative">
      <select
        disabled
        class="appearance-none rounded-md border border-black/10 bg-white py-2 pl-4 pr-9 text-xs font-semibold uppercase tracking-wide text-romara-ink/40"
      >
        <option>Type</option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/30" />
    </div>
  </div>
</template>
