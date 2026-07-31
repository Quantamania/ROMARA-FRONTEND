<script setup lang="ts">
import IconLock from '@/components/icons/IconLock.vue'
import IconShield from '@/components/icons/IconShield.vue'

const paymentMethods = ['Visa', 'Mastercard', 'M-Pesa', 'Bank Transfer']
</script>

<template>
  <div class="grid grid-cols-1 items-center gap-8 rounded-card border border-romara-green/10 bg-white p-8 shadow-card sm:grid-cols-3 sm:p-10">
    <div class="flex items-start gap-4">
      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-fade text-white shadow-soft">
        <IconLock class="h-6 w-6" />
      </span>
      <div>
        <p class="font-heading text-base font-semibold text-romara-green">Secure Payments</p>
        <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">Your payments are 100% secure with trusted partners.</p>
      </div>
    </div>

    <div class="sm:border-x sm:border-romara-green/10 sm:px-8">
      <p class="eyebrow mb-3">
        
        We Accept
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="method in paymentMethods"
          :key="method"
          class="rounded-lg border border-romara-green/15 bg-romara-bone px-4 py-2 text-xs font-semibold text-romara-green transition-all duration-300 ease-out-expo hover:border-romara-amber/40 hover:shadow-soft"
        >
          {{ method }}
        </span>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-fade text-white shadow-soft">
        <IconShield class="h-6 w-6" />
      </span>
      <div>
        <p class="font-heading text-base font-semibold text-romara-green">Best Price Guarantee</p>
        <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">Get the best value for your safari and holiday.</p>
      </div>
    </div>
  </div>
</template>
