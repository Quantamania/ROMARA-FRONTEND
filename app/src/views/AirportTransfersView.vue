<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import CtaAurora from '@/components/ui/CtaAurora.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconShield from '@/components/icons/IconShield.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconDollarCircle from '@/components/icons/IconDollarCircle.vue'
import IconCar from '@/components/icons/IconCar.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconPlaneLanding from '@/components/icons/IconPlaneLanding.vue'
import IconPlaneTakeoff from '@/components/icons/IconPlaneTakeoff.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import transferServicesData from '@/data/transferServices.json'
import type { TransferService } from '@/features/airport-transfers/types/transfer.types'

const services = transferServicesData as TransferService[]

const serviceIcons = {
  'plane-landing': IconPlaneLanding,
  'plane-takeoff': IconPlaneTakeoff,
  car: IconCar,
  users: IconUsers,
} as const

interface TrustFeature {
  icon: typeof IconClock
  title: string
  description: string
}

const trustFeatures: TrustFeature[] = [
  { icon: IconClock, title: 'On-Time Guarantee', description: 'We monitor flights to ensure timely pick-ups and drop-offs.' },
  { icon: IconUser, title: 'Professional Drivers', description: 'Experienced, courteous and knowledgeable drivers.' },
  { icon: IconShield, title: 'Safe & Comfortable', description: 'Well-maintained vehicles for a smooth and secure journey.' },
  { icon: IconSuitcase, title: 'Meet & Greet Service', description: 'Our driver will meet you at the arrivals hall with a name sign.' },
  { icon: IconDollarCircle, title: 'Transparent Pricing', description: 'No hidden fees. What you see is what you pay.' },
]

interface WhyChooseItem {
  icon: typeof IconClock
  title: string
  description: string
}

const whyChooseItems: WhyChooseItem[] = [
  { icon: IconClock, title: 'Punctual', description: 'We value your time and guarantee on-time service.' },
  { icon: IconShield, title: 'Safe & Secure', description: 'Your safety is our top priority on every ride.' },
  { icon: IconUser, title: 'Professional', description: 'Courteous drivers committed to excellence.' },
  { icon: IconCar, title: 'Comfortable Fleet', description: 'Modern, clean and well-maintained vehicles.' },
  { icon: IconMapPin, title: 'Local Expertise', description: 'We know the best routes for a smooth journey.' },
  { icon: IconDollarCircle, title: 'Competitive Rates', description: 'High-quality service at affordable prices.' },
]
</script>

<template>
  <!-- Hero masthead — utility quote hero (split) -->
  <section v-scroll-reveal class="relative isolate overflow-hidden bg-romara-green text-white">
    <img
      src="/images/airport-transfers/airport-van.png"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative section-y">
      <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <!-- LEFT: intro + trust points -->
        <div>
          <nav
            class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
            aria-label="Breadcrumb"
          >
            <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
            <span class="text-white/30">/</span>
            <span class="text-white/85">Airport Transfers</span>
          </nav>

          <h1 class="max-w-xl font-heading text-display font-semibold text-balance">
            Reliable Transfers. Every Time.
          </h1>

          <p class="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Start and end your journey with comfort and peace of mind. Our professional airport
            transfer service ensures a smooth, safe and on-time ride to or from the airport.
          </p>

          <ul class="mt-8 space-y-3.5">
            <li
              v-for="point in [
                { icon: IconCheck, label: 'On-time, flight-monitored pickups' },
                { icon: IconShield, label: 'Safe rides with vetted, professional drivers' },
                { icon: IconHeadset, label: '24/7 availability and support' },
              ]"
              :key="point.label"
              class="flex items-center gap-3 text-sm font-medium text-white/90 sm:text-base"
            >
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-romara-amber-300 ring-1 ring-white/15">
                <component :is="point.icon" class="h-4 w-4" />
              </span>
              {{ point.label }}
            </li>
          </ul>

          <p class="mt-8 text-sm text-white/60">
            Prefer to talk it through?
            <a href="/contact" class="font-semibold text-romara-amber-300 underline-offset-4 hover:underline">
              Request a quote
            </a>
          </p>
        </div>

        <!-- RIGHT: how-it-works guide (not a booking form) -->
        <div class="glass w-full rounded-card p-6 shadow-elevated animate-fade-up sm:p-7">
          <div class="flex items-center gap-3">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
              <IconCar class="h-5 w-5" />
            </span>
            <div>
              <p class="font-heading text-lg font-semibold text-white">How it works</p>
              <p class="text-xs text-white/60">Three simple steps to a smooth transfer.</p>
            </div>
          </div>

          <ol class="relative mt-7 space-y-6">
            <span class="pointer-events-none absolute left-[15px] top-2 bottom-2 w-px bg-white/15" aria-hidden="true" />
            <li v-for="(step, i) in [
              { title: 'Share the details', text: 'Your flight number, pickup point and destination.' },
              { title: 'We confirm everything', text: 'Driver, vehicle and a fixed, all-inclusive price — no surprises.' },
              { title: 'Meet &amp; greet', text: 'Your driver meets you at arrivals with a name sign. Sit back and relax.' },
            ]" :key="step.title" class="relative flex gap-4">
              <span class="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-romara-green ring-4 ring-romara-green-dark/40">
                {{ i + 1 }}
              </span>
              <div class="pt-0.5">
                <p class="font-heading text-sm font-semibold text-white" v-html="step.title"></p>
                <p class="mt-1 text-sm leading-relaxed text-white/70" v-html="step.text"></p>
              </div>
            </li>
          </ol>

          <BaseButton as="a" href="/airport-transfers/book" variant="amber" size="lg" class="mt-7 w-full justify-center">
            <IconCar class="h-4 w-4" />
            Book Your Transfer
          </BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust strip, overlapping hero bottom -->
  <section v-scroll-reveal class="relative z-10 -mt-14 romara-container sm:-mt-16">
    <div class="grid grid-cols-1 gap-6 rounded-card bg-white p-6 shadow-elevated sm:grid-cols-2 sm:p-8 lg:grid-cols-5 lg:gap-5">
      <div
        v-for="(feature, index) in trustFeatures"
        :key="feature.title"
        v-scroll-reveal="{ delay: index * 75 }"
        class="flex items-start gap-3"
      >
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
          <component :is="feature.icon" class="h-5 w-5" />
        </span>
        <div>
          <p class="font-heading text-sm font-semibold text-romara-green">{{ feature.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink-soft">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Vehicle / service showcase -->
  <section v-scroll-reveal-left class="section-y bg-white">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="Our Services"
        title="Our Airport Transfer Services"
        description="Whether you are travelling for business or leisure, we have the right transfer solution for you."
      />

      <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(service, index) in services"
          :key="service.id"
          v-scroll-reveal="{ delay: index * 100 }"
          class="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated"
        >
          <div class="relative h-44 overflow-hidden">
            <img
              :src="service.image"
              :alt="service.name"
              loading="lazy"
              class="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <span
              class="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-fade text-white shadow-elevated"
            >
              <component :is="serviceIcons[service.iconName]" class="h-4 w-4" />
            </span>
          </div>

          <div class="flex flex-1 flex-col p-5 pt-7">
            <h3 class="font-heading text-base font-semibold leading-snug text-romara-green">{{ service.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-romara-ink/70">{{ service.description }}</p>

            <ul class="mt-4 space-y-2">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center gap-2 text-xs text-romara-ink/70"
              >
                <IconCheckSquare class="h-3.5 w-3.5 shrink-0 text-romara-amber" />
                {{ feature }}
              </li>
            </ul>

            <a
              :href="`/airport-transfers/${service.slug}`"
              class="group/link mt-5 inline-flex items-center gap-1.5 border-t border-romara-green/10 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber"
            >
              View Details
              <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Why Choose ROMARA for Airport Transfers -->
  <section v-scroll-reveal-right class="section-y bg-romara-bone">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="Why ROMARA"
        title="Why Choose Romara for Your Airport Transfers?"
        description="Every transfer is handled with the same care, punctuality and professionalism you would expect from a premium travel partner."
      />

      <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
        <div
          v-for="(item, index) in whyChooseItems"
          :key="item.title"
          v-scroll-reveal="{ delay: index * 75 }"
          class="group rounded-card border border-romara-green/10 bg-white p-5 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-romara-amber/30 hover:shadow-elevated sm:p-6"
        >
          <span
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-romara-green-100 text-romara-green transition-transform duration-500 ease-out-expo group-hover:scale-105"
          >
            <component :is="item.icon" class="h-6 w-6" />
          </span>
          <p class="mt-4 font-heading text-sm font-semibold text-romara-green">{{ item.title }}</p>
          <p class="mt-1.5 text-xs leading-relaxed text-romara-ink-soft">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 75 }">
    <CtaAurora
      title="Ready to Book Your Airport Transfer?"
      subtitle="Enjoy a seamless travel experience from the moment you land."
      primary-label="Book Now"
      primary-href="/airport-transfers/book"
    />
  </div>
</template>
