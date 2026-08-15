<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
const logoSrc = '/images/logos/logo-transparent.webp'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconBinoculars from '@/components/icons/IconBinoculars.vue'
import IconMapPinRoute from '@/components/icons/IconMapPinRoute.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
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
  icon: typeof IconCompass
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
  { label: 'Home', href: '/', icon: IconCompass },
  { label: 'About Romara', href: '/about', icon: IconHandshake },
  {
    label: 'Experiences',
    href: '/safari-packages',
    icon: IconBinoculars,
    image: '/images/booking/maasai-mara-safari.webp',
    children: [
      { label: 'Safari Packages', href: '/safari-packages' },
      { label: 'Day Trips', href: '/day-trips' },
      { label: 'Airport Transfers', href: '/airport-transfers' },
    ]
  },
  { label: 'Destinations', href: '/destinations', icon: IconMapPinRoute },
  {
    label: 'Explore',
    href: '/gallery',
    icon: IconCamera,
    image: '/images/gallery/cheetah.webp',
    children: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Reviews', href: '/reviews' },
    ]
  },
  {
    label: 'Resources',
    href: '/faq',
    icon: IconTag,
    image: '/images/blog/hero.webp',
    children: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Travel Blog', href: '/blog' },
    ]
  },
  { label: 'Contact Us', href: '/contact', icon: IconHeadset },
]

const route = useRoute()
const isMobileMenuOpen = ref(false)

/**
 * The bottom tab bar already owns Home, Safaris, Book, Vehicles and Contact.
 * Repeating them here would make the menu a worse copy of a control the thumb
 * can already reach, so this sheet carries only what the tab bar cannot.
 */
const secondaryLinks = [
  { label: 'Day Trips', href: '/day-trips' },
  { label: 'Airport Transfers', href: '/airport-transfers' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About ROMARA', href: '/about' },
  { label: 'Guest Reviews', href: '/reviews' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'FAQs', href: '/faq' },
]

const isNavHidden = ref(false)
const openDropdownLabel = ref<string | null>(null)
const isScrolled = ref(false)
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

let scrollScheduled = false

// Runs at most once per animation frame, and only writes a ref when its value
// actually changes — so scrolling doesn't thrash layout or re-render the nav.
function updateNavOnScroll() {
  scrollScheduled = false
  const currentScrollY = getScrollY()
  const delta = currentScrollY - lastScrollY

  const nextScrolled = currentScrollY > 8
  if (nextScrolled !== isScrolled.value) isScrolled.value = nextScrolled

  let nextHidden = isNavHidden.value
  if (currentScrollY <= 60 || isMobileMenuOpen.value) {
    nextHidden = false
  } else if (delta > 2) {
    nextHidden = true
  } else if (delta < -2) {
    nextHidden = false
  }
  if (nextHidden !== isNavHidden.value) isNavHidden.value = nextHidden

  lastScrollY = currentScrollY
}

function handleScroll() {
  if (scrollScheduled) return
  scrollScheduled = true
  requestAnimationFrame(updateNavOnScroll)
}

function handleTouchStart() {
  lastScrollY = getScrollY()
}

onMounted(() => {
  lastScrollY = getScrollY()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('touchstart', handleTouchStart)
})

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
  <header class="left-0 right-0 z-40 fixed bg-white border-b transition-[top,opacity,box-shadow] duration-300 ease-out" :class="isScrolled ? 'border-transparent shadow-soft' : 'border-black/5'" :style="{ top: isNavHidden ? '-160px' : '0px', opacity: isNavHidden ? 0 : 1, pointerEvents: isNavHidden ? 'none' : 'auto' }">
    <!-- Contact Bar -->
    <div class="bg-romara-green text-white">
      <div class="romara-container flex h-9 items-center justify-between text-xs sm:h-10">
        <div class="flex items-center gap-3.5 sm:gap-5">
          <a
            :href="`tel:${phone.replace(/\s/g, '')}`"
            class="group flex items-center gap-2 transition-colors duration-300 hover:text-romara-amber"
          >
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-romara-amber group-hover:text-romara-green">
              <IconPhone class="h-3 w-3" />
            </span>
            <span class="font-medium text-white/70 transition-colors duration-300 group-hover:text-current">Call us</span>
            <span class="font-semibold tracking-wide">{{ phone }}</span>
          </a>

          <span class="hidden h-3.5 w-px bg-white/15 sm:block" aria-hidden="true" />

          <a
            :href="`mailto:${email}`"
            class="group hidden items-center gap-2 transition-colors duration-300 hover:text-romara-amber sm:flex"
          >
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-romara-amber group-hover:text-romara-green">
              <IconMail class="h-3 w-3" />
            </span>
            <span class="font-medium tracking-wide">{{ email }}</span>
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
    <nav class="flex justify-between items-center gap-6 h-14 xl:h-20 romara-container">
      <a href="/" class="flex items-center gap-2.5 shrink-0">
        <img :src="logoSrc" alt="ROMARA logo" class="h-10 w-auto sm:h-16" />
        <span class="leading-tight">
          <span class="block font-logo text-xl font-bold tracking-[0.12em] text-romara-green sm:text-2xl">ROMARA</span>
          <span class="block text-[10px] font-bold tracking-[0.14em] text-romara-ink sm:text-xs">TOURS &amp; TRAVEL</span>
          <span class="block max-w-[13rem] text-[10px] font-semibold leading-tight text-romara-amber">Creating memorable African journeys across Kenya and beyond.</span>
        </span>
      </a>

      <ul class="hidden xl:flex items-center gap-x-5">
        <li v-for="(link, linkIndex) in navLinks" :key="link.label" class="group relative whitespace-nowrap">
          <button
            v-if="link.children"
            type="button"
            class="group relative flex items-center gap-1 py-2 font-semibold hover:text-romara-green text-xs uppercase tracking-wide"
            :class="isActiveLink(link.href) || hasActiveChild(link.children) ? 'text-romara-green' : 'text-romara-ink'"
            @mouseenter="openDropdownLabel = link.label"
            @mouseleave="openDropdownLabel = null"
          >
            <component
              :is="link.icon"
              class="h-3.5 w-3.5 shrink-0 text-romara-amber/60 transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-romara-amber"
              :class="(isActiveLink(link.href) || hasActiveChild(link.children)) ? 'text-romara-amber' : ''"
            />
            {{ link.label }}
            <IconChevronDown class="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
          </button>

          <a
            v-else
            :href="link.href"
            class="group relative flex items-center gap-1 py-2 font-semibold hover:text-romara-green text-xs uppercase tracking-wide"
            :class="isActiveLink(link.href) ? 'text-romara-green' : 'text-romara-ink'"
          >
            <component
              :is="link.icon"
              class="h-3.5 w-3.5 shrink-0 text-romara-amber/60 transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:text-romara-amber"
              :class="isActiveLink(link.href) ? 'text-romara-amber' : ''"
            />
            {{ link.label }}
          </a>

          <div
            v-if="link.children"
            class="invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 top-full absolute mt-4 w-[44rem] max-w-[calc(100vw-3rem)] overflow-hidden rounded-card bg-white shadow-elevated ring-1 ring-romara-green/10 transition-all duration-300 ease-out-expo"
            :class="linkIndex >= navLinks.length - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2'"
            @mouseenter="openDropdownLabel = link.label"
            @mouseleave="openDropdownLabel = null"
          >
            <div class="grid grid-cols-[1.15fr_0.85fr]">
              <!-- Links. No icon tiles: every row carried an identical arrow in
                   a box, which is repetition rather than information. The row
                   itself is the affordance — a solid green panel wipes in from
                   the left on hover and the label flips to white. -->
              <div class="p-3">
                <ul>
                  <li v-for="child in link.children" :key="child.label">
                    <a
                      :href="child.href"
                      class="group/row flex items-center rounded-card px-5 py-2 transition-colors duration-200 hover:bg-romara-cream"
                      :class="isActiveLink(child.href) ? 'bg-romara-cream' : ''"
                    >
                      <span
                        class="font-heading text-[1rem] font-semibold normal-case tracking-normal text-romara-green transition-transform duration-200 ease-out-expo group-hover/row:translate-x-1"
                      >
                        {{ child.label }}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Feature image, bled to the panel edge rather than floated
                   inside it as a second rounded box. The panel's own asymmetric
                   corner clips it, which is the signature shape used on cards
                   across the site. -->
              <div class="relative min-h-[9rem] overflow-hidden">
                <img
                  v-if="link.image"
                  :src="link.image"
                  :alt="link.label"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
                <div v-else class="absolute inset-0 flex items-center justify-center bg-green-fade">
                  <span class="font-heading text-lg font-bold text-white/40">{{ link.label }}</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/92 via-romara-green-dark/25 to-transparent"></div>
                <div class="absolute inset-x-0 bottom-0 p-4">
                  <p class="font-heading text-base font-semibold leading-tight text-white">{{ link.label }}</p>
                  <a
                    :href="link.href"
                    class="group/all mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
                  >
                    View all
                    <IconArrowRight class="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/all:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </li>
      </ul>

      <div class="hidden xl:block shrink-0">
        <BaseButton as="a" href="/book-now" variant="primary">Book Now</BaseButton>
      </div>

      <button
        type="button"
        class="flex shrink-0 items-center justify-center p-1 text-romara-green transition-colors duration-300 hover:text-romara-amber xl:hidden"
        aria-label="Open menu"
        @click="toggleMobileMenu"
      >
        <IconMenu class="h-7 w-7" />
      </button>
    </nav>

    <!-- Mobile menu — Teleported to <body> so it escapes the header's transform
         containing block and can truly fill the viewport (fixes the see-through bug). -->
    <Teleport to="body">
      <transition name="mm">
        <div v-if="isMobileMenuOpen" class="xl:hidden fixed inset-0 z-[60]">
          <!-- Drawer panel -->
          <!-- Full-screen sheet rather than a side drawer: on a phone a panel
               that leaves a sliver of page behind it reads as a website overlay,
               a full sheet reads as an app screen. -->
          <div class="mm-panel absolute inset-0 flex h-full w-full flex-col overflow-hidden bg-romara-cream text-romara-green">

            <!-- Header -->
            <div class="relative flex items-center justify-between border-b border-romara-green/10 px-6 py-5">
              <span class="flex items-center gap-2.5">
                <img :src="logoSrc" alt="ROMARA logo" class="h-11 w-auto" />
                <span class="leading-tight">
                  <span class="block font-logo text-xl font-bold tracking-[0.18em] text-romara-green">ROMARA</span>
                  <span class="block text-[9px] font-semibold tracking-[0.2em] text-romara-amber">TOURS &amp; TRAVEL</span>
                </span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-romara-green/15 text-romara-green transition-colors hover:border-romara-amber hover:text-romara-amber"
                @click="toggleMobileMenu"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Secondary destinations only — Home / Safaris / Book / Vehicles /
                 Contact live in the bottom tab bar. Plain type, no icons, no
                 cards, no chevrons: eight links do not need decoration to be
                 understood, and the decoration was the noise. -->
            <nav class="relative flex-1 overflow-y-auto px-6 py-4">
              <ul>
                <li v-for="link in secondaryLinks" :key="link.href">
                  <a
                    :href="link.href"
                    class="block border-b border-romara-green/10 py-4 font-heading text-lg transition-colors active:text-romara-amber"
                    :class="isActiveLink(link.href) ? 'text-romara-amber' : 'text-romara-green'"
                    @click="toggleMobileMenu"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>

            <div
              class="relative px-6 pt-4"
              style="padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px))"
            >
              <a
                :href="`tel:${phone.replace(/\s/g, '')}`"
                class="inline-flex items-center gap-2.5 text-sm text-romara-ink/70 active:text-romara-amber"
              >
                <IconPhone class="h-4 w-4 text-romara-amber" />{{ phone }}
              </a>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>

</template>

<style scoped>
/* Mobile drawer: fade the backdrop, slide the panel in from the right. */
.mm-enter-active,
.mm-leave-active {
  transition: opacity 0.35s ease;
}
.mm-enter-from,
.mm-leave-to {
  opacity: 0;
}
.mm-enter-active .mm-panel,
.mm-leave-active .mm-panel {
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}
.mm-enter-from .mm-panel,
.mm-leave-to .mm-panel {
  transform: translateX(100%);
}

/* Submenu expand */
.mm-sub-enter-active,
.mm-sub-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mm-sub-enter-from,
.mm-sub-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>