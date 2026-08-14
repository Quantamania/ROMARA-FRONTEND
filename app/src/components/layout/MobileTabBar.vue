<script setup lang="ts">
/**
 * App-style bottom tab bar. Mobile and tablet only — hidden from `lg` up, so
 * the desktop header navigation is untouched.
 *
 * Bottom placement is the point: on a phone the top of the screen is the
 * hardest place to reach and the bottom is the easiest, so the five things
 * people actually come here for live under the thumb instead of behind a
 * hamburger menu.
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconCalendarCheck from '@/components/icons/IconCalendarCheck.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'

const route = useRoute()

interface Tab {
  label: string
  href: string
  icon: typeof IconCompass
  /** Routes that should also light this tab up. */
  matches?: string[]
  /** The money action, given the accent treatment. */
  primary?: boolean
}

const tabs: Tab[] = [
  { label: 'Home', href: '/', icon: IconCompass },
  {
    label: 'Safaris',
    href: '/safari-packages',
    icon: IconBinoculars,
    matches: ['/safari-packages', '/day-trips', '/destinations'],
  },
  { label: 'Book', href: '/booking', icon: IconCalendarCheck, primary: true },
  {
    label: 'Vehicles',
    href: '/vehicle-hire',
    icon: IconCar,
    matches: ['/vehicle-hire', '/airport-transfers'],
  },
  { label: 'Contact', href: '/contact', icon: IconHeadset },
]

const activeHref = computed(() => {
  const path = route.path
  // Longest prefix wins, so /safari-packages/:slug lights Safaris rather than Home.
  let best: Tab | null = null
  for (const tab of tabs) {
    const candidates = tab.matches ?? [tab.href]
    for (const c of candidates) {
      const hit = c === '/' ? path === '/' : path.startsWith(c)
      if (hit && (!best || c.length > (best.matches?.[0] ?? best.href).length)) best = tab
    }
  }
  return best?.href ?? ''
})
</script>

<template>
  <nav
    class="mobile-tab-bar lg:hidden"
    aria-label="Primary"
  >
    <ul class="flex items-stretch justify-around">
      <li v-for="tab in tabs" :key="tab.href" class="flex-1">
        <a
          :href="tab.href"
          class="group flex h-full flex-col items-center justify-center gap-1 px-1 pb-1 pt-2 transition-colors duration-200"
          :class="activeHref === tab.href ? 'text-romara-amber' : 'text-white/60 active:text-white'"
          :aria-current="activeHref === tab.href ? 'page' : undefined"
        >
          <span
            class="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
            :class="[
              tab.primary
                ? 'bg-amber-fade text-white shadow-glow-amber -mt-5 h-12 w-12 ring-4 ring-romara-green'
                : activeHref === tab.href
                  ? 'bg-white/10'
                  : '',
            ]"
          >
            <component :is="tab.icon" :class="tab.primary ? 'h-5 w-5' : 'h-[1.15rem] w-[1.15rem]'" />
          </span>
          <span
            class="text-[0.63rem] font-semibold uppercase tracking-wider"
            :class="tab.primary ? 'text-romara-amber-300' : ''"
          >
            {{ tab.label }}
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.mobile-tab-bar {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 45;
  background: theme('colors.romara.green');
  border-top: 1px solid rgb(255 255 255 / 0.08);
  /* Sits above the iPhone home indicator instead of under it. */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-shadow: 0 -8px 24px -12px rgb(0 0 0 / 0.45);
}
.mobile-tab-bar ul {
  min-height: 3.75rem;
}
</style>
