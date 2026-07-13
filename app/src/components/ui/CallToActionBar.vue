<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconLion from '@/components/icons/IconLion.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  /** 'cream' = light background, suitcase icon box (About page).
   *  'green' = dark green background, lion watermark icon (Safari Packages page). */
  theme?: 'cream' | 'green'
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to Start Your Adventure?',
  subtitle: 'Let ROMARA plan the perfect trip for you.',
  primaryLabel: 'Book Your Safari',
  primaryHref: '/book-now',
  theme: 'cream',
})
</script>

<template>
  <section class="romara-container pb-16">
    <div
      class="flex flex-col items-center gap-6 rounded-lg p-6 sm:flex-row sm:justify-between sm:p-8"
      :class="theme === 'green' ? 'bg-romara-green' : 'bg-romara-cream'"
    >
      <div class="flex items-center gap-4 text-center sm:text-left">
        <span
          v-if="theme === 'cream'"
          class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white text-romara-green shadow-card sm:flex"
        >
          <IconSuitcase class="h-7 w-7" />
        </span>
        <IconLion v-else class="hidden h-14 w-14 shrink-0 text-romara-amber sm:block" />

        <div>
          <p class="text-lg font-bold" :class="theme === 'green' ? 'text-white' : 'text-romara-green'">{{ title }}</p>
          <p class="mt-1 text-sm" :class="theme === 'green' ? 'text-white/70' : 'text-romara-ink/60'">{{ subtitle }}</p>
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