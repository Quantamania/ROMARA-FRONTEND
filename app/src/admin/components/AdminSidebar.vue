<script setup lang="ts">
import { computed, type Component } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'
import IconGrid from '@/components/icons/IconGrid.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconWallet from '@/components/icons/IconWallet.vue'
import IconUsers from '@/components/icons/IconUsers.vue'

defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()
const route = useRoute()
const { canAny } = useAdminAuth()

interface NavItem {
  to: string
  label: string
  icon: Component
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
    items: [{ to: '/admin', label: 'Dashboard', icon: IconGrid, exact: true }],
  },
  {
    label: 'Enquiries & bookings',
    items: [
      { to: '/admin/enquiries', label: 'Enquiries', icon: IconMail, roles: ['owner','manager','finance'] },
      { to: '/admin/bookings', label: 'Bookings', icon: IconSuitcase, roles: ['owner','manager','finance'] },
      { to: '/admin/booking-requests', label: 'Booking Requests', icon: IconCheckSquare, roles: ['owner','manager','finance'] },
      { to: '/admin/transfers', label: 'Airport Transfers', icon: IconPlaneLanding, roles: ['owner','manager','finance'] },
      { to: '/admin/vehicle-hire', label: 'Vehicle Hire', icon: IconCar, roles: ['owner','manager','finance'] },
    ],
  },
  {
    label: 'Website content',
    items: [
      { to: '/admin/tours', label: 'Tour Packages', icon: IconCompass },
      { to: '/admin/blog', label: 'Blog', icon: IconCamera },
      { to: '/admin/testimonials', label: 'Testimonials', icon: IconStar },
      { to: '/admin/promotions', label: 'Promotions', icon: IconTag },
    ],
  },
  {
    label: 'Money',
    items: [{ to: '/admin/payments', label: 'Payments', icon: IconWallet, roles: ['owner','manager','finance'] }],
  },
  {
    label: 'Settings',
    items: [{ to: '/admin/team', label: 'Admin Team', icon: IconUsers, roles: ['owner'] }],
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
    <div class="px-5 pb-4 pt-5">
      <p class="font-logo text-2xl font-bold leading-none text-romara-cream">ROMARA</p>
      <p class="mt-2 text-[0.6rem] uppercase tracking-widest2 text-romara-cream/50">
        Content Manager
      </p>
    </div>

    <nav class="flex-1 space-y-3 overflow-y-auto px-3 pb-3 [scrollbar-width:thin]">
      <div v-for="group in visibleGroups" :key="group.label">
        <p class="mb-1 px-3 text-[0.58rem] font-semibold uppercase tracking-widest2 text-romara-cream/35">
          {{ group.label }}
        </p>
        <div class="space-y-0.5">
          <RouterLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="admin-nav-link group"
            :class="isActive(item.to, item.exact) && 'admin-nav-link-active'"
            @click="$emit('close')"
          >
            <!-- Active rail: an amber bar slides in on the left edge -->
            <span
              class="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-romara-amber transition-all duration-300 ease-out-expo"
              :class="isActive(item.to, item.exact) ? 'opacity-100' : 'opacity-0'"
              aria-hidden="true"
            />
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
              :class="isActive(item.to, item.exact) ? 'bg-romara-amber/20 text-romara-amber-300' : 'bg-white/[0.06] text-romara-cream/70 group-hover:text-white'"
            >
              <component :is="item.icon" class="h-[17px] w-[17px]" />
            </span>
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="border-t border-white/10 px-5 py-3">
      <a href="/" class="inline-flex items-center gap-1.5 text-xs text-romara-cream/60 transition-colors hover:text-romara-amber">
        <span aria-hidden="true">←</span> Back to live site
      </a>
    </div>
  </aside>
</template>
