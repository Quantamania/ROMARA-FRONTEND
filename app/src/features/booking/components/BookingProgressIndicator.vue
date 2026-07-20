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
  <div class="flex justify-between items-center">
    <template v-for="(step, index) in steps" :key="step.number">
      <button
        type="button"
        class="group flex flex-col items-center gap-3 text-center"
        :class="step.number > bookingStore.furthestStepReached ? 'cursor-default' : 'cursor-pointer'"
        :disabled="step.number > bookingStore.furthestStepReached"
        @click="handleStepClick(step.number)"
      >
        <span
          class="flex justify-center items-center shadow-md rounded-full w-12 h-12 font-bold text-sm transition-all duration-300 shrink-0"
          :class="[
            step.number === bookingStore.currentStep && 'bg-gradient-to-br from-romara-amber to-romara-amber-light text-white shadow-lg shadow-romara-amber/30 scale-110',
            step.number < bookingStore.currentStep && 'bg-gradient-to-br from-romara-green to-romara-green-dark text-white shadow-md shadow-romara-green/20',
            step.number > bookingStore.currentStep && 'bg-white text-romara-ink/30 border-2 border-romara-green/20',
          ]"
        >
          <IconCheckSquare v-if="step.number < bookingStore.currentStep" class="w-5 h-5" />
          <span v-else>{{ step.number }}</span>
        </span>
        <span
          class="hidden sm:block font-semibold text-xs transition-colors"
          :class="step.number === bookingStore.currentStep ? 'text-romara-amber font-bold' : step.number < bookingStore.currentStep ? 'text-romara-green' : 'text-romara-ink/40'"
        >
          {{ step.label }}
        </span>
      </button>

      <div
        v-if="index < steps.length - 1"
        class="flex-1 mx-2 sm:mx-4 rounded-full h-1 overflow-hidden"
      >
        <div
          class="rounded-full h-full transition-all duration-500 ease-out"
          :class="step.number < bookingStore.currentStep ? 'w-full bg-gradient-to-r from-romara-green to-romara-green-dark' : 'w-full bg-romara-green/10'"
        />
      </div>
    </template>
  </div>
</template>