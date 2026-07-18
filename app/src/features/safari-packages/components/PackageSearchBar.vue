<script setup lang="ts">
import { usePackagesStore } from '@/features/safari-packages/store/packages.store'

const packagesStore = usePackagesStore()
</script>

<template>
  <div class="relative w-full sm:max-w-sm">
    <input
      v-model="packagesStore.searchQuery"
      type="search"
      placeholder="Search by package or destination..."
      class="w-full rounded-md border border-black/10 bg-white py-2.5 pl-4 pr-4 text-sm text-romara-ink placeholder:text-romara-ink/40 focus:border-romara-green focus:outline-none"
    />
  </div>
</template>