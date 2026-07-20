<script setup lang="ts">
import IconLock from '@/components/icons/IconLock.vue'
import IconShield from '@/components/icons/IconShield.vue'

const paymentMethods = ['Visa', 'Mastercard', 'M-Pesa', 'Bank Transfer']
</script>

<template>
  <div class="gap-6 grid grid-cols-1 sm:grid-cols-3 bg-gradient-to-br from-romara-green/5 to-romara-cream shadow-lg shadow-romara-green/5 p-8 sm:p-10 border border-romara-green/10 rounded-2xl">
    <div class="flex items-start gap-4">
      <div class="flex justify-center items-center bg-gradient-to-br from-romara-green to-romara-green-dark shadow-lg shadow-romara-green/20 rounded-xl w-12 h-12 text-white shrink-0">
        <IconLock class="w-6 h-6" />
      </div>
      <div>
        <p class="font-bold text-romara-green text-sm">Secure Payments</p>
        <p class="mt-1 text-romara-ink/60 text-xs leading-relaxed">Your payments are 100% secure with trusted partners.</p>
      </div>
    </div>

    <div class="flex flex-col">
      <p class="mb-3 font-bold text-romara-green text-sm">We Accept</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="method in paymentMethods"
          :key="method"
          class="bg-white shadow-sm hover:shadow-md px-4 py-2 border-2 border-romara-green/20 hover:border-romara-green rounded-lg font-semibold text-romara-green text-xs transition-all"
        >
          {{ method }}
        </span>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="flex justify-center items-center bg-gradient-to-br from-romara-amber to-romara-amber-light shadow-lg shadow-romara-amber/20 rounded-xl w-12 h-12 text-white shrink-0">
        <IconShield class="w-6 h-6" />
      </div>
      <div>
        <p class="font-bold text-romara-green text-sm">Best Price Guarantee</p>
        <p class="mt-1 text-romara-ink/60 text-xs leading-relaxed">Get the best value for your safari and holiday.</p>
      </div>
    </div>
  </div>
</template>