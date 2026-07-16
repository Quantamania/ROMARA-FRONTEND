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
  <!-- Horizontal scrollable "reel" of circular badges, snap-scrolling on mobile -->
  <div class="flex flex-wrap justify-center gap-8">
    <a
      v-for="option in typeOptions"
      :key="option.value"
      :href="`/destinations/directory?type=${option.value}`"
     class="group flex w-24 shrink-0 flex-col items-center gap-2.5 text-center"
    >
      <span class="flex h-16 w-16 items-center justify-center rounded-full bg-white text-romara-green shadow-card transition-all group-hover:-translate-y-1 group-hover:bg-romara-green group-hover:text-white">
        <component :is="option.icon" class="h-7 w-7" />
      </span>
      <p class="text-xs font-bold leading-snug text-romara-green">{{ option.label }}</p>
    </a>
  </div>
</template>