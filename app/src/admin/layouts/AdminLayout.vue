<script setup lang="ts">
import { ref } from 'vue'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'
import AdminSidebar from '@/admin/components/AdminSidebar.vue'

const sidebarOpen = ref(false)
const { adminName, signOut } = useAdminAuth()

async function handleSignOut() {
  await signOut()
  window.location.href = '/admin/login'
}
</script>

<template>
  <div class="min-h-screen bg-romara-cream font-sans lg:flex">
    <AdminSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 min-w-0">
      <!-- Topbar: mobile menu trigger + who's logged in -->
      <header class="sticky top-0 z-20 bg-romara-cream border-b border-romara-ink/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        <button
          class="lg:hidden text-romara-ink w-10 h-10 flex items-center justify-center rounded-lg hover:bg-romara-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-romara-amber"
          aria-label="Open menu"
          @click="sidebarOpen = true"
        >
          ☰
        </button>
        <div class="hidden lg:block" />
        <div class="flex items-center gap-4 text-sm">
          <span class="text-romara-ink/60">{{ adminName }}</span>
          <button
            class="text-romara-amber hover:text-romara-amber font-medium"
            @click="handleSignOut"
          >
            Sign out
          </button>
        </div>
      </header>

      <main class="px-4 sm:px-8 py-6 max-w-5xl mx-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
