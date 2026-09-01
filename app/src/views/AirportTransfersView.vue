<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import CtaBand from '@/components/ui/CtaBand.vue'
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
import IconCheckSquare from '@/components/icons/IconCheckSquare.vue'
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
      src="/images/airport-transfers/airport-van.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative py-14 sm:py-20 lg:py-24">
      <!-- Lean hero: title, one subtle line, and the single action. The 'how it
           works' detail now lives in its own section below, so the masthead is
           clean on mobile instead of a crumbled stack of steps. -->
      <div class="mx-auto max-w-xl text-center">
        <h1 class="font-heading text-display-sm font-semibold text-balance">
          Reliable Transfers. Every Time.
        </h1>
        <p class="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
          Fixed prices, live flight tracking, and a driver waiting at arrivals.
        </p>
        <BaseButton as="a" href="/airport-transfers/book" variant="amber" size="lg" class="mt-8 w-full justify-center sm:w-auto">
          <IconCar class="h-4 w-4" />
          Book Your Transfer
        </BaseButton>
      </div>
    </div>
  </section>

  <!-- Trust strip, moved below the hero with a rounded safari-style panel -->
  <section v-scroll-reveal class="relative z-10 mt-5 sm:mt-6">
    <div class="rounded-[1.75rem] border border-romara-green/10 bg-white p-3 shadow-[0_-12px_30px_-16px_rgba(0,0,0,0.18)] sm:rounded-[2rem] sm:p-5 lg:rounded-[2rem] lg:p-6">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(feature, index) in trustFeatures"
            :key="feature.title"
            v-scroll-reveal="{ delay: index * 60 }"
            class="group flex flex-col items-center gap-2 rounded-[1.25rem] border border-romara-green/5 bg-white px-2 py-3 text-center shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/20 hover:shadow-elevated sm:px-3"
          >
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft">
              <component :is="feature.icon" class="h-5 w-5" />
            </span>
            <p class="text-[11px] font-heading font-semibold leading-tight text-romara-green sm:text-xs lg:text-sm">{{ feature.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works — the three steps, now in their own clean section -->
  <section v-scroll-reveal class="section-y bg-white">
    <div class="romara-container">
      <div class="mx-auto max-w-xl text-center">
        <h2 class="font-heading text-display-sm font-semibold text-romara-green">How it works</h2>
      </div>
      <ol class="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3 sm:gap-6">
        <li
          v-for="(step, i) in [
            { title: 'Share the details', text: 'Your flight number, pickup point and destination.' },
            { title: 'We confirm everything', text: 'Driver, vehicle and a fixed price.' },
            { title: 'Meet &amp; greet', text: 'Your driver meets you at arrivals with a name sign.' },
          ]"
          :key="step.title"
          class="flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-3 sm:text-center"
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-fade text-sm font-bold text-white shadow-soft">
            {{ i + 1 }}
          </span>
          <div>
            <p class="font-heading text-base font-semibold text-romara-green" v-html="step.title"></p>
            <p class="mt-1 text-sm leading-relaxed text-romara-ink-soft" v-html="step.text"></p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Vehicle / service showcase -->
  <section v-scroll-reveal-left class="section-y bg-white">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="Our Services"
        title="Our Airport Transfer Services"
      />

      <div class="mobile-shelf mt-4 gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
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
    <CtaBand
      title="Ready to book your transfer?"
      primary-label="Book Now"
      primary-href="/airport-transfers/book"
    />
  </div>
</template>
