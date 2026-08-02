<script setup lang="ts">
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  /** Place names that scroll as the kinetic backdrop. */
  places?: string[]
}

withDefaults(defineProps<Props>(), {
  title: 'Ready for an Adventure?',
  subtitle: 'Book your next day trip with ROMARA today.',
  primaryLabel: 'Book a Day Trip',
  primaryHref: '/book-now',
  places: () => [
    'Maasai Mara',
    'Amboseli',
    'Lake Nakuru',
    'Nairobi',
    'Diani Beach',
    'Tsavo',
    'Mount Kenya',
    'Hell’s Gate',
  ],
})
</script>

<template>
  <section class="content-auto romara-container pb-16 sm:pb-20">
    <div class="relative isolate overflow-hidden rounded-[1.75rem] bg-romara-green px-6 py-14 shadow-elevated ring-1 ring-white/10 sm:px-10 sm:py-16">
      <!-- Kinetic marquee backdrop: two rows drifting opposite directions -->
      <div class="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div class="marquee marquee--l flex whitespace-nowrap">
          <span v-for="n in 2" :key="'a' + n" class="flex shrink-0 items-center">
            <span v-for="place in places" :key="'a' + n + place" class="mx-6 font-heading text-4xl font-semibold uppercase tracking-tight text-white/[0.06] sm:text-6xl">
              {{ place }}
            </span>
          </span>
        </div>
        <div class="marquee marquee--r flex whitespace-nowrap">
          <span v-for="n in 2" :key="'b' + n" class="flex shrink-0 items-center">
            <span v-for="place in [...places].reverse()" :key="'b' + n + place" class="mx-6 font-heading text-4xl font-semibold uppercase tracking-tight text-white/[0.06] sm:text-6xl">
              {{ place }}
            </span>
          </span>
        </div>
      </div>

      <!-- Amber ticker ribbon -->
      <div class="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden border-b border-white/10 bg-romara-green-dark/40 py-2">
        <div class="marquee marquee--l flex whitespace-nowrap">
          <span v-for="n in 2" :key="'t' + n" class="flex shrink-0 items-center">
            <span v-for="place in places" :key="'t' + n + place" class="mx-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-romara-amber-300">
              {{ place }}
              <span class="text-white/20">◆</span>
            </span>
          </span>
        </div>
      </div>

      <div class="relative mx-auto max-w-2xl pt-6 text-center">
        <h2 class="font-heading text-display font-semibold leading-[1.04] text-white text-balance">
          {{ title }}
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
          {{ subtitle }}
        </p>

        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            :href="primaryHref"
            class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-fade px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-romara-green sm:w-auto"
          >
            {{ primaryLabel }}
            <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
          </a>
          <a
            href="https://wa.me/254700123456"
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

<style scoped>
.marquee {
  width: max-content;
}
@media (prefers-reduced-motion: no-preference) {
  .marquee--l {
    animation: cta-marquee-l 32s linear infinite;
  }
  .marquee--r {
    animation: cta-marquee-r 38s linear infinite;
  }
}
@keyframes cta-marquee-l {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@keyframes cta-marquee-r {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
