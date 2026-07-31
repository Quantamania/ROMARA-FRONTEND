<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const route = useRoute()
const { signIn, isAdmin } = useAdminAuth()

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
    if (!isAdmin.value) {
      error.value = 'This account does not have admin access.'
      return
    }
    router.push((route.query.redirect as string) || '/admin')
  } catch (e: any) {
    error.value = 'Incorrect email or password.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-romara-cream flex items-center justify-center px-4 font-sans">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <p class="font-heading text-3xl text-romara-ink">ROMARA</p>
        <p class="text-sm text-romara-ink/60 mt-1">Content Manager</p>
      </div>

      <form
        class="bg-white border border-romara-ink/10 rounded-xl p-6 sm:p-8 space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="email" class="block text-sm font-medium text-romara-ink mb-1.5">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="username"
            class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 text-romara-ink focus:outline-none focus:ring-2 focus:ring-romara-amber focus:border-romara-amber"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-romara-ink mb-1.5">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 text-romara-ink focus:outline-none focus:ring-2 focus:ring-romara-amber focus:border-romara-amber"
          />
        </div>

        <p v-if="error" class="text-sm text-romara-amber" role="alert">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-romara-amber hover:bg-romara-amber text-white font-medium rounded-lg py-2.5 transition-colors disabled:opacity-60"
        >
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="text-center text-xs text-romara-ink/60 mt-6">
        Trouble signing in? Contact your website administrator.
      </p>
    </div>
  </div>
</template>
