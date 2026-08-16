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
  <!-- Deep green field, the same one the site's footer and nav sit on, so the
       panel announces itself as ROMARA before you have even signed in. -->
  <div class="admin-shell min-h-screen bg-green-fade flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <img
          src="/images/logos/logo-transparent.webp"
          alt="ROMARA Tours &amp; Travel"
          class="mx-auto mb-4 h-20 w-auto drop-shadow-lg"
        />
        <p class="font-logo text-5xl font-bold leading-none tracking-[0.04em] text-romara-cream">ROMARA</p>
        <p class="admin-eyebrow !text-romara-cream/55 mt-3">Content Manager</p>
      </div>

      <form
        class="admin-card p-6 sm:p-8 space-y-4 shadow-elevated"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="email" class="admin-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="username"
            class="admin-input"
          />
        </div>

        <div>
          <label for="password" class="admin-label">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="admin-input"
          />
        </div>

        <p v-if="error" class="admin-notice" role="alert">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="admin-btn w-full"
        >
          {{ loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="text-center text-xs text-romara-cream/45 mt-6">
        Trouble signing in? Contact your website administrator.
      </p>
    </div>
  </div>
</template>
