<script setup lang="ts">
import IconPawPrint from '@/components/icons/IconPawPrint.vue'
import IconMountain from '@/components/icons/IconMountain.vue'
import IconPalmBeach from '@/components/icons/IconPalmBeach.vue'
import IconBuilding from '@/components/icons/IconBuilding.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import type { DestinationType } from '@/features/destinations/types/destination.types'

interface TypeOption {
  icon: typeof IconPawPrint
  label: string
  value: DestinationType
}

const typeOptions: TypeOption[] = [
  { icon: IconPawPrint, label: 'Wildlife & Safaris', value: 'wildlife' },
  { icon: IconMountain, label: 'Mountains & Hiking', value: 'mountains' },
  { icon: IconPalmBeach, label: 'Beaches & Coast', value: 'beaches' },
  { icon: IconBuilding, label: 'Cities & Towns', value: 'cities' },
  { icon: IconUsers, label: 'Culture & Heritage', value: 'culture' },
  { icon: IconCamera, label: 'Nature & Scenery', value: 'nature' },
]
</script>

<template>
  <!-- Refined reel of category badges that link into the filtered directory. -->
  <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
    <a
      v-for="option in typeOptions"
      :key="option.value"
      :href="`/destinations/directory?type=${option.value}`"
      class="group flex w-24 shrink-0 flex-col items-center gap-3 text-center sm:w-28"
    >
      <span
        class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-romara-green shadow-soft ring-1 ring-romara-green/10 transition-all duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:bg-romara-green group-hover:text-white group-hover:shadow-elevated group-hover:ring-romara-amber/40 sm:h-20 sm:w-20"
      >
        <component :is="option.icon" class="h-7 w-7 sm:h-8 sm:w-8" />
      </span>
      <p class="text-xs font-bold leading-snug text-romara-green transition-colors group-hover:text-romara-amber">
        {{ option.label }}
      </p>
    </a>
  </div>
</template>