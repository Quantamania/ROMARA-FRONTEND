<script setup lang="ts">
import { ref } from 'vue'
import IconLion from '@/components/icons/IconLion.vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Romara', href: '/about' },
  {
    label: 'Safari Packages',
    href: '/safari-packages',
    children: [
      { label: 'Wildlife Safaris', href: '/safari-packages?type=wildlife' },
      { label: 'Multi-Day Tours', href: '/safari-packages?type=multi-day' },
      { label: 'Mountain Hiking', href: '/safari-packages?type=hiking' },
      { label: 'Beach Holidays', href: '/safari-packages?type=beach' },
    ],
  },
  { label: 'Day Trips', href: '/day-trips' },
  { label: 'Airport Transfers', href: '/airport-transfers' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const isMobileMenuOpen = ref(false)
const openDropdownLabel = ref<string | null>(null)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function toggleDropdown(label: string) {
  openDropdownLabel.value = openDropdownLabel.value === label ? null : label
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-black/5 bg-white">
    <nav class="romara-container flex h-20 items-center justify-between">
      <a href="/" class="flex items-center gap-2.5">
        <IconLion class="h-10 w-10 text-romara-amber" />
        <span class="leading-tight">
          <span class="block font-heading text-lg font-bold text-romara-green">ROMARA</span>
          <span class="block text-[10px] font-semibold tracking-widest text-romara-ink/70">TOURS &amp; TRAVEL</span>
        </span>
      </a>

      <ul class="hidden items-center gap-6 xl:flex">
        <li v-for="link in navLinks" :key="link.label" class="relative">
          <button
            v-if="link.children"
            type="button"
            class="flex items-center gap-1 text-sm font-medium text-romara-ink hover:text-romara-green"
            @click="toggleDropdown(link.label)"
          >
            {{ link.label }}
            <IconChevronDown class="h-3.5 w-3.5" />
          </button>
          <a v-else :href="link.href" class="text-sm font-medium text-romara-ink hover:text-romara-green">
            {{ link.label }}
          </a>

          <ul
            v-if="link.children && openDropdownLabel === link.label"
            class="absolute left-0 top-full mt-3 w-56 rounded-md border border-black/5 bg-white py-2 shadow-card"
          >
            <li v-for="child in link.children" :key="child.label">
              <a :href="child.href" class="block px-4 py-2 text-sm text-romara-ink hover:bg-romara-cream hover:text-romara-green">
                {{ child.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div class="hidden xl:block">
        <BaseButton as="a" href="/book-now" variant="primary">Book Now</BaseButton>
      </div>

      <button type="button" class="text-romara-green xl:hidden" aria-label="Open menu" @click="toggleMobileMenu">
        <IconMenu class="h-7 w-7" />
      </button>
    </nav>

    <div v-if="isMobileMenuOpen" class="border-t border-black/5 bg-white xl:hidden">
      <ul class="romara-container flex flex-col gap-1 py-4">
        <li v-for="link in navLinks" :key="link.label">
          <a :href="link.href" class="block rounded-md px-2 py-2.5 text-sm font-medium text-romara-ink hover:bg-romara-cream">
            {{ link.label }}
          </a>
        </li>
        <li class="pt-2">
          <BaseButton as="a" href="/book-now" variant="primary" class="w-full">Book Now</BaseButton>
        </li>
      </ul>
    </div>
  </header>
</template>