<script setup lang="ts">
import type { DayTripCategory } from '@/features/day-trips/types/dayTrip.types'

interface CategoryOption {
  label: string
  value: DayTripCategory | 'all'
}

interface Props {
  modelValue: DayTripCategory | 'all'
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: DayTripCategory | 'all']
}>()

const categories: CategoryOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Wildlife', value: 'wildlife' },
  { label: 'Nature', value: 'nature' },
  { label: 'Culture', value: 'culture' },
  { label: 'Hiking', value: 'hiking' },
  { label: 'Family', value: 'family' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'City Tours', value: 'city' },
]

function selectCategory(value: DayTripCategory | 'all') {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex flex-wrap gap-1.5 rounded-full border border-romara-green/10 bg-white p-1.5 shadow-soft">
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/50"
      :class="
        modelValue === category.value
          ? 'bg-romara-green text-white shadow-soft'
          : 'text-romara-ink/60 hover:bg-romara-bone hover:text-romara-green'
      "
      :aria-pressed="modelValue === category.value"
      @click="selectCategory(category.value)"
    >
      {{ category.label }}
    </button>
  </div>
</template>