<script setup lang="ts">
import AboutHero from '@/features/about/sections/AboutHero.vue'
import OurStory from '@/features/about/sections/OurStory.vue'
import MissionValues from '@/features/about/sections/MissionValues.vue'
import WhoWeAre from '@/features/about/sections/WhoWeAre.vue'
import StatsBanner from '@/features/about/sections/StatsBanner.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const channels = [
  { label: 'Call us', value: '+254 700 000 000', href: 'tel:+254700000000' },
  { label: 'WhatsApp', value: 'Chat with an expert', href: 'https://wa.me/254700000000' },
  { label: 'Email', value: 'hello@romaratravel.com', href: 'mailto:hello@romaratravel.com' },
]
</script>

<template>
  <!-- Hero with parallax effect -->
  <div v-scroll-reveal>
    <AboutHero />
  </div>

  <!--
    Section 01 — Origin.
    Signature device: instead of decorative "01" numerals (which don't
    encode a real sequence here), each custom section is tagged with the
    actual coordinates of the place the copy is talking about — a waypoint
    log, the way you'd annotate a trip. Nairobi here, since that's where
    ROMARA started.
  -->
  <section
    class="relative min-h-[560px] overflow-hidden bg-cover bg-center bg-scroll md:min-h-[640px] md:bg-fixed"
    style="background-image: url('/src/assets/images/about/cheetah1.jpeg')"
  >
    <div class="absolute inset-0 bg-romara-green/85"></div>
    <div class="absolute inset-0 bg-scrim-b"></div>

    <div class="relative py-24 md:py-32 romara-container">
      <div class="gap-x-12 gap-y-16 grid grid-cols-1 lg:grid-cols-12">
        <!-- Story, offset left -->
        <div class="lg:col-span-7">
          <!-- Signature waypoint tag: the real coordinates of the place the copy names -->
          <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
            <span class="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span class="absolute inline-flex h-full w-full rounded-full bg-romara-amber/60"></span>
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-romara-amber"></span>
            </span>
            <span class="font-mono text-white/70 text-[11px] tracking-[0.2em] uppercase">
              01°17&#39;S 36°49&#39;E — Nairobi, where it began
            </span>
          </div>

          <h2 class="font-heading font-semibold text-white text-display leading-[1.05]">
            Born from
            <span class="block text-romara-amber">passion.</span>
          </h2>

          <p class="mt-6 max-w-lg text-white/85 text-lg leading-relaxed">
            ROMARA Tours &amp; Travel was founded with a simple yet powerful vision: to connect
            people with the untamed beauty of Kenya through experiences that transform, inspire,
            and create lasting memories.
          </p>
        </div>

        <!-- Stat ledger, offset right, stacked as a manifest rather than a horizontal row -->
        <div class="lg:col-span-4 lg:col-start-9 self-end">
          <dl class="divide-y divide-white/10 border-white/20 border-t">
            <div class="group flex justify-between items-baseline py-5">
              <dt class="text-white/60 text-sm">Years of experience</dt>
              <dd class="font-heading font-semibold text-romara-amber text-4xl">10+</dd>
            </div>
            <div class="group flex justify-between items-baseline py-5">
              <dt class="text-white/60 text-sm">Happy travelers</dt>
              <dd class="font-heading font-semibold text-romara-amber text-4xl">5000+</dd>
            </div>
            <div class="group flex justify-between items-baseline py-5">
              <dt class="text-white/60 text-sm">Destinations covered</dt>
              <dd class="font-heading font-semibold text-romara-amber text-4xl">50+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission Values embedded -->
  <div v-scroll-reveal>
    <OurStory>
      <template #mission>
        <MissionValues />
      </template>
    </OurStory>
  </div>

  <!-- Who We Are with background image -->
  <section class="relative overflow-hidden">
    <img
      src="/src/assets/images/gallery/elephant1.jpeg"
      alt="Elephant herd"
      loading="lazy"
      class="absolute inset-0 opacity-15 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-romara-cream/95" />
    <div class="relative romara-container">
      <div v-scroll-reveal-scale>
        <WhoWeAre />
      </div>
    </div>
  </section>

  <!-- Stats Banner with left animation -->
  <div v-scroll-reveal-left>
    <StatsBanner />
  </div>

  <!--
    Closing CTA — immersive full-bleed image with a centered headline,
    plus a floating action bar (call / WhatsApp / email) that straddles
    the section boundary so the next step is right where the eye lands.
    Waypoint tag still spans the geography the copy covers (Mara to coast).
  -->
  <section class="relative isolate overflow-hidden bg-romara-green-dark pb-28 pt-28 text-white sm:pb-32 md:pt-36">
    <img
      src="/src/assets/images/gallery/lion.jpeg"
      alt="Lion resting in the Maasai Mara at golden hour"
      class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-romara-green-dark/95 via-romara-green-dark/70 to-romara-green-dark" />

    <div class="romara-container relative flex flex-col items-center text-center">
      <!-- Signature waypoint tag: still spans the geography the copy covers -->
      <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
        <span class="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span class="absolute inline-flex h-full w-full rounded-full bg-romara-amber/60"></span>
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-romara-amber"></span>
        </span>
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
          01°30&#39;S 35°08&#39;E — 04°03&#39;S 39°40&#39;E — Mara to coast
        </span>
      </div>

      <h2 class="font-heading max-w-2xl text-display font-semibold leading-tight">
        Your Kenyan
        <span class="text-romara-amber">adventure</span>
        awaits
      </h2>

      <p class="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
        From the vast savannas of the Maasai Mara to the pristine beaches of the Kenyan coast,
        let us craft your perfect journey.
      </p>

      <div class="mt-9 flex flex-wrap items-center justify-center gap-4">
        <BaseButton as="a" href="/safari-packages" variant="amber" size="lg" class="rounded-full">
          Browse packages
        </BaseButton>
        <BaseButton as="a" href="/contact" variant="outline" size="lg" class="rounded-full">
          Get a custom quote
        </BaseButton>
      </div>
    </div>

    <!-- Floating action bar — straddles the section's bottom edge -->
    <div class="romara-container relative z-10 -mb-28 mt-16 hidden sm:block">
      <div class="grid grid-cols-3 divide-x divide-white/10 rounded-sm border border-white/15 bg-romara-green/90 backdrop-blur-md">
        <a
          v-for="c in channels"
          :key="c.label"
          :href="c.href"
          class="group flex flex-col items-center gap-1 px-6 py-6 text-center transition-colors hover:bg-white/5"
        >
          <span class="text-xs uppercase tracking-[0.2em] text-romara-amber">{{ c.label }}</span>
          <span class="text-sm font-medium text-white/85 group-hover:text-white">{{ c.value }}</span>
        </a>
      </div>
    </div>
  </section>
</template>