<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconLion from '@/components/icons/IconLion.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  /** 'cream' = light background (About page).
   *  'green' = dark green background (Safari Packages, Day Trips pages). */
  theme?: 'cream' | 'green'
  /** 'boxed' = icon sits in a small white/cream rounded box (About, Day Trips).
   *  'bare' = icon rendered directly, no box, amber colored (Safari Packages).
   *  Defaults based on theme if not set: cream -> boxed, green -> bare. */
  iconStyle?: 'boxed' | 'bare'
  /** Override which icon renders. Defaults: boxed -> suitcase, bare -> lion. */
  icon?: Component
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ready to Start Your Adventure?',
  subtitle: 'Let ROMARA plan the perfect trip for you.',
  primaryLabel: 'Book Your Safari',
  primaryHref: '/book-now',
  theme: 'cream',
  iconStyle: undefined,
  icon: undefined,
})

const resolvedIconStyle = computed(function getIconStyle() {
  return props.iconStyle ?? (props.theme === 'green' ? 'bare' : 'boxed')
})

const resolvedIcon = computed(function getIconComponent() {
  if (props.icon) return props.icon
  return resolvedIconStyle.value === 'bare' ? IconLion : IconSuitcase
})
</script>

<template>
  <section class="romara-container pb-16">
    <div
      class="relative flex flex-col items-center gap-6 overflow-hidden rounded-card p-8 shadow-elevated sm:flex-row sm:justify-between sm:p-10"
      :class="theme === 'green' ? 'bg-green-fade text-white' : 'bg-romara-cream'"
    >
      <span
        class="pointer-events-none absolute -right-6 -top-10 select-none font-heading text-[9rem] leading-none text-romara-amber/10"
        aria-hidden="true"
      >&rdquo;</span>

      <div class="relative flex items-center gap-5 text-center sm:text-left">
        <span
          v-if="resolvedIconStyle === 'boxed'"
          class="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-romara-amber/10 text-romara-amber sm:flex"
        >
          <component :is="resolvedIcon" class="h-8 w-8" />
        </span>
        <component :is="resolvedIcon" v-else class="hidden h-14 w-14 shrink-0 text-romara-amber sm:block" />

        <div>
          <p class="font-heading text-xl font-semibold sm:text-2xl" :class="theme === 'green' ? 'text-white' : 'text-romara-green'">{{ title }}</p>
          <p class="mt-1.5 text-sm" :class="theme === 'green' ? 'text-white/70' : 'text-romara-ink/60'">{{ subtitle }}</p>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <BaseButton as="a" :href="primaryHref" :variant="theme === 'green' ? 'amber' : 'primary'">{{ primaryLabel }}</BaseButton>
        <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
        <BaseButton as="a" href="https://wa.me/254700123456" :variant="theme === 'green' ? 'ghost' : 'amber'">
          <IconWhatsapp class="h-4 w-4" />
          Chat on WhatsApp
        </BaseButton>
      </div>
    </div>
  </section>
</template>