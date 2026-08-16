<script setup lang="ts">
import { computed } from 'vue'
import IconCheck from '@/components/icons/IconCheck.vue'
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
  bookingStore.goToStep(stepNumber)
}
</script>

<template>
  <div>
    <!-- Context header — carries the label on mobile (where the per-step labels are hidden) -->
    <div class="mb-6 flex items-baseline justify-between gap-3">
      <p class="font-heading text-base font-semibold text-romara-green sm:text-lg">{{ currentLabel }}</p>
      <p class="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-romara-amber-600">
        Step {{ bookingStore.currentStep }}<span class="text-romara-ink-soft/45"> / {{ steps.length }}</span>
      </p>
    </div>

    <div class="flex items-start justify-between">
      <template v-for="(step, index) in steps" :key="step.number">
        <button
          type="button"
          class="group flex flex-col items-center gap-2.5 text-center"
          :class="step.number > bookingStore.furthestStepReached ? 'cursor-default' : 'cursor-pointer'"
          :disabled="step.number > bookingStore.furthestStepReached"
          :aria-current="step.number === bookingStore.currentStep ? 'step' : undefined"
          @click="handleStepClick(step.number)"
        >
          <span class="relative flex h-12 w-12 shrink-0 items-center justify-center">
            <!-- Soft amber halo on the active step -->
            <span
              v-if="step.number === bookingStore.currentStep"
              class="absolute inset-0 rounded-full bg-romara-amber/20 blur-[6px]"
              aria-hidden="true"
            />
            <span
              class="relative flex h-12 w-12 items-center justify-center rounded-full font-heading text-sm font-semibold transition-all duration-500 ease-out-expo"
              :class="[
                step.number === bookingStore.currentStep && 'bg-amber-fade text-white shadow-glow-amber ring-4 ring-romara-amber/25 scale-105',
                step.number < bookingStore.currentStep && 'bg-romara-green text-white shadow-soft',
                step.number > bookingStore.currentStep && 'border border-romara-green/15 bg-white text-romara-ink-soft/55 group-hover:border-romara-amber/40 group-hover:text-romara-amber',
              ]"
            >
              <IconCheck v-if="step.number < bookingStore.currentStep" class="h-5 w-5 [stroke-width:2.5]" />
              <span v-else>{{ step.number }}</span>
            </span>
          </span>

          <span
            class="hidden max-w-[7rem] text-[11px] font-bold uppercase leading-tight tracking-[0.1em] transition-colors sm:block"
            :class="
              step.number === bookingStore.currentStep
                ? 'text-romara-amber-600'
                : step.number < bookingStore.currentStep
                  ? 'text-romara-green'
                  : 'text-romara-ink-soft/45'
            "
          >
            {{ step.label }}
          </span>
        </button>

        <!-- Connector — sits level with the circle centres, fills amber once passed -->
        <div
          v-if="index < steps.length - 1"
          class="mx-2 mt-6 h-1 flex-1 overflow-hidden rounded-full bg-romara-green/10 sm:mx-4"
        >
          <div
            class="h-full rounded-full bg-amber-fade transition-all duration-700 ease-out-expo"
            :class="step.number < bookingStore.currentStep ? 'w-full' : 'w-0'"
          />
        </div>
      </template>
    </div>
  </div>
</template>
