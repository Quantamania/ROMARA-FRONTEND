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
  <div class="flex items-start justify-between">
    <template v-for="(step, index) in steps" :key="step.number">
      <button
        type="button"
        class="group flex flex-col items-center gap-3 text-center"
        :class="step.number > bookingStore.furthestStepReached ? 'cursor-default' : 'cursor-pointer'"
        :disabled="step.number > bookingStore.furthestStepReached"
        :aria-current="step.number === bookingStore.currentStep ? 'step' : undefined"
        @click="handleStepClick(step.number)"
      >
        <span
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold transition-all duration-500 ease-out-expo"
          :class="[
            step.number === bookingStore.currentStep && 'bg-amber-fade text-white shadow-glow-amber scale-110',
            step.number < bookingStore.currentStep && 'bg-romara-green text-white shadow-soft',
            step.number > bookingStore.currentStep && 'border border-romara-green/15 bg-white text-romara-ink-soft/60 group-hover:border-romara-amber/40',
          ]"
        >
          <IconCheckSquare v-if="step.number < bookingStore.currentStep" class="h-5 w-5" />
          <span v-else>{{ step.number }}</span>
        </span>
        <span
          class="hidden text-xs font-semibold uppercase tracking-[0.1em] transition-colors sm:block"
          :class="
            step.number === bookingStore.currentStep
              ? 'text-romara-amber-600'
              : step.number < bookingStore.currentStep
                ? 'text-romara-green'
                : 'text-romara-ink-soft/50'
          "
        >
          {{ step.label }}
        </span>
      </button>

      <div
        v-if="index < steps.length - 1"
        class="mx-2 mt-6 h-0.5 flex-1 overflow-hidden rounded-full bg-romara-green/10 sm:mx-4"
      >
        <div
          class="h-full rounded-full transition-all duration-500 ease-out-expo"
          :class="step.number < bookingStore.currentStep ? 'w-full bg-amber-fade' : 'w-0 bg-romara-amber'"
        />
      </div>
    </template>
  </div>
</template>
