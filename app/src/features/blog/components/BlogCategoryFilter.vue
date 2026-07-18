<script setup lang="ts">
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconPawPrint from '@/components/icons/IconPawPrint.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import type { BlogCategory } from '@/features/blog/types/blog.types'

interface CategoryOption {
  icon: typeof IconBinoculars
  label: string
  value: BlogCategory
}

interface Props {
  modelValue: BlogCategory | null
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: BlogCategory | null]
}>()

const categories: CategoryOption[] = [
  { icon: IconBinoculars, label: 'Safari Tips', value: 'safari_tips' as BlogCategory },
  { icon: IconMapPin, label: 'Destinations', value: 'destinations' as BlogCategory },
  { icon: IconCompass, label: 'Travel Guides', value: 'travel_guides' as BlogCategory },
  { icon: IconPawPrint, label: 'Wildlife', value: 'wildlife' as BlogCategory },
  { icon: IconCalendar, label: 'Travel News', value: 'travel_news' as BlogCategory },
  { icon: IconUsers, label: 'Culture & People', value: 'culture_people' as BlogCategory },
]

function selectCategory(value: BlogCategory, isActive: boolean) {
  // Clicking the already-active category clears the filter.
  emit('update:modelValue', isActive ? null : value)
}
</script>

<template>
  <div class="flex gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="flex shrink-0 flex-col items-center gap-2 rounded-lg border bg-white px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-card"
      :class="modelValue === category.value ? 'border-romara-amber ring-1 ring-romara-amber' : 'border-black/10'"
      @click="selectCategory(category.value, modelValue === category.value)"
    >
      <component :is="category.icon" class="h-6 w-6" :class="modelValue === category.value ? 'text-romara-amber' : 'text-romara-green'" />
      <p class="text-xs font-semibold text-romara-green">{{ category.label }}</p>
    </button>
  </div>
</template>