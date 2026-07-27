<script setup lang="ts">
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

interface ContactOption {
  icon: typeof IconPhone
  label: string
  value: string
  href: string
  hours: string
}

const options: ContactOption[] = [
  {
    icon: IconPhone,
    label: 'Call Us',
    value: '+254 700 123 456',
    href: 'tel:+254700123456',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM EAT',
  },
  {
    icon: IconMail,
    label: 'Email Us',
    value: 'info@romaratours.com',
    href: 'mailto:info@romaratours.com',
    hours: 'We reply within 24 hours',
  },
  {
    icon: IconWhatsapp,
    label: 'Chat on WhatsApp',
    value: '+254 700 123 456',
    href: 'https://wa.me/254700123456',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM EAT',
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <a
      v-for="option in options"
      :key="option.label"
      :href="option.href"
      :target="option.href.startsWith('http') ? '_blank' : undefined"
      :rel="option.href.startsWith('http') ? 'noopener' : undefined"
      class="flex items-center gap-4 rounded-lg bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
    >
      <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romara-amber text-white">
        <component :is="option.icon" class="h-5 w-5" />
      </span>
      <div class="min-w-0">
        <p class="text-sm font-bold text-romara-green">{{ option.label }}</p>
        <p class="mt-0.5 truncate text-sm font-semibold text-romara-amber">{{ option.value }}</p>
        <p class="mt-0.5 text-xs text-romara-ink/50">{{ option.hours }}</p>
      </div>
    </a>
  </div>
</template>