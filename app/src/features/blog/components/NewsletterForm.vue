<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSubmitting = ref(false)
const isSubscribed = ref(false)

function handleSubmit() {
  if (!email.value) return
  isSubmitting.value = true

  // No newsletter endpoint exists yet — this stub just simulates the round
  // trip so the success state can be built and tested now. Swap this for a
  // real POST call once the backend endpoint exists.
  window.setTimeout(function markSubscribed() {
    isSubmitting.value = false
    isSubscribed.value = true
    email.value = ''
  }, 500)
}
</script>

<template>
  <div
    v-if="isSubscribed"
    class="inline-flex items-center gap-3 rounded-full border border-romara-green/15 bg-white px-5 py-3 text-sm font-semibold text-romara-green shadow-soft"
  >
    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white">
      <svg viewBox="0 0 20 20" fill="none" class="h-3.5 w-3.5" aria-hidden="true">
        <path d="M4 10.5 8 14.5 16 5.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
    You're subscribed! Watch your inbox for travel inspiration.
  </div>

  <form
    v-else
    class="group flex w-full flex-col gap-3 sm:max-w-md sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:border-romara-green/15 sm:bg-white sm:p-1.5 sm:pl-5 sm:shadow-soft sm:transition-shadow sm:duration-300 sm:focus-within:shadow-card"
    @submit.prevent="handleSubmit"
  >
    <label for="newsletter-email" class="sr-only">Your email address</label>
    <input
      id="newsletter-email"
      v-model="email"
      type="email"
      required
      placeholder="Your email address"
      class="w-full rounded-full border border-romara-green/15 bg-white px-5 py-3 text-sm text-romara-ink placeholder:text-romara-ink/40 focus:border-romara-green focus:outline-none focus:ring-2 focus:ring-romara-amber/30 sm:flex-1 sm:border-none sm:bg-transparent sm:px-0 sm:py-2.5 sm:focus:ring-0"
    />
    <button
      type="submit"
      :disabled="isSubmitting"
      class="group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-fade px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition-all duration-300 ease-out-expo hover:shadow-glow-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:py-2.5"
    >
      <span
        v-if="isSubmitting"
        class="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
      {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
    </button>
  </form>
</template>