<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import logoSrc from '@/assets/images/logos/logo-transparent.png'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
  image?: string
}

const phone = '+254 700 123 456'
const email = 'info@romaratours.com'

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: IconFacebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: IconInstagram },
  { name: 'TripAdvisor', href: 'https://tripadvisor.com', icon: IconTripadvisor },
  { name: 'WhatsApp', href: 'https://wa.me/254700123456', icon: IconWhatsapp },
]

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Romara', href: '/about' },
  {
    label: 'Experiences',
    href: '/safari-packages',
    image: '/src/assets/images/booking/maasai-mara-safari.jpg',
    children: [
      { label: 'Safari Packages', href: '/safari-packages' },
      { label: 'Day Trips', href: '/day-trips' },
      { label: 'Airport Transfers', href: '/airport-transfers' },
    ]
  },
  { label: 'Destinations', href: '/destinations' },
  {
    label: 'Explore',
    href: '/gallery',
    image: '/src/assets/images/gallery/cheetah.jpeg',
    children: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Reviews', href: '/reviews' },
    ]
  },
  {
    label: 'Resources',
    href: '/faq',
    image: '/src/assets/images/blog/hero.png',
    children: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Travel Blog', href: '/blog' },
    ]
  },
  { label: 'Contact Us', href: '/contact' },
]

const route = useRoute()
const isMobileMenuOpen = ref(false)
const openDropdownLabel = ref<string | null>(null)
const isNavHidden = ref(false)
let lastScrollY = 0

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isNavHidden.value = false
  }
}

function getScrollY() {
  const scrollingElement = document.scrollingElement || document.documentElement
  return scrollingElement ? scrollingElement.scrollTop : window.pageYOffset || window.scrollY || 0
}

function handleScroll() {
  const currentScrollY = getScrollY()
  const delta = currentScrollY - lastScrollY

  if (currentScrollY <= 60 || isMobileMenuOpen.value) {
    isNavHidden.value = false
  } else if (delta > 0) {
    isNavHidden.value = true
  } else if (delta < 0) {
    isNavHidden.value = false
  }

  lastScrollY = currentScrollY
}

function handleTouchStart() {
  lastScrollY = getScrollY()
}

onMounted(() => {
  lastScrollY = getScrollY()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchmove', handleScroll, { passive: true })
  document.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleScroll)
  document.removeEventListener('scroll', handleScroll)
})

function toggleDropdown(label: string) {
  openDropdownLabel.value = openDropdownLabel.value === label ? null : label
}

function isActiveLink(href: string) {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

function hasActiveChild(children?: { label: string; href: string }[]) {
  if (!children) return false
  return children.some(child => isActiveLink(child.href))
}
</script>

<template>
  <header class="left-0 right-0 z-40 fixed bg-white border-black/5 border-b transition-[top,opacity] duration-500 ease-in-out will-change-transform" :style="{ top: isNavHidden ? '-160px' : '0px', opacity: isNavHidden ? 0 : 1, pointerEvents: isNavHidden ? 'none' : 'auto' }">
    <!-- Contact Bar -->
    <div class="bg-romara-green text-white">
      <div class="romara-container flex h-10 items-center justify-between text-xs">
        <div class="flex items-center gap-5">
          <a :href="`tel:${phone.replace(/\s/g, '')}`" class="flex items-center gap-1.5 hover:text-romara-amber">
            <IconPhone class="h-3.5 w-3.5" />
            {{ phone }}
          </a>
          <a :href="`mailto:${email}`" class="hidden items-center gap-1.5 hover:text-romara-amber sm:flex">
            <IconMail class="h-3.5 w-3.5" />
            {{ email }}
          </a>
        </div>

        <div class="flex items-center gap-3">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener"
            :aria-label="social.name"
            class="text-white/90 hover:text-romara-amber"
          >
            <component :is="social.icon" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Bar -->
    <nav class="flex justify-between items-center gap-6 h-20 romara-container">
      <a href="/" class="flex items-center gap-2.5 shrink-0">
  <img :src="logoSrc" alt="ROMARA logo" class="w-auto h-16" />
  <span class="leading-tight">
 <span class="block font-heading font-bold text-romara-green text-lg romara-stretch" style="transform: scaleX(1.25)">ROMARA</span>
 <span class="block font-semibold text-[10px] text-romara-ink/70 romara-stretch" style="transform: scaleX(1.25)">TOURS &amp; TRAVEL</span> 
  <span class="block font-semibold text-[9px] text-romara-ink/60">Reaching Out to Your Next Adventure</span>
</span>
</a>

      <ul class="hidden xl:flex items-center gap-x-5">
        <li v-for="link in navLinks" :key="link.label" class="group relative whitespace-nowrap">
          <button
            v-if="link.children"
            type="button"
            class="group relative flex items-center gap-1 py-2 font-semibold hover:text-romara-green text-xs uppercase tracking-wide"
            :class="isActiveLink(link.href) || hasActiveChild(link.children) ? 'text-romara-green' : 'text-romara-ink'"
            @mouseenter="openDropdownLabel = link.label"
            @mouseleave="openDropdownLabel = null"
          >
            {{ link.label }}
            <IconChevronDown class="w-3.5 h-3.5" />
            <span class="bottom-0 left-0 absolute bg-romara-amber rounded w-0 group-hover:w-full h-0.5 transition-all duration-300" :class="(isActiveLink(link.href) || hasActiveChild(link.children)) ? 'w-full' : ''"></span>
          </button>

          <a
            v-else
            :href="link.href"
            class="group block relative py-2 font-semibold hover:text-romara-green text-xs uppercase tracking-wide"
            :class="isActiveLink(link.href) ? 'text-romara-green' : 'text-romara-ink'"
          >
            {{ link.label }}
            <span class="bottom-0 left-0 absolute bg-romara-amber rounded w-0 group-hover:w-full h-0.5 transition-all duration-300" :class="isActiveLink(link.href) ? 'w-full' : ''"></span>
          </a>

          <div
            v-if="link.children"
            class="invisible group-hover:visible top-full left-1/2 -translate-x-1/2 absolute bg-white opacity-0 group-hover:opacity-100 shadow-2xl mt-3 border border-romara-green/10 rounded-2xl w-[48rem] overflow-hidden transition-all duration-300"
            @mouseenter="openDropdownLabel = link.label"
            @mouseleave="openDropdownLabel = null"
          >
            <div class="flex">
              <!-- Navigation Options on Left -->
              <div class="bg-gradient-to-br from-white to-romara-cream/30 p-6 w-1/2">
                <div class="flex items-center gap-2 mb-4">
                  <div class="bg-romara-amber rounded w-8 h-1"></div>
                  <p class="font-bold text-romara-green-dark text-xs uppercase tracking-widest">Explore</p>
                </div>
                <ul class="space-y-1">
                  <li v-for="child in link.children" :key="child.label">
                    <a
                      :href="child.href"
                      class="group block hover:bg-romara-green/5 px-3 py-3 rounded-lg font-medium text-sm uppercase tracking-wide transition-all"
                      :class="isActiveLink(child.href) ? 'text-romara-green bg-romara-green/5' : 'text-romara-ink hover:text-romara-green'"
                    >
                      <span v-if="isActiveLink(child.href)" class="inline-block w-2 h-2 bg-romara-amber rounded-full mr-2"></span>
                      {{ child.label }}
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Image on Right -->
              <div class="relative w-1/2">
                <div class="top-0 left-0 absolute bg-gradient-to-r from-romara-green to-romara-amber w-full h-1"></div>
                <img v-if="link.image" :src="link.image" :alt="link.label" class="w-full h-56 object-cover" />
                <div v-else class="flex justify-center items-center bg-gradient-to-br from-romara-green/5 to-romara-cream w-full h-56">
                  <span class="font-heading font-bold text-romara-green/50 text-lg">{{ link.label }}</span>
                </div>
                <div class="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/50 to-transparent p-4">
                  <p class="font-heading font-bold text-white text-sm">{{ link.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="hidden xl:block shrink-0">
        <BaseButton as="a" href="/book-now" variant="primary">Book Now</BaseButton>
      </div>

      <button type="button" class="xl:hidden text-romara-green shrink-0" aria-label="Open menu" @click="toggleMobileMenu">
        <IconMenu class="w-7 h-7" />
      </button>
    </nav>

    <div v-if="isMobileMenuOpen" class="xl:hidden z-50 fixed inset-0">
      <div class="absolute inset-0 bg-black/50" @click="toggleMobileMenu"></div>
      <div class="top-0 right-0 absolute bg-romara-green-dark shadow-2xl w-80 h-full">
        <div class="flex justify-between items-center p-6 border-white/10 border-b">
          <span class="font-heading font-bold text-white text-xl">Menu</span>
          <button type="button" class="text-white hover:text-white/80" @click="toggleMobileMenu">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul class="flex flex-col gap-1 p-6">
          <li v-for="link in navLinks" :key="link.label">
            <div v-if="link.children">
              <button
                type="button"
                class="flex items-center gap-2 hover:bg-white/10 px-4 py-3 rounded-md w-full font-semibold text-white text-sm uppercase tracking-wide transition-all"
                :class="hasActiveChild(link.children) ? 'text-romara-amber bg-white/10' : ''"
                @click="toggleDropdown(link.label)"
              >
                {{ link.label }}
                <svg class="w-4 h-4 transition-transform shrink-0" :class="openDropdownLabel === link.label ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul v-if="openDropdownLabel === link.label" class="flex flex-col gap-1 mt-1 ml-4">
                <li v-for="child in link.children" :key="child.label">
                  <a
                    :href="child.href"
                    class="block hover:bg-white/10 px-4 py-2 rounded-md font-medium text-sm uppercase tracking-wide transition-all"
                    :class="isActiveLink(child.href) ? 'text-romara-amber bg-white/10' : 'text-white/90 hover:text-white'"
                    @click="toggleMobileMenu"
                  >
                    <span v-if="isActiveLink(child.href)" class="inline-block w-2 h-2 bg-romara-amber rounded-full mr-2"></span>
                    {{ child.label }}
                  </a>
                </li>
              </ul>
            </div>
            <a v-else :href="link.href" class="block hover:bg-white/10 px-4 py-3 rounded-md font-semibold text-white text-sm uppercase tracking-wide" @click="toggleMobileMenu">
              {{ link.label }}
            </a>
          </li>
          <li class="pt-4">
            <BaseButton as="a" href="/book-now" variant="primary" class="w-full">Book Now</BaseButton>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>