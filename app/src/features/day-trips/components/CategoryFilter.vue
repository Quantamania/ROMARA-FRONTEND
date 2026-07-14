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
  <div class="flex flex-wrap gap-2">
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors"
      :class="
        modelValue === category.value
          ? 'bg-romara-green text-white'
          : 'bg-white text-romara-ink border border-black/10 hover:border-romara-green'
      "
      @click="selectCategory(category.value)"
    >
      {{ category.label }}
    </button>
  </div>
</template>