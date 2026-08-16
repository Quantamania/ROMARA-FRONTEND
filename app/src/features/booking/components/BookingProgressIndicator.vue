<script setup lang="ts">
import { computed } from 'vue'
import { useBookingStore } from '@/features/booking/store/booking.store'

const bookingStore = useBookingStore()

const steps = [
  { number: 1, label: 'Trip Details' },
  { number: 2, label: 'Your Details' },
  { number: 3, label: 'Additional Info' },
  { number: 4, label: 'Review & Confirm' },
]

const currentLabel = computed(
  () => steps.find((s) => s.number === bookingStore.currentStep)?.label ?? '',
)

function handleStepClick(stepNumber: number) {
  if (stepNumber <= bookingStore.furthestStepReached) bookingStore.goToStep(stepNumber)
}
</script>

<template>
  <div>
    <div class="mb-2.5 flex items-baseline justify-between gap-3">
      <p class="truncate font-heading text-sm font-semibold text-romara-green sm:text-[0.95rem]">
        {{ currentLabel }}
      </p>
      <p class="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-romara-amber-600">
        Step {{ bookingStore.currentStep }}<span class="text-romara-ink-soft/45"> / {{ steps.length }}</span>
      </p>
    </div>

    <!-- Slim segmented bar: one filled sliver per completed/active step -->
    <div class="flex gap-1.5">
      <button
        v-for="step in steps"
        :key="step.number"
        type="button"
        class="h-1.5 flex-1 overflow-hidden rounded-full bg-romara-green/12 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40"
        :class="step.number <= bookingStore.furthestStepReached ? 'cursor-pointer hover:bg-romara-green/20' : 'cursor-default'"
        :disabled="step.number > bookingStore.furthestStepReached"
        :aria-label="`Step ${step.number}: ${step.label}`"
        :aria-current="step.number === bookingStore.currentStep ? 'step' : undefined"
        @click="handleStepClick(step.number)"
      >
        <span
          class="block h-full rounded-full bg-amber-fade transition-all duration-500 ease-out-expo"
          :class="step.number <= bookingStore.currentStep ? 'w-full' : 'w-0'"
        />
      </button>
    </div>
  </div>
</template>
