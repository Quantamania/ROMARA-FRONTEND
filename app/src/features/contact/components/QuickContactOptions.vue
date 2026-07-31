<script setup lang="ts">
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

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
  <div class="rounded-card bg-white p-6 shadow-card sm:p-7">
    <p class="eyebrow mb-3">
      
      Talk to Us
    </p>
    <h2 class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">Reach Us Directly</h2>
    <span class="accent-rule mt-4" />

    <div class="mt-6 space-y-3">
      <a
        v-for="option in options"
        :key="option.label"
        :href="option.href"
        :target="option.href.startsWith('http') ? '_blank' : undefined"
        :rel="option.href.startsWith('http') ? 'noopener' : undefined"
        class="group flex items-center gap-4 rounded-card border border-romara-green/10 bg-romara-bone p-4 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/30 hover:shadow-card"
      >
        <span
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft transition-transform duration-300 ease-out-expo group-hover:scale-105"
        >
          <component :is="option.icon" class="h-5 w-5" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">{{ option.label }}</p>
          <p class="mt-0.5 truncate font-heading text-base font-semibold text-romara-green">{{ option.value }}</p>
          <p class="mt-0.5 text-xs text-romara-ink-soft/80">{{ option.hours }}</p>
        </div>
        <IconArrowRight
          class="h-4 w-4 shrink-0 text-romara-amber transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      </a>
    </div>
  </div>
</template>
