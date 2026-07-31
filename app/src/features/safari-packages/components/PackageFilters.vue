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

const selectClass =
  'appearance-none rounded-full border border-romara-green/15 bg-white py-2.5 pl-4 pr-9 text-[11px] font-bold uppercase tracking-[0.12em] text-romara-ink shadow-soft transition-colors duration-300 hover:border-romara-green/30 focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/15'
</script>

<template>
  <!-- Mobile: a single horizontally-scrollable chip strip that bleeds to the
       screen edges. Desktop: wraps inline next to the search field. -->
  <div
    class="-mx-5 flex items-center gap-2.5 overflow-x-auto px-5 py-0.5 sm:mx-0 sm:flex-wrap sm:px-0"
  >
    <button
      type="button"
      class="shrink-0 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-green/30"
      :class="isAllPackagesActive
        ? 'bg-romara-green text-white shadow-soft'
        : 'border border-romara-green/15 bg-white text-romara-ink shadow-soft hover:border-romara-green/30 hover:text-romara-green'"
      @click="showAllPackages"
    >
      All Packages
    </button>

    <div class="relative shrink-0">
      <select
        v-model="packagesStore.durationFilter"
        aria-label="Filter by duration"
        :class="selectClass"
      >
        <option value="all">Duration</option>
        <option value="short">1–3 Days</option>
        <option value="medium">4–6 Days</option>
        <option value="long">7+ Days</option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
    </div>

    <div class="relative shrink-0">
      <select
        v-model="packagesStore.destinationFilter"
        aria-label="Filter by destination"
        :class="selectClass"
      >
        <option value="all">Destinations</option>
        <option v-for="destination in packagesStore.destinationOptions.filter((d) => d !== 'all')" :key="destination" :value="destination">
          {{ destination }}
        </option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/50" />
    </div>

    <!-- Type filter is a placeholder until package data includes a `type` field
         (e.g. luxury / mid-range / budget, per the brief). Wire it up the same
         way as Duration/Destination once that field exists on SafariPackage. -->
    <div class="relative shrink-0">
      <select
        disabled
        aria-label="Filter by type (coming soon)"
        class="appearance-none rounded-full border border-romara-green/10 bg-romara-bone py-2.5 pl-4 pr-9 text-[11px] font-bold uppercase tracking-[0.12em] text-romara-ink/40"
      >
        <option>Type</option>
      </select>
      <IconChevronDown class="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-romara-ink/30" />
    </div>
  </div>
</template>
