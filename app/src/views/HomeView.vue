<script setup lang="ts">
import HeroBanner from '@/features/home/sections/HeroBanner.vue'
import TrustBuilding from '@/features/home/sections/TrustBuilding.vue'
import FleetShowcase from '@/features/home/sections/FleetShowcase.vue'
import PopularDestinations from '@/features/home/sections/PopularDestinations.vue'
import BlogShelf from '@/features/home/sections/BlogShelf.vue'
import TestimonialsPreview from '@/features/home/sections/TestimonialsPreview.vue'
import CoreServices from '@/features/home/sections/CoreServices.vue'
import FeaturedPackages from '@/features/home/sections/FeaturedPackages.vue'
import WhyChooseUs from '@/features/home/sections/WhyChooseUs.vue'
import SocialProof from '@/features/home/sections/SocialProof.vue'
import BlogPreview from '@/features/home/sections/BlogPreview.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconMedal from '@/components/icons/IconMedal.vue'

const whyChoose = [
  { icon: IconUserCheck, title: 'Local Experts', desc: 'We know Kenya' },
  { icon: IconShield, title: 'Safe & Reliable', desc: 'Your safety is our priority' },
  { icon: IconHeadset, title: '24/7 Support', desc: "We're here anytime" },
  { icon: IconMedal, title: 'Best Value', desc: 'Quality service at fair prices' },
]

const members = [
  { acronym: 'TRA', name: 'Tourism Regulatory Authority', logo: '/images/logos/TRA-clear.png' },
  { acronym: 'KATO', name: 'Kenya Association of Tour Operators', logo: '/images/logos/KATO-clear.png' },
  { acronym: 'KPSGA', name: 'Kenya Professional Safari Guides Association', logo: '/images/logos/KPSGA-clear.png' },
]
</script>

<template>
  <HeroBanner />

  <!-- ================= MOBILE / TABLET: curated flow ================= -->
  <div class="lg:hidden">
    <!-- Why Choose ROMARA — full-bleed panel that curves out of the hero -->
    <section class="relative z-10 rounded-t-[1.75rem] bg-white px-4 pb-4 pt-6 shadow-[0_-12px_30px_-16px_rgba(0,0,0,0.25)]">
      <h2 v-scroll-reveal class="text-center font-heading text-lg font-bold text-romara-green">Why Choose ROMARA?</h2>
      <div class="mt-4 grid grid-cols-4 divide-x divide-romara-green/10">
        <div
          v-for="(item, index) in whyChoose"
          :key="item.title"
          v-scroll-reveal="{ delay: 120 + index * 90 }"
          class="group flex flex-col items-center gap-2 px-1.5 text-center"
        >
          <span class="relative inline-flex h-6 w-6 items-center justify-center">
            <span
              class="pointer-events-none absolute inset-0 scale-75 rounded-full bg-romara-amber/25 opacity-0 blur-md transition-all duration-500 ease-out-expo group-hover:scale-150 group-hover:opacity-100 group-active:scale-150 group-active:opacity-100"
              aria-hidden="true"
            />
            <component
              :is="item.icon"
              class="relative h-6 w-6 text-romara-amber transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:scale-110 group-active:scale-110"
            />
          </span>
          <p class="text-[12px] font-bold leading-tight text-romara-green transition-colors duration-300 group-hover:text-romara-amber">{{ item.title }}</p>
        </div>
      </div>
    </section>

    <!-- Body — one consistent rhythm between every block -->
    <div class="space-y-8 bg-romara-bone pb-10 pt-6">
      <FleetShowcase />
      <PopularDestinations />

      <section>
        <div class="romara-container">
          <TestimonialsPreview :card="false" />
        </div>
      </section>

      <!-- Accreditation — proud members only (stats moved to the hero) -->
      <section>
        <div class="romara-container">
          <p class="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-romara-ink/40">Proud Members Of</p>
          <div class="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <img
              v-for="m in members"
              :key="m.acronym"
              :src="m.logo"
              :alt="m.name"
              :title="m.name"
              loading="lazy"
              class="h-14 w-auto object-contain"
            />
          </div>
        </div>
      </section>

      <!-- Latest blog posts -->
      <BlogShelf />
    </div>

    <!-- Closing CTA — green gradient card (mockup style) -->
    <section class="bg-romara-bone px-4 pb-9 pt-2">
      <div class="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-romara-green-700 to-romara-green-500 p-6 text-white shadow-card">
        <h2 class="font-heading text-2xl font-bold leading-tight">Ready to Explore Kenya?</h2>
        <p class="mt-1.5 text-xs leading-relaxed text-white/80">Let's plan your perfect adventure today.</p>
        <a
          href="/contact"
          class="mt-5 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-white px-5 text-xs font-extrabold uppercase tracking-[0.06em] text-romara-green transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
        >
          Get a Quote
          <IconArrowRight class="h-4 w-4" />
        </a>
      </div>
    </section>
  </div>

  <!-- ================= DESKTOP: original layout ================= -->
  <div class="hidden lg:block">
    <TrustBuilding />
    <div class="content-auto-section"><CoreServices /></div>
    <div class="content-auto-section"><FleetShowcase /></div>
    <div class="content-auto-section"><FeaturedPackages /></div>

    <section class="content-auto-section section-y bg-romara-sand">
      <div class="romara-container grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        <WhyChooseUs />
        <TestimonialsPreview />
      </div>
    </section>

    <div class="content-auto-section"><SocialProof /></div>
    <div class="content-auto-section"><BlogPreview /></div>
  </div>
</template>
