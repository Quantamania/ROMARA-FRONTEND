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
  <div v-if="isSubscribed" class="flex items-center gap-2 text-sm font-semibold text-romara-green">
    You're subscribed! Watch your inbox for travel inspiration.
  </div>

  <form v-else class="flex flex-col gap-3 sm:flex-row" @submit.prevent="handleSubmit">
    <input
      v-model="email"
      type="email"
      required
      placeholder="Your email address"
      class="w-full rounded-md border border-black/10 bg-white px-4 py-3 text-sm text-romara-ink placeholder:text-romara-ink/40 focus:border-romara-green focus:outline-none sm:w-72"
    />
    <button
      type="submit"
      :disabled="isSubmitting"
      class="shrink-0 rounded-md bg-romara-amber px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-romara-amber/90 disabled:opacity-60"
    >
      {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
    </button>
  </form>
</template>