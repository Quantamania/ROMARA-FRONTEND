<script setup lang="ts">
import { ref } from 'vue'
import logoSrc from '@/assets/images/logos/logo-transparent.png'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

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
</script>

<template>
  <div class="relative overflow-visible">
    <div class="hidden md:block pointer-events-none absolute left-1/2 -top-56 -translate-x-1/2 z-[-1]">
      <span class="block text-[10rem] font-heading uppercase tracking-[0.2em] text-romara-green-dark/10 leading-none sm:text-[12rem] md:text-[14rem] lg:text-[16rem] xl:text-[18rem]">
        ROMARA
      </span>
    </div>
    <footer class="relative z-10 overflow-visible bg-romara-green-dark text-white">
      <div class="relative romara-container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
      <div class="lg:col-span-1">
        <div class="flex items-center gap-2.5">
  <img :src="logoSrc" alt="ROMARA logo" class="h-20 w-auto" />
  <span class="leading-tight">
    <span class="block font-heading text-base font-bold tracking-[0.40em]">ROMARA</span>
    <span class="block text-[10px] font-semibold tracking-[0.20em] text-romara-amber">TOURS &amp; TRAVEL</span>
    <span class="block text-[9px] font-semibold text-romara-amber">Reaching Out to Your Next Adventure</span>
  </span>
</div>
        <p class="mt-4 text-sm leading-relaxed text-white/70">
          Your trusted travel partner for unforgettable experiences in Kenya and beyond.
        </p>
        <div class="mt-5 flex items-center gap-3">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.href"
            target="_blank"
            rel="noopener"
            :aria-label="social.name"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-romara-amber hover:text-romara-amber"
          >
            <component :is="social.icon" class="h-4 w-4" />
          </a>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide text-white">Quick Links</h3>
        <ul class="mt-4 grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2.5">
          <li v-for="link in quickLinks" :key="link.label">
            <a :href="link.href" class="text-sm text-white/70 hover:text-romara-amber">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide text-white">Services</h3>
        <ul class="mt-4 grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-2.5">
          <li v-for="service in services" :key="service" class="text-sm text-white/70">{{ service }}</li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide text-white">Contact Us</h3>
        <ul class="mt-4 space-y-3 text-sm text-white/70">
          <li class="flex items-center gap-2">
            <IconPhone class="h-4 w-4 shrink-0 text-romara-amber" />
            <a href="tel:+254700123456" class="hover:text-romara-amber">+254 700 123 456</a>
          </li>
          <li class="flex items-center gap-2">
            <IconMail class="h-4 w-4 shrink-0 text-romara-amber" />
            <a href="mailto:info@romaratours.com" class="hover:text-romara-amber">info@romaratours.com</a>
          </li>
          <li class="flex items-start gap-2">
            <IconMapPin class="mt-0.5 h-4 w-4 shrink-0 text-romara-amber" />
            <span>Ngong Road, Nairobi, Kenya</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-bold uppercase tracking-wide text-white">Newsletter</h3>
        <p class="mt-4 text-sm text-white/70">Subscribe for travel tips, offers and updates.</p>
        <form class="mt-4 flex flex-col gap-2.5" @submit.prevent="handleNewsletterSubmit">
          <input
            v-model="newsletterEmail"
            type="email"
            required
            placeholder="Your email address"
            class="rounded-md border border-white/20 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-romara-amber focus:outline-none"
          />
          <button
            type="submit"
            :disabled="isSubscribing"
            class="rounded-md bg-romara-amber px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-romara-amber/90 disabled:opacity-60"
          >
            {{ isSubscribing ? 'Subscribing…' : 'Subscribe' }}
          </button>
        </form>
      </div>
    </div>

    <div class="border-t border-white/10">
      <p class="romara-container py-5 text-center text-xs text-white/60">
        © {{ new Date().getFullYear() }} ROMARA Tours and Travel. All Rights Reserved.
      </p>
    </div>
  </footer>
</div>
</template>