<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import CallToActionBar from '@/components/ui/CallToActionBar.vue'
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
  <!-- Hero -->
  <section v-scroll-reveal class="relative isolate min-h-[560px] overflow-hidden bg-romara-green text-white sm:min-h-[620px]">
    <img
      src="/src/assets/images/airport-transfers/airport-van.png"
      alt="ROMARA driver with a transfer van at the airport"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

    <div class="romara-container relative flex min-h-[560px] items-center sm:min-h-[620px]">
      <div class="max-w-xl py-16">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Airport Transfers</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">Reliable Transfers. Every Time.</h1>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          Start and end your journey with comfort and peace of mind. Our professional airport transfer service
          ensures a smooth, safe and on-time ride to or from the airport.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <BaseButton as="a" href="/airport-transfers/book" variant="primary" size="lg">
            <IconCar class="h-4 w-4" />
            Book Your Transfer
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust strip, overlapping hero bottom -->
  <section v-scroll-reveal class="romara-container relative z-10 -mt-14 sm:-mt-16">
    <div class="grid grid-cols-1 gap-6 rounded-lg bg-white p-6 shadow-overlap sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      <div v-for="(feature, index) in trustFeatures" :key="feature.title" v-scroll-reveal="{ delay: index * 75 }" class="flex items-start gap-3">
        <component :is="feature.icon" class="h-8 w-8 shrink-0 text-romara-amber" />
        <div>
          <p class="text-sm font-bold text-romara-green">{{ feature.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services grid -->
  <section class="romara-container py-16">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Our Airport Transfer Services</h2>
      <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
      <p class="mx-auto mt-3 max-w-xl text-sm text-romara-ink/60">
        Whether you are travelling for business or leisure, we have the right transfer solution for you.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="(service, index) in services"
        :key="service.id"
        class="overflow-hidden rounded-lg bg-white shadow-card"
        v-scroll-reveal="{ delay: index * 100 }"
      >
        <div class="relative">
          <img :src="service.image" :alt="service.name" class="h-40 w-full object-cover" loading="lazy" />
          <span class="absolute -bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-romara-amber text-white shadow-card">
            <component :is="serviceIcons[service.iconName]" class="h-4 w-4" />
          </span>
        </div>

        <div class="p-4 pt-6">
          <h3 class="font-heading text-base font-bold text-romara-green">{{ service.name }}</h3>
          <p class="mt-2 text-sm text-romara-ink/70">{{ service.description }}</p>

          <ul class="mt-3 space-y-1.5">
            <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-xs text-romara-ink/70">
              <IconCheckSquare class="h-3.5 w-3.5 shrink-0 text-romara-amber" />
              {{ feature }}
            </li>
          </ul>

          <a
            :href="`/airport-transfers/${service.slug}`"
            class="mt-4 block rounded-md bg-romara-green py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white hover:bg-romara-green/90"
          >
            View Details
          </a>
        </div>
      </article>
    </div>
  </section>

  <!-- Why Choose Romara for Airport Transfers — plain white band -->
  <section v-scroll-reveal class="romara-container pb-16">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Why Choose Romara for Your Airport Transfers?</h2>
      <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
    </div>

    <div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-6">
      <div v-for="(item, index) in whyChooseItems" :key="item.title" v-scroll-reveal="{ delay: index * 75 }" class="flex flex-col items-center">
        <component :is="item.icon" class="h-8 w-8 text-romara-green" />
        <p class="mt-3 text-sm font-bold text-romara-green">{{ item.title }}</p>
        <p class="mt-1 max-w-[180px] text-xs leading-relaxed text-romara-ink/60">{{ item.description }}</p>
      </div>
    </div>
  </section>

  <div v-scroll-reveal="{ delay: 75 }">
    <CallToActionBar
      title="Ready to Book Your Airport Transfer?"
      subtitle="Enjoy a seamless travel experience from the moment you land."
      primary-label="Book Now"
      primary-href="/airport-transfers/book"
      theme="green"
      icon-style="boxed"
    />
  </div>
</template>
