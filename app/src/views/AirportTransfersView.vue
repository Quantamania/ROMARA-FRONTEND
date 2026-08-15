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
      src="/images/airport-transfers/airport-van.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-25"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" />
    <div class="absolute inset-0 bg-scrim-b" />

    <div class="romara-container relative py-10 sm:py-16 lg:py-24">
      <!-- Just the three steps. The breadcrumb, the trust bullets, the "prefer
           to talk it through" line and the glass card's own icon + heading +
           subtitle all came out — the numbered steps say the same thing and say
           it faster. The h1 stays: it is the page's title for search engines and
           screen readers, and nothing else on the page provides one. -->
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="font-heading text-display-sm font-semibold text-balance">
          Reliable Transfers. Every Time.
        </h1>

        <ol class="mt-10 grid gap-8 text-left sm:mt-12 sm:grid-cols-3 sm:gap-6">
          <li v-for="(step, i) in [
            { title: 'Share the details', text: 'Your flight number, pickup point and destination.' },
            { title: 'We confirm everything', text: 'Driver, vehicle and a fixed price.' },
            { title: 'Meet &amp; greet', text: 'Your driver meets you at arrivals with a name sign.' },
          ]" :key="step.title" class="flex gap-4 sm:flex-col sm:gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-fade text-sm font-bold text-white shadow-soft">
              {{ i + 1 }}
            </span>
            <div>
              <p class="font-heading text-base font-semibold text-white" v-html="step.title"></p>
              <p class="mt-1 text-sm leading-relaxed text-white/70" v-html="step.text"></p>
            </div>
          </li>
        </ol>

        <BaseButton as="a" href="/airport-transfers/book" variant="amber" size="lg" class="mt-10 w-full justify-center sm:mt-12 sm:w-auto">
          <IconCar class="h-4 w-4" />
          Book Your Transfer
        </BaseButton>
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
