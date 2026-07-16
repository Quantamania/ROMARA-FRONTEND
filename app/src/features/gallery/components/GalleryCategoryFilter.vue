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
  <div class="flex flex-wrap justify-center gap-2.5">
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="
        modelValue === category.value
          ? 'bg-romara-green text-white'
          : 'bg-white text-romara-ink border border-black/10 hover:border-romara-green'
      "
      @click="selectCategory(category.value)"
    >
      <component :is="category.icon" class="h-3.5 w-3.5" />
      {{ category.label }}
    </button>
  </div>
</template>