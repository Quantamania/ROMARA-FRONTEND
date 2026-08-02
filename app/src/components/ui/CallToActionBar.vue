<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  /** Background image behind the scrim. */
  image?: string
  /** Kept for backwards compatibility with existing call sites; the band is
   *  always cinematic now, so this no longer changes the look. */
  theme?: 'cream' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ready to Start Your Adventure?',
  subtitle: 'Tell us how you like to travel and our specialists will shape a journey around you.',
  primaryLabel: 'Book Your Safari',
  primaryHref: '/book-now',
  image: '/images/home/hero-elephants.webp',
  theme: 'green',
})

// Unique UI feature: a warm "torchlight" that follows the pointer across the
// band on desktop, and drifts on its own (the .cta-aurora layer) on touch /
// reduced-motion. rAF-throttled; resets to a resting position on leave.
const mx = ref(50)
const my = ref(12)
let raf = 0

function onMove(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  if (raf) return
  raf = window.requestAnimationFrame(() => {
    mx.value = x
    my.value = y
    raf = 0
  })
}

function onLeave() {
  mx.value = 50
  my.value = 12
}

const spotStyle = computed(() => ({
  background: `radial-gradient(680px circle at ${mx.value}% ${my.value}%, rgba(217,160,92,0.34), rgba(217,160,92,0.06) 34%, transparent 55%)`,
}))

onBeforeUnmount(() => {
  if (raf) window.cancelAnimationFrame(raf)
})
</script>

<template>
  <section class="content-auto romara-container pb-16 sm:pb-20">
    <div
      class="cta-band group relative isolate overflow-hidden rounded-[1.75rem] px-6 py-12 shadow-elevated ring-1 ring-white/10 sm:px-12 sm:py-16 lg:px-16 lg:py-[4.5rem]"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <!-- Cinematic background -->
      <img
        :src="props.image"
        alt=""
        aria-hidden="true"
        class="ken-burns absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div class="absolute inset-0 -z-10 bg-gradient-to-br from-romara-green-dark/94 via-romara-green-dark/82 to-romara-green/64"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-romara-green-dark/80 via-transparent to-transparent"></div>

      <!-- Ambient drift (motion on touch / reduced-motion) + pointer torchlight -->
      <div class="cta-aurora pointer-events-none absolute -z-10"></div>
      <div class="cta-spot pointer-events-none absolute inset-0 -z-10 mix-blend-screen transition-[background] duration-200 ease-out" :style="spotStyle"></div>

      <!-- Hairline top accent -->
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-romara-amber/60 to-transparent"></div>

      <div class="relative max-w-2xl">
        <h2 class="font-heading text-display font-semibold leading-[1.04] text-white text-balance">
          {{ title }}
        </h2>
        <p class="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          {{ subtitle }}
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <!-- Primary: shine-sweep CTA -->
          <a
            :href="primaryHref"
            class="cta-primary group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-amber-fade px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-romara-green-dark"
          >
            <span class="relative z-10">{{ primaryLabel }}</span>
            <IconArrowRight class="relative z-10 h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1" />
            <span class="cta-shine" aria-hidden="true"></span>
          </a>

          <!-- Secondary: WhatsApp -->
          <a
            href="https://wa.me/254700123456"
            target="_blank"
            rel="noopener"
            class="group/wa inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <IconWhatsapp class="h-4 w-4 text-romara-amber-300" />
            Chat on WhatsApp
          </a>
        </div>

        <!-- Soft tertiary + trust cue -->
        <div class="mt-7">
          <a
            href="/contact"
            class="group/quote inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            Or request a tailor-made quote
            <IconArrowRight class="h-3.5 w-3.5 text-romara-amber-300 transition-transform duration-300 ease-out-expo group-hover/quote:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-aurora {
  top: -30%;
  right: -10%;
  height: 130%;
  width: 60%;
  background: radial-gradient(closest-side, rgba(217, 160, 92, 0.28), transparent 70%);
  filter: blur(20px);
  opacity: 0.9;
}

.cta-shine {
  position: absolute;
  inset: 0;
  transform: translateX(-130%) skewX(-18deg);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.cta-primary:hover .cta-shine,
.cta-primary:focus-visible .cta-shine {
  transform: translateX(130%) skewX(-18deg);
}

@media (prefers-reduced-motion: no-preference) {
  .cta-aurora {
    animation: cta-drift 9s ease-in-out infinite alternate;
  }
}

@keyframes cta-drift {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.65;
  }
  100% {
    transform: translate3d(-14%, 8%, 0) scale(1.15);
    opacity: 1;
  }
}
</style>
