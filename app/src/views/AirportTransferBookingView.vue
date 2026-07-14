<script setup lang="ts">
import TransferBookingForm from '@/features/airport-transfers/components/TransferBookingForm.vue'
</script>

<template>
  <section class="romara-container py-16">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="font-heading text-3xl font-bold text-romara-green sm:text-4xl">
        Travel with Comfort, Safety and Confidence
      </h1>
      <p class="mt-4 text-sm leading-relaxed text-romara-ink/70">
        Whether you're arriving in Kenya or departing for your next destination, ROMARA Tours &amp; Travel
        provides reliable, punctual, and professional airport transfer services designed to make every journey
        stress-free.
      </p>
      <p class="mt-2 text-sm text-romara-ink/70">
        Complete the booking form below and our team will confirm your reservation promptly.
      </p>
    </div>

    <div class="mt-12">
      <TransferBookingForm />
    </div>
  </section>
</template>