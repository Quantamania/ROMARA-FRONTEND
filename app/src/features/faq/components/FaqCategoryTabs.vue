<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
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
  <!-- Mobile: horizontal scroll chip strip · Desktop: vertical sticky nav list -->
  <div
    class="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <button
      v-for="category in categories"
      :key="category.value"
      type="button"
      class="group inline-flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40 focus-visible:ring-offset-2 lg:w-full lg:shrink lg:justify-start lg:rounded-xl lg:px-4 lg:py-3.5"
      :class="modelValue === category.value
        ? 'border-transparent bg-romara-green text-white shadow-soft'
        : 'border-romara-green/15 bg-white text-romara-green hover:-translate-y-0.5 hover:border-romara-green/30 hover:shadow-card lg:hover:translate-y-0 lg:hover:translate-x-1'"
      :aria-pressed="modelValue === category.value"
      @click="selectCategory(category.value, modelValue === category.value)"
    >
      <component
        :is="category.icon"
        class="h-4 w-4 shrink-0 transition-colors"
        :class="modelValue === category.value ? 'text-romara-amber-300' : 'text-romara-amber'"
      />
      <span class="whitespace-nowrap lg:whitespace-normal lg:text-left">{{ category.label }}</span>
      <IconArrowRight
        class="ml-auto hidden h-4 w-4 shrink-0 -translate-x-1 text-romara-amber-300 opacity-0 transition-all duration-300 ease-out-expo lg:block"
        :class="modelValue === category.value ? 'translate-x-0 opacity-100' : ''"
        aria-hidden="true"
      />
    </button>
  </div>
</template>
