<script setup lang="ts">
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconPawPrint from '@/components/icons/IconPawPrint.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCard from '@/components/icons/IconCard.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import type { FaqCategory } from '@/features/faq/api/faq.api'

interface CategoryOption {
  icon: typeof IconCalendarCheck
  label: string
  value: FaqCategory
}

interface Props {
  modelValue: FaqCategory | null
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: FaqCategory | null]
}>()

const categories: CategoryOption[] = [
  { icon: IconCalendarCheck, label: 'Booking & Reservations', value: 'booking' },
  { icon: IconCar, label: 'Airport Transfers', value: 'airport-transfers' },
  { icon: IconPawPrint, label: 'Safari Packages', value: 'safari-packages' },
  { icon: IconMapPin, label: 'Destinations', value: 'destinations' },
  { icon: IconCard, label: 'Payments & Pricing', value: 'payments' },
  { icon: IconShield, label: 'Travel Info & Safety', value: 'safety' },
  { icon: IconHeadset, label: 'General Questions', value: 'general' },
]

function selectCategory(value: FaqCategory, isActive: boolean) {
  // Clicking the already-active category clears the filter, returning to Top Questions.
  emit('update:modelValue', isActive ? null : value)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="flex flex-col items-center gap-3 rounded-xl border bg-romara-cream/60 px-3 py-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-card"
      :class="modelValue === category.value ? 'border-romara-green ring-1 ring-romara-green' : 'border-transparent'"
      @click="selectCategory(category.value, modelValue === category.value)"
    >
      <span
        class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-romara-green shadow-sm"
        :class="modelValue === category.value && 'bg-romara-green text-white'"
      >
        <component :is="category.icon" class="h-5 w-5" />
      </span>
      <p class="text-xs font-semibold leading-snug text-romara-green">{{ category.label }}</p>
    </button>
  </div>
</template>
