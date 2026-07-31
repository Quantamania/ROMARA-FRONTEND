<script setup lang="ts">
import IconGrid from '@/components/icons/IconGrid.vue'
import IconPawPrint from '@/components/icons/IconPawPrint.vue'
import IconMountain from '@/components/icons/IconMountain.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import type { GalleryCategory } from '@/features/gallery/api/gallery.api'

interface CategoryOption {
  icon: typeof IconGrid
  label: string
  value: GalleryCategory | 'all'
}

interface Props {
  modelValue: GalleryCategory | 'all'
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: GalleryCategory | 'all']
}>()

const categories: CategoryOption[] = [
  { icon: IconGrid, label: 'All Photos', value: 'all' },
  { icon: IconPawPrint, label: 'Wildlife', value: 'wildlife' },
  { icon: IconMountain, label: 'Landscapes', value: 'landscapes' },
  { icon: IconCar, label: 'Safari Vehicles', value: 'vehicles' },
  { icon: IconUsers, label: 'People & Culture', value: 'culture' },
  { icon: IconMapPin, label: 'Destinations', value: 'destinations' },
]

function selectCategory(value: GalleryCategory | 'all') {
  emit('update:modelValue', value)
}
</script>

<template>
  <!-- Mobile: a single horizontal-scroll chip strip (no wrapping, no overflow).
       sm+: chips wrap and center. Negative margins let the strip bleed to the
       screen edges on mobile so the last chip hints there's more to scroll. -->
  <div
    class="-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
  >
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="group flex shrink-0 snap-start items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber focus-visible:ring-offset-2"
      :class="
        modelValue === category.value
          ? 'bg-romara-green text-white shadow-card'
          : 'border border-black/10 bg-white text-romara-ink-soft shadow-soft hover:border-romara-green/40 hover:text-romara-green'
      "
      @click="selectCategory(category.value)"
    >
      <component
        :is="category.icon"
        class="h-3.5 w-3.5 transition-colors"
        :class="modelValue === category.value ? 'text-romara-amber-300' : 'text-romara-amber group-hover:text-romara-green'"
      />
      {{ category.label }}
    </button>
  </div>
</template>