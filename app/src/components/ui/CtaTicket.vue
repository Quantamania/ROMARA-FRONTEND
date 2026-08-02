<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconPlaneTakeoff from '@/components/icons/IconPlaneTakeoff.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  from?: string
  to?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to book this trip?',
  subtitle: 'Secure your spot today and let us craft an unforgettable experience for you.',
  primaryLabel: 'Start Booking',
  primaryHref: '/booking',
  from: 'Nairobi',
  to: 'The Wild',
})
</script>

<template>
  <!-- Notch colour matches this section's surface so the perforation reads as punched holes -->
  <section class="romara-container bg-romara-cream pb-16 sm:pb-20">
    <div class="group relative">
      <div class="relative flex flex-col overflow-hidden rounded-[1.5rem] shadow-elevated md:flex-row">
        <!-- Main body -->
        <div class="relative flex-1 overflow-hidden bg-green-fade p-8 text-white sm:p-10 lg:p-12">
          <span class="cta-ticket-shine" aria-hidden="true"></span>
          <p class="text-[11px] font-bold uppercase tracking-[0.3em] text-romara-amber-300">Safari Day Pass</p>
          <h2 class="mt-3 font-heading text-3xl font-semibold leading-tight text-balance sm:text-display-sm">
            {{ title }}
          </h2>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-white/75">{{ subtitle }}</p>

          <!-- Route line -->
          <div class="mt-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
            <span>{{ from }}</span>
            <span class="h-px flex-1 border-t border-dashed border-white/30"></span>
            <IconPlaneTakeoff class="h-4 w-4 shrink-0 text-romara-amber-300" />
            <span class="h-px flex-1 border-t border-dashed border-white/30"></span>
            <span>{{ to }}</span>
          </div>

          <a
            :href="primaryHref"
            class="group/btn mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-amber-fade px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-romara-green"
          >
            {{ primaryLabel }}
            <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" />
          </a>
        </div>

        <!-- Tear-off stub -->
        <div class="relative flex items-center justify-between gap-4 border-t border-dashed border-white/25 bg-romara-green-dark p-6 text-white transition-transform duration-500 ease-out-expo md:w-52 md:flex-col md:justify-center md:border-l md:border-t-0 md:py-10 md:group-hover:translate-x-1">
          <!-- Mobile notches (ends of the horizontal perforation) -->
          <span class="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-romara-cream md:hidden" aria-hidden="true"></span>
          <span class="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-romara-cream md:hidden" aria-hidden="true"></span>

          <div class="md:text-center">
            <p class="font-heading text-2xl font-bold uppercase tracking-[0.2em] text-white md:[writing-mode:vertical-rl] md:rotate-180 md:tracking-[0.35em]">
              Admit One
            </p>
          </div>

          <div class="flex flex-col items-end gap-2 md:items-center">
            <!-- Barcode -->
            <div class="h-12 w-24 cta-ticket-barcode md:h-24 md:w-12" aria-hidden="true"></div>
            <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">No. RM·254</p>
          </div>
        </div>
      </div>

      <!-- Desktop notches (top & bottom of the vertical perforation, at the stub's left edge) -->
      <span class="pointer-events-none absolute right-52 top-0 hidden h-6 w-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-romara-cream md:block" aria-hidden="true"></span>
      <span class="pointer-events-none absolute right-52 bottom-0 hidden h-6 w-6 translate-y-1/2 -translate-x-1/2 rounded-full bg-romara-cream md:block" aria-hidden="true"></span>
    </div>
  </section>
</template>

<style scoped>
.cta-ticket-barcode {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.85) 0,
    rgba(255, 255, 255, 0.85) 2px,
    transparent 2px,
    transparent 5px
  );
}
@media (min-width: 768px) {
  .cta-ticket-barcode {
    background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.85) 0,
      rgba(255, 255, 255, 0.85) 2px,
      transparent 2px,
      transparent 5px
    );
  }
}

.cta-ticket-shine {
  position: absolute;
  inset: 0;
  transform: translateX(-120%) skewX(-18deg);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.14), transparent);
}
@media (prefers-reduced-motion: no-preference) {
  .group:hover .cta-ticket-shine {
    transform: translateX(120%) skewX(-18deg);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }
}
</style>
