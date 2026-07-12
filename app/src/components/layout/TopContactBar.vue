<script setup lang="ts">
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

const phone = '+254 700 123 456'
const email = 'info@romaratours.com'

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: IconFacebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: IconInstagram },
  { name: 'TripAdvisor', href: 'https://tripadvisor.com', icon: IconTripadvisor },
  { name: 'WhatsApp', href: 'https://wa.me/254700123456', icon: IconWhatsapp },
]
</script>

<template>
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
          <component :is="social.icon" class="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
</template>