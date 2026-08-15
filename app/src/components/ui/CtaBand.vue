<script setup lang="ts">
/**
 * Closing call to action: a full-bleed green band with one line and the actions.
 *
 * Replaces CtaAurora, which wrapped the same content in a rounded card with
 * three animated aurora blobs and a dot-grid overlay — decoration competing with
 * the only thing the section is for. This matches the Destinations CTA and the
 * day-trips band, so the site closes every page the same way instead of three
 * different ways.
 */
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

interface Props {
  title?: string
  primaryLabel?: string
  primaryHref?: string
  whatsappHref?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to book?',
  primaryLabel: 'Book Now',
  primaryHref: '/booking',
  whatsappHref: 'https://wa.me/254700123456',
})
</script>

<template>
  <section class="content-auto pb-16 sm:pb-20">
    <div class="bg-romara-green px-6 py-14 text-center sm:px-10 sm:py-16">
      <div class="mx-auto max-w-2xl">
        <h2 class="font-heading text-display-sm font-semibold leading-tight text-white text-balance">
          {{ title }}
        </h2>

        <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            :href="primaryHref"
            class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-fade px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-romara-green sm:w-auto"
          >
            {{ primaryLabel }}
            <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </a>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:w-auto"
          >
            <IconWhatsapp class="h-4 w-4 text-romara-amber-300" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
