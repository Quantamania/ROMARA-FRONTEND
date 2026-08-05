<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue'
import IconCompass from '@/components/icons/IconCompass.vue'

const memberships = [
  { acronym: 'TRA', name: 'Tourism Regulatory Authority' },
  { acronym: 'KATO', name: 'Kenya Association of Tour Operators' },
  { acronym: 'KPSGA', name: 'Kenya Professional Safari Guides Association' },
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
      class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" aria-hidden="true" />
    <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />

    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow justify-center text-romara-amber-300">Trusted &amp; Accredited</p>
        <h2 class="mt-3 font-heading text-display-sm font-semibold text-white">Travellers love ROMARA</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75">
          A track record built on safe journeys, expert guiding and happy guests — recognised by Kenya's
          leading tourism bodies.
        </p>
      </div>

      <!-- Social proof stats -->
      <dl class="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        <div class="text-center">
          <div class="flex justify-center gap-1 text-romara-amber">
            <IconStar v-for="n in 5" :key="n" class="h-5 w-5" />
          </div>
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">5.0</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Rated by travellers</dt>
        </div>

        <div class="text-center">
          <IconThumbsUp class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">300+</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Happy clients</dt>
        </div>

        <div class="text-center">
          <IconCompass class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">100+</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Successful safaris</dt>
        </div>

        <div class="text-center">
          <IconMapPin class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">Kenya-wide</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Operating across Kenya</dt>
        </div>
      </dl>

      <!-- Accreditation / memberships -->
      <div class="mt-14 border-t border-white/10 pt-8">
        <p class="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Proud members of</p>
        <div class="mt-5 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <div
            v-for="body in memberships"
            :key="body.acronym"
            class="flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 backdrop-blur-sm sm:w-auto sm:min-w-[150px] sm:max-w-[260px] sm:flex-1"
          >
            <span class="flex h-11 shrink-0 items-center rounded-lg bg-romara-amber px-3 font-heading text-sm font-bold tracking-wide text-white">
              {{ body.acronym }}
            </span>
            <span class="text-xs font-medium leading-snug text-white/80">{{ body.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
