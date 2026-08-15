<script setup lang="ts">
import { ref } from 'vue'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'
import AdminSidebar from '@/admin/components/AdminSidebar.vue'
import IconMenu from '@/components/icons/IconMenu.vue'

const sidebarOpen = ref(false)
const { adminName, signOut } = useAdminAuth()

async function handleSignOut() {
  await signOut()
  window.location.href = '/admin/login'
}
</script>

<template>
  <div class="admin-shell min-h-screen lg:flex">
    <AdminSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 min-w-0">
      <header
        class="sticky top-0 z-20 bg-romara-sand/85 backdrop-blur-sm
               border-b border-romara-ink/10 px-4 sm:px-8 py-3
               flex items-center justify-between"
      >

        <button
          class="lg:hidden -ml-1 w-10 h-10 flex items-center justify-center rounded-card
                 text-romara-ink hover:bg-romara-ink/5 transition-colors
                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-romara-amber"
          aria-label="Open menu"
          @click="sidebarOpen = true"
        >
          <IconMenu class="h-5 w-5" />
        </button>
        <div class="hidden lg:block" />

        <div class="flex items-center gap-4">
          <span v-if="adminName" class="hidden sm:inline text-sm text-romara-ink-soft">
            {{ adminName }}
          </span>
          <button
            class="text-sm font-medium text-romara-ink-soft hover:text-romara-amber transition-colors
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-romara-amber rounded"
            @click="handleSignOut"
          >
            Sign out
          </button>
        </div>
      </header>

      <main class="px-4 sm:px-8 py-7 max-w-6xl mx-auto">
        <RouterView v-slot="{ Component }">
          <!-- Short cross-fade so switching sections feels continuous rather
               than a hard swap. Fast enough not to read as a delay. -->
          <Transition name="admin-page" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-page-enter-active,
.admin-page-leave-active {
  transition: opacity 0.14s ease, transform 0.14s cubic-bezier(0.16, 1, 0.3, 1);
}
.admin-page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.admin-page-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .admin-page-enter-active,
  .admin-page-leave-active {
    transition: none;
  }
}
</style>
