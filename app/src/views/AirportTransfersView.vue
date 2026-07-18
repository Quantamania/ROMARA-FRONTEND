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
  <section v-scroll-reveal class="isolate relative bg-romara-green min-h-[560px] sm:min-h-[620px] overflow-hidden text-white">
    <img
      src="/src/assets/images/airport-transfers/airport-van.png"
      alt="ROMARA driver with a transfer van at the airport"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

    <div class="relative flex items-center min-h-[560px] sm:min-h-[620px] romara-container">
      <div class="py-16 max-w-xl">
        <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Airport Transfers</p>
        <h1 class="mt-3 font-heading font-bold text-4xl sm:text-5xl leading-tight">Reliable Transfers. Every Time.</h1>
        <p class="mt-4 text-white/85 text-base leading-relaxed">
          Start and end your journey with comfort and peace of mind. Our professional airport transfer service
          ensures a smooth, safe and on-time ride to or from the airport.
        </p>

        <div class="flex flex-wrap gap-3 mt-8">
          <BaseButton as="a" href="/airport-transfers/book" variant="primary" size="lg">
            <IconCar class="w-4 h-4" />
            Book Your Transfer
          </BaseButton>
          <BaseButton as="a" href="/contact" variant="outline" size="lg">Request a Quote</BaseButton>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust strip, overlapping hero bottom -->
  <section v-scroll-reveal class="z-10 relative -mt-14 sm:-mt-16 romara-container">
    <div class="gap-6 lg:gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-white shadow-overlap p-6 rounded-lg">
      <div v-for="(feature, index) in trustFeatures" :key="feature.title" v-scroll-reveal="{ delay: index * 75 }" class="flex items-start gap-3">
        <component :is="feature.icon" class="w-8 h-8 text-romara-amber shrink-0" />
        <div>
          <p class="font-bold text-romara-green text-sm">{{ feature.title }}</p>
          <p class="mt-1 text-romara-ink/60 text-xs leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services grid -->
  <section v-scroll-reveal-left class="py-16 romara-container">
    <div class="text-center">
      <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Our Airport Transfer Services</h2>
      <span class="block bg-romara-amber mx-auto mt-2 rounded w-14 h-1" />
      <p class="mx-auto mt-3 max-w-xl text-romara-ink/60 text-sm">
        Whether you are travelling for business or leisure, we have the right transfer solution for you.
      </p>
    </div>

    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10">
      <article
        v-for="(service, index) in services"
        :key="service.id"
        class="bg-white shadow-card rounded-lg overflow-hidden"
        v-scroll-reveal="{ delay: index * 100 }"
      >
        <div class="relative">
          <img :src="service.image" :alt="service.name" class="w-full h-40 object-cover" loading="lazy" />
          <span class="-bottom-4 left-4 absolute flex justify-center items-center bg-romara-amber shadow-card rounded-full w-9 h-9 text-white">
            <component :is="serviceIcons[service.iconName]" class="w-4 h-4" />
          </span>
        </div>

        <div class="p-4 pt-6">
          <h3 class="font-heading font-bold text-romara-green text-base">{{ service.name }}</h3>
          <p class="mt-2 text-romara-ink/70 text-sm">{{ service.description }}</p>

          <ul class="space-y-1.5 mt-3">
            <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-romara-ink/70 text-xs">
              <IconCheckSquare class="w-3.5 h-3.5 text-romara-amber shrink-0" />
              {{ feature }}
            </li>
          </ul>

          <a
            :href="`/airport-transfers/${service.slug}`"
            class="block bg-romara-green hover:bg-romara-green/90 mt-4 py-2.5 rounded-md font-semibold text-white text-xs text-center uppercase tracking-wide"
          >
            View Details
          </a>
        </div>
      </article>
    </div>
  </section>

  <!-- Why Choose Romara for Airport Transfers — plain white band -->
  <section v-scroll-reveal-right class="pb-16 romara-container">
    <div class="text-center">
      <h2 class="font-bold text-romara-green text-2xl sm:text-3xl">Why Choose Romara for Your Airport Transfers?</h2>
      <span class="block bg-romara-amber mx-auto mt-2 rounded w-14 h-1" />
    </div>

    <div class="gap-x-6 gap-y-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-10 text-center">
      <div v-for="(item, index) in whyChooseItems" :key="item.title" v-scroll-reveal="{ delay: index * 75 }" class="flex flex-col items-center">
        <component :is="item.icon" class="w-8 h-8 text-romara-green" />
        <p class="mt-3 font-bold text-romara-green text-sm">{{ item.title }}</p>
        <p class="mt-1 max-w-[180px] text-romara-ink/60 text-xs leading-relaxed">{{ item.description }}</p>
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
