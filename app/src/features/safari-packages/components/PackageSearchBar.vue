<script setup lang="ts">
import { usePackagesStore } from '@/features/safari-packages/store/packages.store'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconX from '@/components/icons/IconX.vue'

const packagesStore = usePackagesStore()
</script>

<template>
  <div class="group relative w-full">
    <IconSearch
      class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-romara-ink/40 transition-colors duration-300 group-focus-within:text-romara-amber"
      aria-hidden="true"
    />
    <input
      v-model="packagesStore.searchQuery"
      type="search"
      placeholder="Search packages or destinations…"
      aria-label="Search safari packages"
      class="w-full rounded-full border border-romara-green/15 bg-white py-3.5 pl-11 pr-11 text-sm text-romara-ink shadow-soft transition-all duration-300 placeholder:text-romara-ink/40 hover:border-romara-green/30 focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-green/15"
    />
    <button
      v-if="packagesStore.searchQuery"
      type="button"
      aria-label="Clear search"
      class="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-romara-ink/50 transition-colors duration-300 hover:bg-romara-green/5 hover:text-romara-green"
      @click="packagesStore.searchQuery = ''"
    >
      <IconX class="h-3.5 w-3.5" />
    </button>
  </div>
</template>
