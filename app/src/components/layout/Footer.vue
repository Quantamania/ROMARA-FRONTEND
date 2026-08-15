<script setup lang="ts">
import { ref } from 'vue'
const logoSrc = '/images/logos/logo-transparent.webp'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About ROMARA', href: '/about' },
  { label: 'Safari Packages', href: '/safari-packages' },
  { label: 'Day Trips', href: '/day-trips' },
  { label: 'Airport Transfers', href: '/airport-transfers' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Travel Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
]

const services = [
  'Wildlife Safaris',
  'Day Tours',
  'Multi-Day Tours',
  'Mountain Hiking',
  'Beach Holidays',
  'Airport Transfers',
  'Hotel Bookings',
  'Group Travel',
  'Corporate Travel',
  'Customised Tour Packages',
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: IconFacebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: IconInstagram },
  { name: 'TripAdvisor', href: 'https://tripadvisor.com', icon: IconTripadvisor },
  { name: 'WhatsApp', href: 'https://wa.me/254700123456', icon: IconWhatsapp },
]

const newsletterEmail = ref('')
const isSubscribing = ref(false)

function handleNewsletterSubmit() {
  if (!newsletterEmail.value) return
  isSubscribing.value = true
  // Wire this up to features/blog/api/blog.api.ts once the backend endpoint exists
  window.setTimeout(function resetSubscribeState() {
    isSubscribing.value = false
    newsletterEmail.value = ''
  }, 600)
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="relative overflow-visible">
    <footer class="relative z-10 isolate overflow-hidden bg-romara-green-dark text-white">
      <!-- Background image + brand overlay (kept heavy so all text stays legible) -->
      <img
        src="/images/home/mara.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        class="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.4]"
      />
      <div class="absolute inset-0 z-0 bg-romara-green-dark/80" aria-hidden="true" />

      <!-- Giant wordmark watermark. Lives inside the footer on purpose: it used
           to sit above it at z-index -1, which put it behind the page's in-flow
           content and hid it entirely once the preceding section had a solid
           background. z-0 keeps it above the overlay and below the content. -->
      <span
        aria-hidden="true"
        class="pointer-events-none absolute -top-10 left-1/2 z-0 hidden -translate-x-1/2 select-none whitespace-nowrap font-logo text-[10rem] uppercase leading-none tracking-[0.2em] text-white/[0.06] md:block md:text-[14rem] lg:text-[16rem] xl:text-[18rem]"
      >ROMARA</span>
      <!-- Colourful accent line along the very top edge -->

      <!-- ================= DESKTOP / TABLET (md+) : full footer ================= -->
      <div class="relative z-10 hidden md:block">
        <div class="romara-container py-16">
          <!-- Brand band: statement tagline + socials + CTA -->
          <div class="flex flex-col gap-8 border-b border-white/12 pb-12 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-xl">
              <div class="flex items-center gap-3">
                <img :src="logoSrc" alt="ROMARA logo" class="h-24 w-auto" />
                <span class="leading-tight">
                  <span class="block font-logo text-3xl font-bold tracking-[0.24em]">ROMARA</span>
                  <span class="block text-xs font-semibold tracking-[0.22em] text-romara-amber">TOURS &amp; TRAVEL</span>
                </span>
              </div>
              <p class="mt-6 font-heading text-2xl font-semibold leading-snug text-white text-balance lg:text-[1.75rem]">
                Creating memorable African journeys across Kenya and beyond.
              </p>
            </div>

            <div class="flex flex-col items-start gap-5 lg:items-end">
              <div class="flex items-center gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  target="_blank"
                  rel="noopener"
                  :aria-label="social.name"
                  class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-romara-amber hover:bg-romara-amber hover:text-white"
                >
                  <component :is="social.icon" class="h-4 w-4" />
                </a>
              </div>
              <a
                href="/book-now"
                class="inline-flex items-center gap-2 rounded-full bg-romara-amber px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-romara-amber/90"
              >
                Plan Your Trip
                <IconArrowRight class="h-4 w-4" />
              </a>
            </div>
          </div>

          <!-- Columns -->
          <div class="grid gap-10 pt-12 lg:grid-cols-12">
            <div class="lg:col-span-3">
              <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-romara-amber-300">Explore</h3>
              <ul class="mt-5 space-y-2.5">
                <li v-for="link in quickLinks" :key="link.label">
                  <a :href="link.href" class="text-sm text-white/75 transition-colors hover:text-romara-amber">{{ link.label }}</a>
                </li>
              </ul>
            </div>

            <div class="lg:col-span-3">
              <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-romara-amber-300">Services</h3>
              <ul class="mt-5 space-y-2.5">
                <li v-for="service in services" :key="service" class="text-sm text-white/75">{{ service }}</li>
              </ul>
            </div>

            <div class="lg:col-span-2">
              <h3 class="text-[11px] font-bold uppercase tracking-[0.2em] text-romara-amber-300">Contact</h3>
              <ul class="mt-5 space-y-4 text-sm text-white/75">
                <li class="flex items-start gap-2.5">
                  <IconPhone class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
                  <a href="tel:+254700123456" class="hover:text-romara-amber">+254 700 123 456</a>
                </li>
                <li class="flex items-start gap-2.5">
                  <IconMail class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
                  <a href="mailto:info@romaratours.com" class="hover:text-romara-amber">info@romaratours.com</a>
                </li>
                <li class="flex items-start gap-2.5">
                  <IconMapPin class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
                  <span>Ngong Road, Nairobi, Kenya</span>
                </li>
              </ul>
            </div>

            <!-- Newsletter as a featured card -->
            <div class="lg:col-span-4">
              <div class="rounded-card border border-white/12 bg-white/[0.06] p-6">
                <h3 class="font-heading text-lg font-semibold text-romara-amber">Join the journey</h3>
                <p class="mt-2 text-sm leading-relaxed text-white/70">
                  Travel tips, seasonal offers and safari inspiration — straight to your inbox.
                </p>
                <form class="mt-5 flex gap-2" @submit.prevent="handleNewsletterSubmit">
                  <input
                    v-model="newsletterEmail"
                    type="email"
                    required
                    placeholder="Your email address"
                    class="min-w-0 flex-1 rounded-lg border border-white/20 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-romara-amber focus:outline-none"
                  />
                  <button
                    type="submit"
                    :disabled="isSubscribing"
                    class="shrink-0 rounded-lg bg-romara-amber px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-romara-amber/90 disabled:opacity-60"
                  >
                    {{ isSubscribing ? '…' : 'Join' }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= MOBILE (<md) : compact footer ================= -->
      <div class="relative z-10 romara-container py-12 md:hidden">
        <!-- Brand -->
        <div class="flex items-center gap-2.5">
          <img :src="logoSrc" alt="ROMARA logo" class="h-20 w-auto" />
          <span class="leading-tight">
            <span class="block font-logo text-2xl font-bold tracking-[0.22em]">ROMARA</span>
            <span class="block text-[11px] font-semibold tracking-[0.2em] text-romara-amber">TOURS &amp; TRAVEL</span>
          </span>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-white/65">
          Your trusted travel partner for unforgettable experiences in Kenya and beyond.
        </p>

        <!-- Navigation removed on mobile — the bottom tab bar handles it. Keep the address only. -->
        <div class="mt-6 flex items-start gap-2 border-t border-white/12 pt-5 text-sm text-white/75">
          <IconMapPin class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
          <span>Ngong Road, Nairobi, Kenya</span>
        </div>

        <!-- Compact newsletter -->
        <form class="mt-6" @submit.prevent="handleNewsletterSubmit">
          <label class="text-sm font-semibold text-white">Travel tips &amp; offers</label>
          <div class="mt-2.5 flex gap-2">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              placeholder="Your email address"
              class="min-w-0 flex-1 rounded-lg border border-white/20 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-romara-amber focus:outline-none"
            />
            <button
              type="submit"
              :disabled="isSubscribing"
              aria-label="Subscribe"
              class="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-romara-amber text-white transition-colors hover:bg-romara-amber/90 disabled:opacity-60"
            >
              <IconArrowRight class="h-4 w-4" />
            </button>
          </div>
        </form>

        <!-- Social — the primary contact affordance now, so make them prominent -->
        <div class="mt-7 flex items-center gap-3.5">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener"
            :aria-label="social.name"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-romara-amber/15 text-romara-amber-300 transition-colors hover:bg-romara-amber hover:text-white"
          >
            <component :is="social.icon" class="h-7 w-7 [stroke-width:2.4]" />
          </a>
        </div>
      </div>

      <div class="relative z-10 border-t border-white/10">
        <div class="romara-container flex flex-col items-center gap-2 py-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {{ currentYear }} ROMARA Tours and Travel. All Rights Reserved.</p>
          <p class="text-white/45">Creating Memorable African Journeys</p>
        </div>
      </div>
    </footer>
  </div>
</template>
