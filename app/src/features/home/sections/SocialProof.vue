<script setup lang="ts">
const memberships = [
  { acronym: 'TRA', name: 'Tourism Regulatory Authority', logo: '/images/logos/TRA-clear.png' },
  { acronym: 'KATO', name: 'Kenya Association of Tour Operators', logo: '/images/logos/KATO-clear.png' },
  { acronym: 'KPSGA', name: 'Kenya Professional Safari Guides Association', logo: '/images/logos/KPSGA-clear.png' },
]
</script>

<template>
  <section class="section-y relative isolate overflow-hidden bg-romara-green text-white">
    <!-- Background image + legibility scrim (image stays subtle so the text reads clearly) -->
    <img
      src="/images/home/hero-elephants.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" aria-hidden="true" />
    <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />

    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow justify-center text-romara-amber-300">Trusted &amp; Accredited</p>
        <h2 class="mt-3 font-heading text-display-sm font-semibold text-white">Travellers love ROMARA</h2>
        <p class="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
          We're proud to be recognised and accredited by Kenya's leading tourism bodies —
          your journey is in trusted, professional hands.
        </p>
      </div>

      <!-- Accreditation / memberships -->
      <div class="mt-12">
        <p class="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Proud members of</p>
        <div class="mt-5 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <div
            v-for="body in memberships"
            :key="body.acronym"
            class="flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 backdrop-blur-sm sm:w-auto sm:min-w-[150px] sm:max-w-[260px] sm:flex-1"
          >
            <span class="flex h-11 shrink-0 items-center justify-center rounded-lg bg-white px-2.5">
              <img :src="body.logo" :alt="body.name" loading="lazy" class="h-8 w-auto object-contain" />
            </span>
            <span class="text-xs font-medium leading-snug text-white/80">{{ body.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
