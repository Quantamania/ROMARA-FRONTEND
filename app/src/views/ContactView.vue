<script setup lang="ts">
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import PageHero from '@/components/ui/PageHero.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
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
  <PageHero
    eyebrow="Contact Us"
    title="We'd Love to Hear From You"
    subtitle="Whether you have a question, need travel advice, or want to plan your next adventure, our team is here to help."
    image="/src/assets/images/contact/hero.png"
    size="lg"
    :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'Contact' }]"
  />

  <!-- Contact form + quick options / office, two-column -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <!-- Form card -->
        <div class="rounded-card bg-white p-6 shadow-card sm:p-9">
          <p class="eyebrow mb-3">
            
            Send a Message
          </p>
          <h2 class="font-heading text-display-sm font-semibold text-romara-green">Start the Conversation</h2>
          <span class="accent-rule mt-4" />
          <p class="mt-4 max-w-md text-sm leading-relaxed text-romara-ink-soft">
            Fill in the form below and a member of our team will get back to you as soon as possible.
          </p>

          <div class="mt-8">
            <ContactForm />
          </div>
        </div>

        <!-- Quick contact + office -->
        <div class="space-y-8">
          <QuickContactOptions />
          <OfficeMap />
        </div>
      </div>
    </div>
  </section>

  <!-- Why Contact ROMARA -->
  <section class="section-y bg-white">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="Why ROMARA"
        title="Travel Planning, Beautifully Handled"
        description="We are here to make your travel experience seamless and unforgettable."
      />

      <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <div
          v-for="item in whyContactItems"
          :key="item.title"
          class="group rounded-card border border-romara-green/10 bg-romara-bone p-6 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-romara-amber/30 hover:shadow-elevated sm:p-8"
        >
          <span
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:scale-105"
          >
            <component :is="item.icon" class="h-6 w-6" />
          </span>
          <p class="mt-5 font-heading text-lg font-semibold text-romara-green">{{ item.title }}</p>
          <p class="mt-2 text-xs leading-relaxed text-romara-ink-soft">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
