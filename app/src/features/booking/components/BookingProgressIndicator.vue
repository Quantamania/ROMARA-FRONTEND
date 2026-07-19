<script setup lang="ts">
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import { useBookingStore } from '@/features/booking/store/booking.store'

const bookingStore = useBookingStore()

const steps = [
  { number: 1, label: 'Trip Details' },
  { number: 2, label: 'Your Details' },
  { number: 3, label: 'Additional Info' },
  { number: 4, label: 'Review & Confirm' },
]

function handleStepClick(stepNumber: number) {
  bookingStore.goToStep(stepNumber)
}
</script>

<template>
  <div class="flex items-center">
    <template v-for="(step, index) in steps" :key="step.number">
      <button
        type="button"
        class="flex flex-col items-center gap-2 text-center"
        :class="step.number > bookingStore.furthestStepReached ? 'cursor-default' : 'cursor-pointer'"
        :disabled="step.number > bookingStore.furthestStepReached"
        @click="handleStepClick(step.number)"
      >
        <span
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors"
          :class="[
            step.number === bookingStore.currentStep && 'bg-romara-amber text-white',
            step.number < bookingStore.currentStep && 'bg-romara-green text-white',
            step.number > bookingStore.currentStep && 'bg-white text-romara-ink/40 ring-1 ring-black/10',
          ]"
        >
          <IconCheckSquare v-if="step.number < bookingStore.currentStep" class="h-4 w-4" />
          <span v-else>{{ step.number }}</span>
        </span>
        <span
          class="hidden text-xs font-semibold sm:block"
          :class="step.number === bookingStore.currentStep ? 'text-romara-amber' : 'text-romara-ink/60'"
        >
          {{ step.label }}
        </span>
      </button>

      <span
        v-if="index < steps.length - 1"
        class="mx-2 h-px flex-1 sm:mx-4"
        :class="step.number < bookingStore.currentStep ? 'bg-romara-green' : 'bg-black/10'"
      />
    </template>
  </div>
</template>