<script setup lang="ts">
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ready to Book Your Airport Transfer?',
  subtitle: 'Enjoy a seamless travel experience from the moment you land.',
  primaryLabel: 'Book Now',
  primaryHref: '/airport-transfers/book',
})
</script>

<template>
  <section class="romara-container pb-16 sm:pb-20">
    <div class="cta-aurora relative isolate overflow-hidden rounded-[1.75rem] bg-romara-green-dark px-6 py-16 text-center shadow-elevated ring-1 ring-white/10 sm:px-10 sm:py-20">
      <!-- Animated aurora blobs -->
      <span class="aurora-blob aurora-blob--a" aria-hidden="true"></span>
      <span class="aurora-blob aurora-blob--b" aria-hidden="true"></span>
      <span class="aurora-blob aurora-blob--c" aria-hidden="true"></span>

      <!-- Fine grid texture -->
      <div class="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]"></div>

      <div class="relative mx-auto max-w-2xl">
        <h2 class="font-heading text-display font-semibold leading-[1.04] text-white text-balance">
          {{ title }}
        </h2>
        <p class="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
          {{ subtitle }}
        </p>

        <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            :href="primaryHref"
            class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-fade px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-romara-green-dark sm:w-auto"
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
.aurora-blob {
  position: absolute;
  z-index: -10;
  border-radius: 9999px;
  filter: blur(60px);
  mix-blend-mode: screen;
  opacity: 0.55;
}
.aurora-blob--a {
  top: -20%;
  left: -8%;
  height: 26rem;
  width: 26rem;
  background: radial-gradient(closest-side, #356045, transparent 70%);
}
.aurora-blob--b {
  bottom: -30%;
  right: -6%;
  height: 30rem;
  width: 30rem;
  background: radial-gradient(closest-side, #c8863a, transparent 70%);
  opacity: 0.4;
}
.aurora-blob--c {
  top: 10%;
  right: 24%;
  height: 20rem;
  width: 20rem;
  background: radial-gradient(closest-side, #274733, transparent 70%);
}

@media (prefers-reduced-motion: no-preference) {
  .aurora-blob--a {
    animation: aurora-a 14s ease-in-out infinite alternate;
  }
  .aurora-blob--b {
    animation: aurora-b 18s ease-in-out infinite alternate;
  }
  .aurora-blob--c {
    animation: aurora-c 16s ease-in-out infinite alternate;
  }
}
@keyframes aurora-a {
  to {
    transform: translate3d(18%, 22%, 0) scale(1.2);
  }
}
@keyframes aurora-b {
  to {
    transform: translate3d(-16%, -18%, 0) scale(1.25);
  }
}
@keyframes aurora-c {
  to {
    transform: translate3d(-22%, 14%, 0) scale(0.85);
  }
}
</style>
