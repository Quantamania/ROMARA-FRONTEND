<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
const route = useRoute()
const { canAny } = useAdminAuth()

interface NavItem {
  to: string
  label: string
  icon: string
  /** Only the dashboard matches on an exact path; the rest match by prefix. */
  exact?: boolean
  /** Roles that see this item. Omitted means every admin does. */
  roles?: string[]
}

// Grouped so the panel reads as a workflow rather than a flat list: what came
// in today, what the public site shows, and the money.
const groups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: '⌂', exact: true }],
  },
  {
    label: 'Enquiries & bookings',
    items: [
      { to: '/admin/enquiries', label: 'Enquiries', icon: '✉', roles: ['owner','manager','finance'] },
      { to: '/admin/bookings', label: 'Bookings', icon: '☰', roles: ['owner','manager','finance'] },
      { to: '/admin/booking-requests', label: 'Booking Requests', icon: '📋', roles: ['owner','manager','finance'] },
      { to: '/admin/transfers', label: 'Airport Transfers', icon: '✈', roles: ['owner','manager','finance'] },
      { to: '/admin/vehicle-hire', label: 'Vehicle Hire', icon: '⛟', roles: ['owner','manager','finance'] },
    ],
  },
  {
    label: 'Website content',
    items: [
      { to: '/admin/tours', label: 'Tour Packages', icon: '✦' },
      { to: '/admin/blog', label: 'Blog', icon: '✎' },
      { to: '/admin/testimonials', label: 'Testimonials', icon: '❝' },
      { to: '/admin/promotions', label: 'Promotions', icon: '◈' },
    ],
  },
  {
    label: 'Money',
    items: [{ to: '/admin/payments', label: 'Payments', icon: '⛁', roles: ['owner','manager','finance'] }],
  },
  {
    label: 'Settings',
    items: [{ to: '/admin/team', label: 'Admin Team', icon: '☗', roles: ['owner'] }],
  },
]

// Items a role cannot use are hidden, and a group with nothing left disappears
// with them. The database still refuses the action either way.
const visibleGroups = computed(() =>
  groups
    .map((g) => ({ ...g, items: g.items.filter((i) => !i.roles || canAny(...i.roles)) }))
    .filter((g) => g.items.length > 0),
)

function isActive(path: string, exact?: boolean) {
  return exact ? route.path === path : route.path.startsWith(path)
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-romara-green-dark/50 backdrop-blur-[2px] lg:hidden"
    @click="$emit('close')"
  />
  <aside
    class="fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 flex flex-col
           bg-green-fade text-romara-cream border-r border-black/20
           transition-transform duration-200 ease-out-expo lg:translate-x-0"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Wordmark. The amber hairline is the panel's tell: same brand, admin mode. -->
    <div class="px-5 pt-6 pb-5">
      <p class="font-heading text-2xl leading-none text-romara-cream">ROMARA</p>
      <p class="text-[0.62rem] uppercase tracking-widest2 text-romara-cream/50 mt-2.5">
        Content Manager
      </p>
    </div>

    <nav class="flex-1 px-3 pb-4 space-y-5 overflow-y-auto">
      <div v-for="group in visibleGroups" :key="group.label">
        <p class="px-4 mb-1.5 text-[0.6rem] uppercase tracking-widest2 text-romara-cream/35 font-semibold">
          {{ group.label }}
        </p>
        <div class="space-y-0.5">
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="admin-nav-link"
            :class="isActive(item.to, item.exact) && 'admin-nav-link-active'"
            @click="$emit('close')"
          >
            <span class="text-base w-5 text-center opacity-80" aria-hidden="true">{{ item.icon }}</span>
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="px-5 py-4 border-t border-white/10">
      <a href="/" class="text-xs text-romara-cream/60 hover:text-romara-amber transition-colors">
        ← Back to live site
      </a>
    </div>
  </aside>
</template>
