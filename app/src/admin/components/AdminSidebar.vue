<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const route = useRoute()

const nav = [
  { to: '/admin', label: 'Dashboard', icon: '⌂', exact: true },
  { to: '/admin/tours', label: 'Tour Packages', icon: '✦' },
  { to: '/admin/bookings', label: 'Bookings', icon: '☰' },
  { to: '/admin/enquiries', label: 'Enquiries', icon: '✉' },
  { to: '/admin/blog', label: 'Blog', icon: '✎' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
  { to: '/admin/promotions', label: 'Promotions', icon: '◈' },
]

function isActive(path: string, exact?: boolean) {
  return exact ? route.path === path : route.path.startsWith(path)
}
</script>

<template>
  <!-- Mobile overlay -->
  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-ink/40 lg:hidden"
    @click="$emit('close')"
  />

  <aside
    class="fixed lg:sticky top-0 z-40 h-screen w-64 bg-ink text-sand-100 flex flex-col
           transition-transform duration-200 lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="px-6 py-6 border-b border-sand-100/10">
      <p class="font-display text-2xl text-sand-50">ROMARA</p>
      <p class="text-xs text-sand-300 tracking-wide uppercase mt-0.5">Content Manager</p>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ochre"
        :class="isActive(item.to, item.exact)
          ? 'bg-terracotta text-white'
          : 'text-sand-200 hover:bg-white/5 hover:text-white'"
        @click="$emit('close')"
      >
        <span class="text-base w-5 text-center" aria-hidden="true">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="px-6 py-4 border-t border-sand-100/10 text-xs text-sand-300">
      <a href="/" class="hover:text-white">← Back to live site</a>
    </div>
  </aside>
</template>
