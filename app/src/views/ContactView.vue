<script setup lang="ts">
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import QuickContactOptions from '@/features/contact/components/QuickContactOptions.vue'
import ContactForm from '@/features/contact/components/ContactForm.vue'
import OfficeMap from '@/features/contact/components/OfficeMap.vue'

interface WhyContactItem {
  icon: typeof IconUserCheck
  title: string
  description: string
}

const whyContactItems: WhyContactItem[] = [
  { icon: IconUserCheck, title: 'Expert Advice', description: 'Get professional guidance from our travel experts.' },
  { icon: IconHandshake, title: 'Tailor-Made Tours', description: 'We create personalized itineraries just for you.' },
  { icon: IconClock, title: 'Quick Response', description: 'We respond to all enquiries within 24 hours.' },
  { icon: IconUsers, title: 'Customer Support', description: "We're with you before, during and after your trip." },
]
</script>

<template>
  <!-- Hero -->
  <section class="relative isolate min-h-[420px] overflow-hidden bg-romara-green text-white sm:min-h-[460px]">
    <img
      src="/src/assets/images/contact/hero.png"
      alt="Safari vehicle at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

    <div class="romara-container relative flex min-h-[420px] items-center py-16 sm:min-h-[460px]">
      <div class="max-w-xl">
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-romara-amber">Contact Us</p>
        <h1 class="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">We'd Love to Hear From You</h1>
        <span class="mt-3 block h-1 w-14 rounded bg-romara-amber" />
        <p class="mt-4 text-base leading-relaxed text-white/85">
          Whether you have a question, need travel advice, or want to plan your next adventure, our team is
          here to help!
        </p>
      </div>
    </div>
  </section>

  <!-- Quick Contact Options, overlapping the hero bottom -->
  <section class="romara-container relative z-10 -mt-10 sm:-mt-12">
    <QuickContactOptions />
  </section>

  <!-- Contact form + office info, two-column -->
  <section class="romara-container py-16">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Send Us a Message</h2>
        <p class="mt-1 text-sm text-romara-ink/60">Fill in the form below and we'll get back to you as soon as possible.</p>

        <div class="mt-6">
          <ContactForm />
        </div>
      </div>

      <OfficeMap />
    </div>
  </section>

  <!-- Why Contact ROMARA -->
  <section class="romara-container pb-16">
    <div class="rounded-lg bg-romara-cream p-8 sm:p-10">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Why Contact ROMARA?</h2>
        <p class="mx-auto mt-2 max-w-xl text-sm text-romara-ink/60">
          We are here to make your travel experience seamless and unforgettable.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div v-for="item in whyContactItems" :key="item.title" class="flex flex-col items-center text-center">
          <IconUserCheck v-if="false" />
          <component :is="item.icon" class="h-8 w-8 text-romara-amber" />
          <p class="mt-3 text-sm font-bold text-romara-green">{{ item.title }}</p>
          <p class="mt-1 text-xs leading-relaxed text-romara-ink/60">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>